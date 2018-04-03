import * as wijmo from 'wijmo/wijmo';
import * as wijmoGrid from 'wijmo/wijmo.grid';
import * as wijmoGridPdf from 'wijmo/wijmo.grid.pdf';

function renderRow(panel, r) {
  let tr = '';
  const row = panel.rows[r];

  if (row.renderSize > 0) {
    tr += '<tr>';
    for (let c = 0; c < panel.columns.length; c += 1) {
      const col = panel.columns[c];
      if (col.renderSize > 0) {
        // get cell style, content
        // prettier-ignore
        const style = `width: ${col.renderSize}px; text-align: ${col.getAlignment()}; padding-right: 6px;`;
        let content = panel.getCellData(r, c, true);
        if (!row.isContentHtml && !col.isContentHtml) content = wijmo.escapeHtml(content);

        // add cell to row
        if (panel.cellType === wijmoGrid.CellType.ColumnHeader) {
          tr += `<th style="${style}">${content}</th>`;
        } else {
          // show boolean values as checkboxes
          const raw = panel.getCellData(r, c, false);
          if (raw === true) {
            content = '&#9745;';
          } else if (raw === false) {
            content = '&#9744;';
          }

          tr += `<td style="${style}">${content}</td>`;
        }
      }
    }
    tr += '</tr>';
  }
  return tr;
}

function scaleY(value, min, max) {
  return max > min ? 100 - Math.round((value - min) / (max - min) * 100) : 0;
}

// generate sparklines as SVG
function getSparklines(data) {
  const min = Math.min(...data);
  const max = Math.max(...data);
  const svg = [];
  let x1 = 0;
  let y1 = scaleY(data[0], min, max);
  for (let i = 1; i < data.length; i += 1) {
    const x2 = Math.round(i / (data.length - 1) * 100);
    const y2 = scaleY(data[i], min, max);
    svg.push(`<line x1="${x1}%" y1="${y1}%" x2="${x2}%" y2="${y2}%" />`);
    x1 = x2;
    y1 = y2;
  }
  return `<svg><g>${svg.join()}</g></svg>`;
}

function formatDynamicCell(cell, item, col, history, flare) {
  const tradeHistory = [...item.history].splice(0, 10); // get last 10 elements
  tradeHistory.reverse();
  const hist = tradeHistory.map(element => element[history]);
  const change = `${wijmo.Globalize.format(item.chg / item.open * 100, 'n1')}%`;
  const glyph = item.chg > +0.001 ? 'up' : item.chg < -0.001 ? 'down' : 'circle'; // eslint-disable-line
  const spark = getSparklines(hist); // sparklines
  const dir = glyph === 'circle' ? 'none' : glyph; // change direction
  const flareDir = flare ? dir : 'none'; // // flare direction

  // cell template
  return [
    `<div class="ticker chg-${dir} flare-${flareDir}">`,
    `<div class="chg">${change}</div>`,
    `<div class="glyph"><span class="wj-glyph-${glyph}"/></div>`,
    `<div class="spark">${spark}</div>`,
    `</div>`,
  ].join('');
}

function formatTechnicalIndicator(item, binding) {
  const value = Math.round(item[binding]);
  const format = id =>
    ({
      [-2]: 'Strong Sell',
      [-1]: 'Sell',
      0: 'Neutral',
      1: 'Buy',
      2: 'Strong Buy',
    }[id] || 'Unknown');

  return [
    `<div class="indicator ${value > 0 && 'buy'} ${value < 0 && 'sell'}">`,
    `${format(value)}`,
    `</div>`,
  ].join('');
}

function formatPerformanceIndicator(item, binding) {
  const value = Math.round(item[binding]);
  return [
    `<div class="indicator ${value > 0 && 'buy'} ${value < 0 && 'sell'}">`,
    `${value}%`,
    `</div>`,
  ].join('');
}

/**
 * Export the current view to a PDF file.
 * @param {Object} flex - Wijmo FlexGrid
 */
function renderTable(flex) {
  // header
  const head = [
    '<thead>',
    flex.columnHeaders.rows.map((row, index) => renderRow(flex.columnHeaders, index)).join(''), // prettier-ignore
    '</thead>',
  ].join('');
  // body
  const body = [
    '<tbody>',
    flex.rows.map((row, index) => renderRow(flex.cells, index)).join(''),
    '</tbody>',
  ].join('');
  // table
  return [
    '<table>',
    `${flex.headersVisibility && wijmoGrid.HeadersVisibility.Column ? head : ''}`,
    `${body}`,
    '</table>',
  ].join('');
}

/**
 * Print the current view.
 * @param {Object} grid - Wijmo FlexGrid
 */
export function print(grid) {
  const doc = new wijmo.PrintDocument({
    title: 'PrintDocument',
    copyCss: true,
  });
  const content = [
    `<h1>Printing Example</h1>`,
    `<p>This document was created using the <b>PrintDocument</b> class.</p>`,
    `<p>Here's a FlexGrid rendered as a table:</p>`,
    `${renderTable(grid)}`,
  ].join('');

  doc.append(content); // add some simple text
  doc.print(); // print the document
}

/**
 * Export the current view to a PDF file.
 * @param {Object} grid - Wijmo FlexGrid
 */
export function pdf(grid) {
  wijmoGridPdf.FlexGridPdfConverter.export(grid, 'FlexGrid.pdf', {
    scaleMode: wijmoGridPdf.ScaleMode.PageWidth,
    documentOptions: {
      compress: true,
      header: { declarative: { text: '\t&[Page] of &[Pages]' } },
      footer: { declarative: { text: '\t&[Page] of &[Pages]' } },
      info: { author: 'C1', title: 'FlexGrid' },
    },
    styles: {
      cellStyle: { backgroundColor: '#ffffff', borderColor: '#c6c6c6' },
      altCellStyle: { backgroundColor: '#f9f9f9' },
      groupCellStyle: { backgroundColor: '#dddddd' },
      headerCellStyle: { backgroundColor: '#eaeaea' },
    },
  });
}

/**
 * Custom cell painting.
 * @param {Object} cell
 * @param {Object} item
 * @param {Object} col
 * @param {boolean} flare
 */
export function formatCell(cell, item, col, flare) {
  let result = null;
  switch (col.binding) {
    case 'technicalMinutes15':
      result = formatTechnicalIndicator(item, 'technicalMinutes15');
      break;
    case 'technicalMinutes30':
      result = formatTechnicalIndicator(item, 'technicalMinutes15');
      break;
    case 'technicalHourly':
      result = formatTechnicalIndicator(item, 'technicalHourly');
      break;
    case 'technicalWeekly':
      result = formatTechnicalIndicator(item, 'technicalWeekly');
      break;
    case 'technicalMonthly':
      result = formatTechnicalIndicator(item, 'technicalMonthly');
      break;
    case 'performanceDaily':
      result = formatPerformanceIndicator(item, 'performanceDaily');
      break;
    case 'performanceWeek':
      result = formatPerformanceIndicator(item, 'performanceWeek');
      break;
    case 'performanceMonth':
      result = formatPerformanceIndicator(item, 'performanceMonth');
      break;
    case 'performanceYtd':
      result = formatPerformanceIndicator(item, 'performanceYtd');
      break;
    case 'performanceYear':
      result = formatPerformanceIndicator(item, 'performanceYear');
      break;
    case 'performanceYear3':
      result = formatPerformanceIndicator(item, 'performanceYear3');
      break;
    case 'chg':
      result = formatDynamicCell(cell, item, col, 'close', flare);
      break;
    default:
      result = wijmo.Globalize.format(item[col.binding], col.format);
      break;
  }
  return result;
}

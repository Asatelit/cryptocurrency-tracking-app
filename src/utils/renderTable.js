import * as wijmo from 'wijmo/wijmo';
import * as wijmoGrid from 'wijmo/wijmo.grid';

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

export default function renderTable(flex) {
  // start table
  let tbl = '<table>';

  // headers
  if (flex.headersVisibility && wijmoGrid.HeadersVisibility.Column) {
    tbl += '<thead>';
    for (let r = 0; r < flex.columnHeaders.rows.length; r += 1) {
      tbl += renderRow(flex.columnHeaders, r);
    }
    tbl += '</thead>';
  }

  // body
  tbl += '<tbody>';
  for (let r = 0; r < flex.rows.length; r += 1) {
    tbl += renderRow(flex.cells, r);
  }
  tbl += '</tbody>';

  // done
  tbl += '</table>';
  return tbl;
}

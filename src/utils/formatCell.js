import * as wijmo from 'wijmo/wijmo';

function scaleY(value, min, max) {
  return max > min ? 100 - Math.round((value - min) / (max - min) * 100) : 0;
}

// generate sparklines as SVG
function getSparklines(data) {
  const min = Math.min.apply(Math, data);
  const max = Math.max.apply(Math, data);
  let svg = '';
  let x1 = 0;
  let y1 = scaleY(data[0], min, max);
  for (let i = 1; i < data.length; i += 1) {
    const x2 = Math.round(i / (data.length - 1) * 100);
    const y2 = scaleY(data[i], min, max);
    svg += `<line x1="${x1}%" y1="${y1}%" x2="${x2}%" y2="${y2}%" />`;
    x1 = x2;
    y1 = y2;
  }
  return `<svg><g>${svg}</g></svg>`;
}

function formatDynamicCell(cell, item, col, history, flare) {
  const hist = item.history.slice(-6).map(element => element[history]);
  const chg = hist.length > 1 ? hist[hist.length - 1] / hist[hist.length - 2] - 1 : 0;
  const value = wijmo.Globalize.format(item[col.binding], col.format);
  const change = `${wijmo.Globalize.format(chg * 100, 'n1')}%`;
  const glyph = chg > +0.001 ? 'up' : chg < -0.001 ? 'down' : 'circle'; // up/down glyph
  const spark = getSparklines(hist); // sparklines
  const dir = glyph === 'circle' ? 'none' : glyph; // change direction
  const flareDir = flare ? dir : 'none'; // // flare direction

  // cell template
  return [
    `<div class="ticker chg-${dir} flare-${flareDir}">`,
    `<div class="value">${value}</div>`,
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

// custom cell painting
export default function formatCell(cell, item, col, flare) {
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
      result = formatDynamicCell(cell, item, col, 'last', flare);
      break;
    default:
      result = wijmo.Globalize.format(item[col.binding], col.format);
      break;
  }
  return `<div>${result}<div>`;
}

import * as wjGridPdf from 'wijmo/wijmo.grid.pdf';
import * as wijmo from 'wijmo/wijmo';
import renderTable from '../utils/renderTable';
import createReducer from '../utils/createReducer';
import ActionTypes from '../constants/ActionTypes';
import Assets from '../constants/AssetsTypes';

const grid = () => window[Assets.WJ_GRID];

const initialState = {};

export default createReducer(initialState, {
  /**
   * Exports the FlexGrid to PDF
   */
  [ActionTypes.GRID_EXPORT]: () => {
    wjGridPdf.FlexGridPdfConverter.export(grid(), 'FlexGrid.pdf', {
      maxPages: 10,
      scaleMode: wjGridPdf.ScaleMode.PageWidth,
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
    return null;
  },

  /**
   * Print the FlexGrid
   */
  [ActionTypes.GRID_PRINT]: () => {
    const doc = new wijmo.PrintDocument({
      title: 'PrintDocument Test',
      copyCss: true,
    });

    // add some simple text
    doc.append('<h1>Printing Example</h1>');
    doc.append('<p>This document was created using the <b>PrintDocument</b> class.</p>');
    doc.append("<p>Here's a FlexGrid rendered as a table:</p>");
    doc.append(renderTable(grid()));
    doc.print(); // print the document
    return null;
  },
});

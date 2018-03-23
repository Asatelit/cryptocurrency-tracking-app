import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as wjGrid from 'wijmo/wijmo.grid';
import * as wjGridDetail from 'wijmo/wijmo.grid.detail';
import * as wjChart from 'wijmo/wijmo.chart';
import { FlexGrid } from 'wijmo/wijmo.react.grid';

import Assets from '../../constants/AssetsTypes';
import formatCell from '../../utils/formatCell';

import './Grid.css';
import './Wijmo.css';
import AssetsTypes from '../../constants/AssetsTypes';
import randBetween from "../../utils/randBetween";

class Grid extends Component {
  cellElements = {};
  clearCells = false;

  isUpdated = (a, b) => JSON.stringify(a) !== JSON.stringify(b);

  shouldComponentUpdate(nextProps) {
    const grid = window[Assets.WJ_GRID];
    const prevItemSource = this.props.itemsSource;
    const prevSection = this.props.section;
    const prevColumns = this.props.columns;
    const nextItemSource = nextProps.itemsSource;
    const nextSection = nextProps.section;
    const nextColumns = nextProps.columns;
    const hasItemSource = grid.itemsSource.length;

    if (prevSection !== nextSection || this.isUpdated(prevColumns, nextColumns)) {
      grid.columns.splice(0, grid.columns.length);
      nextProps.columns[nextSection].forEach(el => {
        console.info(el);
        grid.columns.push(new wjGrid.Column(el));
      });
    }

    if (
      hasItemSource &&
      JSON.stringify(nextItemSource) !== JSON.stringify(prevItemSource)
    ) {
      if (prevItemSource.length !== nextItemSource.length) return true;
      nextItemSource.forEach(entry => {
        const itemCells = this.cellElements[entry.symbol];
        if (itemCells) {
          grid.columns.forEach(col => {
            const cell = itemCells[col.binding];
            if (cell) cell.innerHTML = formatCell(cell, entry, col, true);
          });
        }
      });
      return false;
    } else if (grid.itemsSource.length) {
      return false;
    }
    return true;
  }

  handleUpdatingView = () => {
    console.info('UpdatingView');
    this.clearCells = true; // clear cell elements on next formatItem
  };

  /**
   * Occurs when an element representing a cell has been created.
   * @arg {Object] gridPanel - GridPanel that contains the range.
   * @arg {Object] cellRange - Range of cells affected by the event.
   */
  handleFormatItem = (gridPanel, cellRange) => {
    const { cell, col, row } = cellRange;
    const { rows, columns, cells } = gridPanel;

    if (cellRange.panel === cells) {
      const column = columns[col];
      const item = rows[row].dataItem;

      // clear cell elements
      if (this.clearCells) {
        this.clearCells = false;
        this.cellElements = {};
      }

      if (item) {
        // store cell element
        if (!this.cellElements[item.symbol]) {
          this.cellElements[item.symbol] = { item };
        }
        this.cellElements[item.symbol][column.binding] = cell;

        // custom painting
        cell.innerHTML = formatCell(cell, item, column, false);
      }
    } else {
      cell.innerHTML = `<div>${cell.innerHTML}</div>`;
    }
  };

  /**
   * Occurs after the grid rows have been bound to items in the data source.
   * @arg {Object] gridPanel - GridPanel that contains the range.
   */
  handleInitialized = gridPanel => {
    const detailProvider = new wjGridDetail.FlexGridDetailProvider(gridPanel);

    window[Assets.WJ_GRID] = gridPanel;
    window[Assets.WJ_GRID].columnHeaders.rows.defaultSize = 78;
    window[Assets.WJ_GRID].rows.defaultSize = 60;

    detailProvider.createDetailCell = row => {
      const cell = document.createElement('div');
      const chart = new wjChart.FlexChart(cell, {
        itemsSource: row.dataItem.history,
        series: [
          {
            chartType: 7, // Candlestick
            bindingX: 'time',
            binding: 'high,low,open,last',
          },
        ],
        selectionMode: wjChart.SelectionMode.Point,
        legend: { position: wjChart.Position.None },
      });

      return cell;
    };
  };

  render() {
    const { columns, section, itemsSource } = this.props;
    const columnsSection = columns[section];
    console.info(columns[section]);
    return (
      <FlexGrid
        isReadOnly
        className="Grid"
        autoGenerateColumns={false}
        columns={columnsSection}
        itemsSource={itemsSource}
        selectionMode="Row"
        formatItem={(gridPanel, cellRange) => this.handleFormatItem(gridPanel, cellRange)}
        initialized={gridPanel => this.handleInitialized(gridPanel)}
        updatingView={() => this.handleUpdatingView()}
      />
    );
  }
}

Grid.propTypes = {
  section: PropTypes.oneOf(
    AssetsTypes.OVERVIEW,
    AssetsTypes.PERFORMANCE,
    AssetsTypes.TECHNICAL,
  ).isRequired,
  filter: PropTypes.string,
  columns: PropTypes.arrayOf(PropTypes.shape).isRequired,
  itemsSource: PropTypes.arrayOf(PropTypes.shape).isRequired,
};

Grid.defaultProps = {
  filter: '',
};

export default Grid;

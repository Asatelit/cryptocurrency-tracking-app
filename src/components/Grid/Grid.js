import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as wjGrid from 'wijmo/wijmo.grid';
import * as wjGridDetail from 'wijmo/wijmo.grid.detail';
import * as wjChart from 'wijmo/wijmo.chart';
import { FlexGrid } from 'wijmo/wijmo.react.grid';

import PlaylistAdd from 'material-ui-icons/PlaylistAdd';

import Assets from '../../constants/AssetsTypes';
import formatCell from '../../utils/formatCell';

import './Grid.css';
import './Wijmo.css';

class Grid extends Component {
  cellElements = {};
  clearCells = false;

  isUpdated = (a, b) => JSON.stringify(a) !== JSON.stringify(b);

  shouldComponentUpdate(nextProps) {
    const grid = window[Assets.WJ_GRID];
    const { settings } = this.props;
    const prevItemSource = this.props.itemsSource;
    const prevSection = this.props.section;
    const prevColumns = this.props.columns;
    const nextItemSource = nextProps.itemsSource;
    const nextSection = nextProps.section;
    const nextColumns = nextProps.columns;
    const hasItemSource = grid.itemsSource.length;
    const isNewSection = prevSection !== nextSection;

    if (this.isUpdated(settings, nextProps.settings)) return true;

    if (isNewSection || this.isUpdated(prevColumns, nextColumns)) {
      grid.columns.splice(0, grid.columns.length);
      nextProps.columns[nextSection].forEach(el => {
        grid.columns.push(new wjGrid.Column(el));
      });
    }

    if (hasItemSource && this.isUpdated(nextItemSource, prevItemSource)) {
      if (prevItemSource.length !== nextItemSource.length) return true;
      nextItemSource.forEach(entry => {
        const itemCells = this.cellElements[entry.symbol];
        if (itemCells) {
          grid.columns.forEach(col => {
            const cell = itemCells[col.binding];
            if (cell) {
              if (settings.isCustomCells) {
                cell.innerHTML = `<div>${formatCell(cell, entry, col, true)}</div>`;
              } else {
                cell.innerHTML = `<div>${cell.innerHTML}</div>`;
              }
            }
          });
        }
      });
      return false; // skip update
    } else if (grid.itemsSource.length) {
      return false; // skip update
    }
    return true; // update component
  }

  handleUpdatingView = () => {
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
    const { settings } = this.props;

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
        if (settings.isCustomCells) {
          cell.innerHTML = `<div>${formatCell(cell, item, column, false)}</div>`;
        } else {
          cell.innerHTML = `<div>${cell.innerHTML}</div>`;
        }
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
    const { columns, section, settings, itemsSource } = this.props;
    const columnsSection = columns[section];
    return (
      <div className="Grid">
        {!itemsSource.length && (
          <div className="Helper">
            <PlaylistAdd className="Helper-icon" />
            <div>Please add symbols to a list.</div>
          </div>
        )}
        <FlexGrid
          isReadOnly
          className="FlexGrid"
          selectionMode="Row"
          autoGenerateColumns={false}
          columns={columnsSection}
          itemsSource={itemsSource}
          frozenRows={settings.isFreezeFirstRow ? 1 : 0}
          frozenColumns={settings.isFreezeFirstCol ? 1 : 0}
          formatItem={(gridPanel, cellRange) => this.handleFormatItem(gridPanel, cellRange)}
          initialized={gridPanel => this.handleInitialized(gridPanel)}
          updatingView={() => this.handleUpdatingView()}
        />
      </div>

    );
  }
}

Grid.propTypes = {
  section: PropTypes.oneOf([Assets.OVERVIEW, Assets.PERFORMANCE, Assets.TECHNICAL])
    .isRequired,
  filter: PropTypes.string,
  columns: PropTypes.shape({
    binding: PropTypes.string,
    header: PropTypes.string,
    visible: PropTypes.bool,
  }).isRequired,
  itemsSource: PropTypes.arrayOf(PropTypes.shape).isRequired,
  settings: PropTypes.shape({
    isCustomCells: PropTypes.bool,
    isAutoUpdate: PropTypes.bool,
    updateInterval: PropTypes.number,
    isFreezeFirstRow: PropTypes.bool,
    isFreezeFirstCol: PropTypes.bool,
  }).isRequired,
};

Grid.defaultProps = {
  filter: '',
};

export default Grid;

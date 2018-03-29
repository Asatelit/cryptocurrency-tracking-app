import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import * as wjGrid from 'wijmo/wijmo.grid';
import * as wjGridDetail from 'wijmo/wijmo.grid.detail';
import { FlexGrid, FlexGridColumn } from 'wijmo/wijmo.react.grid';

import PlaylistAdd from 'material-ui-icons/PlaylistAdd';
import FilterList from 'material-ui-icons/FilterList';
/* Custom Components */
import Chart from '../Chart';

import Assets from '../../constants/AssetsTypes';
import formatCell from '../../utils/formatCell';

import './Grid.css';
import './Wijmo.css';

class Grid extends Component {
  cellElements = {};
  clearCells = false;

  componentWillReceiveProps(nextProps) {
    const isUpdated = (a, b) => JSON.stringify(a) !== JSON.stringify(b);
    const grid = window[Assets.WJ_GRID];
    const { settings, itemsSource } = this.props;
    const nextItemSource = nextProps.itemsSource;

    if (isUpdated(nextItemSource, itemsSource)) {
      if (itemsSource.length !== nextItemSource.length) {
        grid.itemsSource = nextProps.itemsSource;
      } else {
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
      }
    }
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
    const grid = gridPanel;
    const { itemsSource } = this.props;
    const detailProvider = new wjGridDetail.FlexGridDetailProvider(grid, {});

    grid.itemsSource = itemsSource;
    window[Assets.WJ_GRID] = grid;

    detailProvider.createDetailCell = row => {
      const { dataItem } = row;
      const detailCell = document.createElement('div');

      ReactDOM.render(
        <div className="DetailCell">
          <Chart dataItem={dataItem} />
        </div>,
        detailCell,
      );

      return detailCell;
    };
  };

  renderNotification = filterText => (
    <div className="Helper">
      {filterText ? (
        <React.Fragment>
          <FilterList className="Helper-icon" />
          <div>No symbols found containing: {filterText}</div>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <PlaylistAdd className="Helper-icon" />
          <div>Please add symbols to a list.</div>
        </React.Fragment>
      )}
    </div>
  );

  render() {
    const { columns, section, settings, filter, itemsSource } = this.props;
    const columnsSection = columns[section];
    return (
      <div className="Grid">
        {!itemsSource.length && this.renderNotification(filter)}
        <FlexGrid
          isReadOnly
          className="FlexGrid"
          selectionMode={wjGrid.SelectionMode.Row}
          autoGenerateColumns={false}
          rows={{ defaultSize: 60 }}
          columnHeaders={{ rows: { defaultSize: 78 } }}
          frozenRows={settings.isFreezeFirstRow ? 1 : 0}
          frozenColumns={settings.isFreezeFirstCol ? 1 : 0}
          formatItem={this.handleFormatItem}
          initialized={this.handleInitialized}
          updatingView={this.handleUpdatingView}
        >
          {columnsSection.map((column, index) => (
            <FlexGridColumn key={column.binding || index} {...column} />
          ))}
        </FlexGrid>
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

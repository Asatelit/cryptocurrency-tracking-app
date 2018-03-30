import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
/* Wijmo */
import * as wjGrid from 'wijmo/wijmo.grid';
import * as wjGridDetail from 'wijmo/wijmo.grid.detail';
import { FlexGrid, FlexGridColumn } from 'wijmo/wijmo.react.grid';
/* Material UI */
import PlaylistAdd from 'material-ui-icons/PlaylistAdd';
import FilterList from 'material-ui-icons/FilterList';
/* Utils */
import Assets from '../../constants/AssetsTypes';
import formatCell from '../../utils/formatCell';
/* Custom Components */
import DetailPanel from '../DetailPanel';
/* CSS */
import './Grid.css';
import './FlexGrid.css';

class Grid extends Component {
  componentWillReceiveProps(nextProps) {
    const { settings, itemsSource } = this.props;
    const isUpdated = (a, b) => JSON.stringify(a) !== JSON.stringify(b);
    const grid = window[Assets.WJ_GRID];
    const nextItemSource = nextProps.itemsSource;

    // Prevent rerender of the Wijmo FlexGrid
    if (isUpdated(nextItemSource, itemsSource)) {
      if (itemsSource.length !== nextItemSource.length) {
        grid.itemsSource = nextProps.itemsSource;
      } else {
        nextItemSource.forEach(entry => {
          const element = this.cellElements[entry.symbol];
          if (element) {
            grid.columns.forEach(col => {
              const cell = element[col.binding];
              if (cell) {
                cell.innerHTML = settings.isCustomCells
                  ? `<div>${formatCell(cell, entry, col, true)}</div>`
                  : `<div>${cell.innerHTML}</div>`;
              }
            });
          }
        });
      }
    }
  }

  cellElements = {}; // stored cell elements
  clearCells = false;

  /**
   * Occurs after the grid has updated its internal layout
   * @arg {Object] [event] - Event data.
   */
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

    if (cellRange.panel !== cells) {
      cell.innerHTML = `<div>${cell.innerHTML}</div>`;
    } else {
      const column = columns[col];
      const item = rows[row].dataItem;

      // clear cell elements
      if (this.clearCells) {
        this.clearCells = false;
        this.cellElements = {};
      }

      if (item) {
        // store cell element
        if (!this.cellElements[item.symbol]) this.cellElements[item.symbol] = { item };
        this.cellElements[item.symbol][column.binding] = cell;
        // custom painting
        cell.innerHTML = settings.isCustomCells
          ? `<div>${formatCell(cell, item, column, false)}</div>`
          : `<div>${cell.innerHTML}</div>`;
      }
    }
  };

  /**
   * Occurs after the grid have been initialized.
   * @arg {Object] gridPanel - GridPanel that contains the range.
   */
  handleInitialized = gridPanel => {
    const grid = gridPanel;
    const { itemsSource } = this.props;

    // Sets the array that contains items shown on the grid.
    grid.itemsSource = itemsSource;

    // TODO: get rid of using the global scope
    window[Assets.WJ_GRID] = grid;

    // Create detail provider
    const detailProvider = new wjGridDetail.FlexGridDetailProvider(grid, {});
    detailProvider.createDetailCell = row => {
      const detailCell = document.createElement('div');
      // Attach detail panel
      ReactDOM.render(<DetailPanel dataItem={row.dataItem} />, detailCell);
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
    const columnsData = columns[section];
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
          {columnsData.map((column, index) => (
            <FlexGridColumn key={column.binding || index} {...column} />
          ))}
        </FlexGrid>
      </div>
    );
  }
}

// prettier-ignore
Grid.propTypes = {
  filter: PropTypes.string,
  section: PropTypes.oneOf([
    Assets.OVERVIEW,
    Assets.PERFORMANCE,
    Assets.TECHNICAL
  ]).isRequired,
  columns: PropTypes.shape({
    binding: PropTypes.string,
    header: PropTypes.string,
    visible: PropTypes.bool,
  }).isRequired,
  itemsSource: PropTypes.arrayOf(
    PropTypes.shape
  ).isRequired,
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

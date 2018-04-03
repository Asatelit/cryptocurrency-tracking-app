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
import { formatCell } from '../../utils/wjUtils';
/* Custom Components */
import DetailPanel from '../DetailPanel';
/* CSS */
import './Grid.css';
import './FlexGrid.css';

class Grid extends Component {
  componentWillReceiveProps(nextProps) {
    const grid = this.flexGrid.control;
    const { settings, itemsSource } = this.props;
    const nextItemSource = nextProps.itemsSource;
    const isUpdated = (a, b) => JSON.stringify(a) !== JSON.stringify(b);

    // return if there are not any updates available
    if (!isUpdated(nextItemSource, itemsSource)) return;

    if (itemsSource.length === nextItemSource.length) {
      // select the modified rows only
      const modified = nextItemSource.filter((entry, index) =>
        isUpdated(entry, itemsSource[index]),
      );

      modified.forEach(item => {
        const storedRow = this.cellElements[item.symbol]; // get stored row
        if (storedRow) {
          grid.columns.forEach(col => {
            const storedCell = storedRow[col.binding]; // get stored cell
            if (storedCell) {
              storedCell.innerHTML = settings.isCustomCells
                ? `<div>${formatCell(storedCell, item, col, true)}</div>`
                : `<div>${storedCell.innerHTML}</div>`;
            }
          });
        }
      });
    } else {
      // update itemsSource
      grid.itemsSource = nextProps.itemsSource;
    }
  }

  setFlexGridRef = ref => {
    this.flexGrid = ref;
    this.props.onUpdateReference(ref);
  };

  cellElements = {}; // stored cell elements
  flexGrid = null; // wjFlexGrid reference
  requestClearCells = false;

  /**
   * Occurs after the grid has updated its internal layout
   * @arg {Object] [event] - Event data.
   */
  handleUpdatingView = () => {
    // clear cell elements on next formatItem
    this.requestClearCells = true;
  };

  /**
   * Occurs when an element representing a cell has been created.
   * @arg {Object] gridPanel - GridPanel that contains the range.
   * @arg {Object] cellRange - Range of cells affected by the event.
   */
  handleFormatItem = (gridPanel, cellRange) => {
    const { cell, col, row, panel } = cellRange;
    const { rows, columns, cells } = gridPanel;
    const { settings } = this.props;

    if (cells === panel) {
      const column = columns[col];
      const item = rows[row].dataItem;

      // clear cell elements
      if (this.requestClearCells) {
        this.requestClearCells = false;
        this.cellElements = {};
      }

      if (item) {
        // create stored cell element (if it is needed)
        if (!this.cellElements[item.symbol]) {
          this.cellElements[item.symbol] = { item };
        }
        // store cell element
        this.cellElements[item.symbol][column.binding] = cell;
        // custom painting
        cell.innerHTML = settings.isCustomCells
          ? `<div>${formatCell(cell, item, column, false)}</div>`
          : `<div>${cell.innerHTML}</div>`;
      }
    } else {
      cell.innerHTML = `<div>${cell.innerHTML}</div>`;
    }
  };

  /**
   * Occurs after the grid have been initialized.
   * @arg {Object] gridPanel - GridPanel that contains the range.
   */
  handleInitialized = gridPanel => {
    // Create detail provider
    const detailProvider = new wjGridDetail.FlexGridDetailProvider(gridPanel, {});
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
          ref={this.setFlexGridRef}
          selectionMode={wjGrid.SelectionMode.Row}
          autoGenerateColumns={false}
          rows={{ defaultSize: settings.rowHeight }}
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
    isAutoUpdate: PropTypes.bool,
    isCustomCells: PropTypes.bool,
    isFreezeFirstCol: PropTypes.bool,
    isFreezeFirstRow: PropTypes.bool,
    rowHeight: PropTypes.number,
    updateInterval: PropTypes.number,
  }).isRequired,
  onUpdateReference: PropTypes.func.isRequired,
};

Grid.defaultProps = {
  filter: '',
};

export default Grid;

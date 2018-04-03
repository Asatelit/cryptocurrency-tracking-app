import keyMirror from '../utils/keyMirror';

const ActionTypes = keyMirror({
  // DATA
  RECEIVE_TICKERS_DATA: null,
  RECEIVE_TRADING_DATA: null,
  CHANGE_COLUMN_VISIBILITY: null,

  // PORTFOLIO
  GET_PORTFOLIO: null,
  GET_PORTFOLIOS: null,
  ADD_PORTFOLIO: null,
  DELETE_PORTFOLIO: null,
  SELECT_PORTFOLIO: null,
  EDIT_PORTFOLIO: null,

  // USER
  OPEN_ADD_DIALOG: null,
  CLOSE_ADD_DIALOG: null,
  OPEN_EDIT_DIALOG: null,
  CLOSE_EDIT_DIALOG: null,
  OPEN_SYMBOLS_DIALOG: null,
  CLOSE_SYMBOLS_DIALOG: null,
  TOGGLE_SETTINGS_PANEL: null,

  // APP
  CHANGE_FILTER_TEXT: null,
  CHANGE_GRID_SECTION: null,
  UPDATE_SETTINGS: null,
});

export default ActionTypes;

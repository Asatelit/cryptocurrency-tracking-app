import Action from '../constants/ActionTypes';
import Assets from '../constants/AssetsTypes';
import createReducer from '../utils/createReducer';

// prettier-ignore
const initialState = {
  columns: {
    [Assets.OVERVIEW]: [
      { binding: 'name', header: 'Name', width: 220, allowDragging: false, visible: true },
      { binding: 'open', header: 'Open', format: 'n2', width: 160, allowSorting: true, visible: true },
      { binding: 'close', header: 'Last', format: 'n2', width: 160, allowSorting: true, visible: true },
      { binding: 'high', header: 'High', format: 'n2', width: 160, allowSorting: true, visible: true },
      { binding: 'low', header: 'Low', format: 'n2', width: 160, allowSorting: true, visible: true },
      { binding: 'chg', header: 'Chg.', format: 'n2', align: 'center', width: 300, allowSorting: true, visible: true },
      { binding: 'volume', header: 'Volume', format: 'n0', width: 160, align: 'center', allowSorting: true, visible: true },
      { binding: 'time', header: 'Time', width: 160, format: 'hh:mm:ss', align: 'center', allowSorting: true, visible: true },
      { width: '*'},
    ],
    [Assets.TECHNICAL]: [
      { binding: 'name', header: 'Name', width: 220, allowDragging: false, visible: true },
      { binding: 'technicalMinutes15', header: '15 Minutes', format: 'n0',width: 220, allowDragging: false, visible: true },
      { binding: 'technicalMinutes30', header: '30 Minutes', format: 'n0', width: 220, allowSorting: true, visible: true },
      { binding: 'technicalHourly', header: 'Hourly', format: 'n0', width: 220, allowSorting: true, visible: true },
      { binding: 'technicalWeekly', header: 'Weekly', format: 'n0', width: 220, allowSorting: true, visible: true },
      { binding: 'technicalMonthly', header: 'Monthly', format: 'n0', width: 220, allowSorting: true, visible: true },
      { width: '*'},
    ],
    [Assets.PERFORMANCE]: [
      { binding: 'name', header: 'Name', width: 220, allowDragging: false },
      { binding: 'performanceDaily', header: 'Daily', format: 'n0', width: 220, allowSorting: true, visible: true },
      { binding: 'performanceWeek', header: '1 Week', format: 'n0', width: 220, allowSorting: true, visible: true },
      { binding: 'performanceMonth', header: '1 Month', format: 'n0', width: 220, allowSorting: true, visible: true },
      { binding: 'performanceYtd', header: 'YTD', format: 'n0', width: 220, allowSorting: true, visible: true },
      { binding: 'performanceYear', header: '1 Year', format: 'n0', width: 220, allowSorting: true, visible: true },
      { binding: 'performanceYear3', header: '3 Years', format: 'n0', width: 220, allowSorting: true, visible: true },
      { width: '*'},
    ],
  },
  tickers: [],
  trading: [],
  filter: '',
};

/**
 * ## Data Reducers
 */
export default createReducer(initialState, {
  [Action.RECEIVE_TRADING_DATA]: (state, payload) => ({
    ...state,
    trading: payload,
  }),

  [Action.RECEIVE_TICKERS_DATA]: (state, payload) => ({
    ...state,
    tickers: payload,
  }),

  [Action.CHANGE_FILTER_TEXT]: (state, payload) => ({
    ...state,
    filter: payload,
  }),

  [Action.CHANGE_COLUMN_VISIBILITY]: (state, payload) => {
    const { section, binding, visibility } = payload;
    const columns = {
      ...state.columns,
      [section]: state.columns[section].map(
        col => (col.binding === binding ? { ...col, visible: visibility } : col),
      ),
    };
    return {
      ...state,
      columns,
    };
  },
});

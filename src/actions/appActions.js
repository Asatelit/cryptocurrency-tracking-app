import humps from 'humps';
import ActionTypes from '../constants/ActionTypes';
import generateTradingData from '../utils/generateTradingData';
import { selectPortfolio, editPortfolio } from './portfoliosActions';
import { getTradingData, getTickers } from './dataActions';

/**
 * Get initial trading data
 */
export function getInitialState() {
  return (dispatch, getStore) => {
    fetch('./coinmarketcap-top20.json')
      .then(response => response.json())
      .then(data => {
        const { selected, list } = getStore().portfolios;
        const portfolio = list.find(entry => entry.name === selected);
        const tickers = humps.camelizeKeys(data);
        const trading = generateTradingData(portfolio.symbols, tickers);

        dispatch(getTradingData(trading));
        dispatch(getTickers(tickers));
      })
      .catch(ex => {
        console.error('parsing failed', ex);
      });
  };
}

/**
 * Get trading market data
 * @arg {string] name - The name of the portfolio
 */
export function changeCurrentPortfolio(name) {
  return (dispatch, getStore) => {
    const { list } = getStore().portfolios;
    const { tickers } = getStore().data;
    const portfolio = list.find(entry => entry.name === name);
    const trading = generateTradingData(portfolio.symbols, tickers);
    dispatch(selectPortfolio(name));
    dispatch(getTradingData(trading));
  };
}

/**
 * Update portfolio and trading market data
 * @arg {Object] portfolio
 * @arg {string] portfolio.name - The name of the portfolio
 * @arg {Object] portfolio.data
 * @arg {string] portfolio.data.name - The new name of the portfolio
 * @arg {Array] portfolio.data.symbols - The new symbols
 */
export function updateTradingData(portfolio) {
  return (dispatch, getStore) => {
    const { selected } = getStore().portfolios;
    const { tickers } = getStore().data;
    const trading = generateTradingData(portfolio.data.symbols, tickers);
    dispatch(editPortfolio(portfolio));
    return selected === portfolio.name
      ? dispatch(getTradingData(trading))
      : Promise.resolve();
  };
}

/**
 * Changes columns visibility
 * @arg {boolean} visibility
 * @arg {string} binding
 */
export function changeColumnsVisibility(binding, visibility) {
  return (dispatch, getStore) => {
    const { gridSection } = getStore().app;
    return dispatch({
      type: ActionTypes.CHANGE_COLUMN_VISIBILITY,
      payload: { section: gridSection, binding, visibility },
    });
  };
}

export function changeFilterText(str) {
  return {
    type: ActionTypes.CHANGE_FILTER_TEXT,
    payload: str,
  };
}

/**
 * Updates settings
 * @arg {Object} settings
 */
export function updateSettings(settings) {
  return {
    type: ActionTypes.UPDATE_SETTINGS,
    payload: settings,
  };
}

/**
 * Open Add Portfolio dialog
 */
export function openAddDialog() {
  return {
    type: ActionTypes.OPEN_ADD_DIALOG,
  };
}

/**
 * Open Add Portfolio dialog
 */
export function closeAddDialog() {
  return {
    type: ActionTypes.CLOSE_ADD_DIALOG,
  };
}

/**
 * Open Edit Portfolios dialog
 */
export function openEditDialog() {
  return {
    type: ActionTypes.OPEN_EDIT_DIALOG,
  };
}

/**
 * Close Edit Portfolios dialog
 */
export function closeEditDialog() {
  return {
    type: ActionTypes.CLOSE_EDIT_DIALOG,
  };
}

/**
 * Open Symbols Portfolios dialog
 */
export function openSymbolsDialog() {
  return {
    type: ActionTypes.OPEN_SYMBOLS_DIALOG,
  };
}

/**
 * Close Edit Portfolios dialog
 */
export function closeSymbolsDialog() {
  return {
    type: ActionTypes.CLOSE_SYMBOLS_DIALOG,
  };
}

/**
 * Close Edit Portfolios dialog
 */
export function toggleSettingsPanel() {
  return {
    type: ActionTypes.TOGGLE_SETTINGS_PANEL,
  };
}

/**
 *
 */
export function changeGridSection(id) {
  return {
    type: ActionTypes.CHANGE_GRID_SECTION,
    payload: id,
  };
}

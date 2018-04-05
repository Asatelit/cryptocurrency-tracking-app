import humps from 'humps';
import ActionTypes from '../constants/ActionTypes';
import generateTradingData from '../utils/generateTradingData';
import { selectPortfolio, editPortfolio } from './portfoliosActions';
import { updateTradingData, updateTickers } from './dataActions';

/**
 * Request trading market data
 */
export function requestTradingData() {
  return (dispatch, getStore) => {
    fetch('./coinmarketcap-top20.json')
      .then(response => response.json())
      .then(data => {
        const { selected, list } = getStore().portfolios;
        const { trading } = getStore().data;
        const portfolio = list.find(entry => entry.name === selected);
        const tickers = humps.camelizeKeys(data);
        const tradingData = generateTradingData(portfolio.symbols, tickers, trading);

        dispatch(updateTradingData(tradingData));
        dispatch(updateTickers(tickers));
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
    dispatch(updateTradingData(trading));
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
export function updateData(portfolio) {
  return (dispatch, getStore) => {
    const { selected } = getStore().portfolios;
    const { tickers } = getStore().data;
    const trading = generateTradingData(portfolio.data.symbols, tickers);
    dispatch(editPortfolio(portfolio));
    return selected === portfolio.name
      ? dispatch(updateTradingData(trading))
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

/**
 * Set filter text
 * @arg {string} str
 */
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
 * Close Add Portfolio dialog
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
 * Close Symbols dialog
 */
export function closeSymbolsDialog() {
  return {
    type: ActionTypes.CLOSE_SYMBOLS_DIALOG,
  };
}

/**
 * Toggle Symbols dialog
 */
export function toggleSettingsPanel() {
  return {
    type: ActionTypes.TOGGLE_SETTINGS_PANEL,
  };
}

/**
 * Change section
 */
export function changeGridSection(id) {
  return {
    type: ActionTypes.CHANGE_GRID_SECTION,
    payload: id,
  };
}

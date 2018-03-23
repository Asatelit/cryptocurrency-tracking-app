import ActionTypes from '../constants/ActionTypes';

/**
 * Get trading market data
 * @arg {Object[]} data
 */
export function getTradingData(data) {
  return dispatch =>
    dispatch({
      type: ActionTypes.RECEIVE_TRADING_DATA,
      payload: data,
    });
}

/**
 * Get tickers data
 * @arg {Object[]} data
 * @arg {string} data.id
 * @arg {string} data.name
 * @arg {string} data.symbol
 * @arg {string} data.rank
 * @arg {string} data.priceUsd
 * @arg {string} data.priceBtc
 * @arg {string} data.24hVolumeUsd
 * @arg {string} data.marketCapUsd
 * @arg {string} data.availableSupply
 * @arg {string} data.totalSupply
 * @arg {string} data.maxSupply
 * @arg {string} data.percentChange1h
 * @arg {string} data.percentChange24h
 * @arg {string} data.percentChange7d
 * @arg {string} data.lastUpdated
 */
export function getTickers(data) {
  return dispatch =>
    dispatch({
      type: ActionTypes.RECEIVE_TICKERS_DATA,
      payload: data,
    });
}

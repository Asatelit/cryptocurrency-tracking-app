import ActionTypes from '../constants/ActionTypes';

/**
 * Updates trading market data
 * @arg {Object[]} data
 * @arg {string} data.id
 * @arg {string} data.symbol
 * @arg {string} data.name
 * @arg {number} data.close
 * @arg {number} data.open
 * @arg {number} data.chg
 * @arg {number} data.high
 * @arg {number} data.low
 * @arg {number} data.volume
 * @arg {number} data.time
 * @arg {number} data.technicalMinutes15
 * @arg {number} data.technicalMinutes30
 * @arg {number} data.technicalHourly
 * @arg {number} data.technicalWeekly
 * @arg {number} data.technicalMonthly
 * @arg {number} data.performanceDaily
 * @arg {number} data.performanceWeek
 * @arg {number} data.performanceMonth
 * @arg {number} data.performanceYtd
 * @arg {number} data.performanceYear
 * @arg {number} data.performanceYear3
 */
export function updateTradingData(data) {
  return {
    type: ActionTypes.RECEIVE_TRADING_DATA,
    payload: data,
  };
}

/**
 * Updates tickers data
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
export function updateTickers(data) {
  return {
    type: ActionTypes.RECEIVE_TICKERS_DATA,
    payload: data,
  };
}

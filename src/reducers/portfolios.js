import createReducer from '../utils/createReducer';
import Action from '../constants/ActionTypes';

const initialState = {
  list: [
    {
      name: 'Holdings',
      symbols: [
        'BTC',
        'ETH',
        'XRP',
        'BCH',
        'LTC',
        'ADA',
        'NEO',
        'XLM',
        'EOS',
        'XMR',
        'DASH',
        'XEM',
      ],
    },
    { name: 'Watching', symbols: [] },
  ],
  selected: 'Holdings',
};

/**
 * ## Portfolio Reducers
 */
export default createReducer(initialState, {
  /**
   * Add portfolio
   * @param {string] payload - The name of the portfolio
   */
  [Action.ADD_PORTFOLIO]: (state, payload) => ({
    ...state,
    list: [...state.list, { name: payload, symbols: [] }],
  }),

  /**
   * Delete portfolio
   * @param {string] payload - The name of the portfolio
   */
  [Action.DELETE_PORTFOLIO]: (state, payload) => {
    const list = state.list.filter(portfolio => portfolio.name !== payload);

    return {
      ...state,
      list,
      selected: state.selected === payload ? list[0].name : state.selected,
    };
  },

  /**
   * Get all the information of a portfolio
   * @param {string] payload - The name of the portfolio
   */
  [Action.SELECT_PORTFOLIO]: (state, payload) => ({
    ...state,
    selected: payload,
  }),

  /**
   * Edit a portfolio
   * @param {Object] payload
   * @param {string] payload.name - The name of the portfolio
   * @param {Object] payload.data
   * @param {string] payload.data.name - The new name of the portfolio
   * @param {Array] payload.data.name - The new symbols
   */
  [Action.EDIT_PORTFOLIO]: (state, payload) => ({
    ...state,
    list: state.list.map(
      portfolio => (portfolio.name === payload.name ? payload.data : portfolio),
    ),
  }),
});

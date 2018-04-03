import createReducer from '../utils/createReducer';
import Action from '../constants/ActionTypes';
import Assets from '../constants/AssetsTypes';

const initialState = {
  isAddDialogOpen: false,
  isEditDialogOpen: false,
  isSettingsPanelOpen: false,
  isSymbolsDialogOpen: false,
  gridSection: Assets.OVERVIEW,
  settings: {
    isAutoUpdate: true,
    isCustomCells: true,
    isFreezeFirstCol: false,
    isFreezeFirstRow: false,
    rowHeight: 60,
    updateInterval: 30000,
  },
};

/**
 * ## App Reducers
 */
export default createReducer(initialState, {
  [Action.OPEN_ADD_DIALOG]: state => ({
    ...state,
    isAddDialogOpen: true,
  }),

  [Action.CLOSE_ADD_DIALOG]: state => ({
    ...state,
    isAddDialogOpen: false,
  }),

  [Action.OPEN_EDIT_DIALOG]: state => ({
    ...state,
    isEditDialogOpen: true,
  }),

  [Action.CLOSE_EDIT_DIALOG]: state => ({
    ...state,
    isEditDialogOpen: false,
  }),

  [Action.OPEN_SYMBOLS_DIALOG]: state => ({
    ...state,
    isSymbolsDialogOpen: true,
  }),

  [Action.CLOSE_SYMBOLS_DIALOG]: state => ({
    ...state,
    isSymbolsDialogOpen: false,
  }),

  [Action.TOGGLE_SETTINGS_PANEL]: state => ({
    ...state,
    isSettingsPanelOpen: !state.isSettingsPanelOpen,
  }),

  [Action.CHANGE_GRID_SECTION]: (state, payload) => ({
    ...state,
    gridSection: payload,
  }),

  [Action.UPDATE_SETTINGS]: (state, payload) => ({
    ...state,
    settings: { ...state.settings, ...payload },
  }),
});

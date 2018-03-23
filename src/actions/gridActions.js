import ActionTypes from '../constants/ActionTypes';

export function download() {
  return {
    type: ActionTypes.GRID_EXPORT,
  };
}

export function print() {
  return {
    type: ActionTypes.GRID_PRINT,
  };
}

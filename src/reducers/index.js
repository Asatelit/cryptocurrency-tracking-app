import { combineReducers } from 'redux';
import app from './app';
import data from './data';
import grid from './grid';
import portfolios from './portfolios';

const rootReducer = combineReducers({
  app,
  portfolios,
  data,
  grid,
});

export default rootReducer;

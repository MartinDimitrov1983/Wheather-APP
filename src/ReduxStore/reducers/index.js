import { combineReducers } from 'redux';
import currentCity from './currentCity';
import favorites from './favorites'
import unit from './unit'

const rootReducer = combineReducers({
  currentCity,
  favorites,
  unit
});

export default rootReducer;

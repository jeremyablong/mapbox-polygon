import { combineReducers } from 'redux';
import homesReducer from './homesReducer';
import listReducer from './listReducer';
import listingsReducer from './listingsReducer';

export default combineReducers({
    homes: homesReducer,
    list: listReducer,
    listings: listingsReducer
});
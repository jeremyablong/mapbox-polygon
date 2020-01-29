import { combineReducers } from 'redux';
import homesReducer from './homesReducer';
import listReducer from './listReducer';

export default combineReducers({
    homes: homesReducer,
    list: listReducer
});
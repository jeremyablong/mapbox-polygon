import { combineReducers } from 'redux';
import homesReducer from './homesReducer';
import listReducer from './listReducer';

// Sets state for mapStateToProps functions

export default combineReducers({
    homes: homesReducer,
    list: listReducer
});
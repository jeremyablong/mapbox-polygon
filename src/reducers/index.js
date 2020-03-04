import { combineReducers } from 'redux';
import homesReducer from './homesReducer';
import listReducer from './listReducer';
import coords from "./coords.js";
import LN from "./LNNumberReducer.js";

// Sets state for mapStateToProps functions

export default combineReducers({
    homes: homesReducer,
    list: listReducer,
    coords,
    LN
});
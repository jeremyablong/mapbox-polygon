import { combineReducers } from 'redux';
import homesReducer from './homesReducer';
import listReducer from './listReducer';
import imageReducer from './imageReducer';

export default combineReducers({
    homes: homesReducer,
    list: listReducer,
    image: imageReducer
});
import _ from 'lodash';
import {
    FETCH_HOMES
} from '../actions/types';

export default (state = {}, action) => {
    switch (action.type) {
        case FETCH_HOMES:
            return { ...state, ..._.mapKeys(action.payload, 'id')};
        default:
            return state;
    }
}
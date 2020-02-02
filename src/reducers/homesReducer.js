import {
    FETCH_HOME
} from '../actions/types';

export default (state = {}, action) => {
    switch (action.type) {
        case FETCH_HOME:
            return { ...state, [action.payload.id]: action.payload };
        default:
            return state;
    }
}
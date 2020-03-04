import {
    L_N
} from '../actions/types';

// Returns previous state and replaces with newly returned payload from action

export default (state = {}, action) => {
    switch (action.type) {
        case L_N:
            return { 
            	...state,  
            	LN: action.unique
            };
        default:
            return state;
    }
}
import * as Actions from '../actions';


const initialState = {
    selected: "none"
};

const nodesReducer = function (state = initialState, action) {
    switch (action.type) {
        case Actions.SELECT_NODE:
            console.log("ACTION:", action.payload)
            return {
                ...state,
                selected: action.payload
            };
        default:
            {
                return state;
            }
    }
};

export default nodesReducer;
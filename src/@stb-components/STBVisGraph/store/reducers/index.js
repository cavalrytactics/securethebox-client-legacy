import {combineReducers} from 'redux';
import nodesReducer from './nodes.reducer';

const reducer = combineReducers({
    nodes: nodesReducer
});

export default reducer;

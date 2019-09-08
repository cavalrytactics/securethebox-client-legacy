export const SELECT_NODE = 'SELECT_NODE';

export const selectNode = (node) => async dispatch => {
    console.log("dispatched...",node)
    await dispatch({ type: SELECT_NODE, payload: node })
}

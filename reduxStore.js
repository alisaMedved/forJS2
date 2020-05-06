

const createStore = (reducers, initialState) => {
    let state = initialState;
    return {
        getState: () => state,
        dispatch: action => {state = reducer(state, action)}
    }
}

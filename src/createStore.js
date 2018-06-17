import ActionTypes from './utils/actionTypes';

export default function createStore(reducer, enhancer) {
  let state = undefined;
  let listeners = [];
  if (enhancer) {
    return enhancer(createStore)(reducer);
  }

  function getState() {
    return state;
  }

  function subscribe(listener) {
    listeners.push(listener);
  }

  function dispatch(action) {
    state = reducer(state, action);
    listeners.forEach(v => v());
  }

  // When a store is created, an "INIT" action is dispatched so that every
  // reducer returns their initial state. This effectively populates
  // the initial state tree.
  dispatch({ type: ActionTypes.INIT });

  return {
    getState,
    subscribe,
    dispatch,
  };
}

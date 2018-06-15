export default function createStore(reducer, enhancer) {
  let state = null;
  let listeners = [];
  if (enhancer) {
    return enhancer(createStore(reducer));
  }

  function getState() {
    return state || 0;
  }

  function subscribe(listener) {
    listeners.push(listener);
  }

  function dispatch(action) {
    state = reducer(state, action);
    listeners.forEach(v => v());
  }

  return {
    getState,
    subscribe,
    dispatch,
  };
}

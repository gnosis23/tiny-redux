function createStore(reducer) {
  var state = null;
  var listeners = [];

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
function createStore(reducer, enhancer) {
  var state = null;
  var listeners = [];
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

// return (store) => new store
function applyMiddleware(middlewares) {
  return (store) => {
    const mids = middlewares.map(m => m(store));
    mids.reverse();
    let dispatch = mids.reduce(
      (dis, mid) => mid(dis),
      store.dispatch
    );
    store.dispatch = dispatch;
    return store;
  }
}

export {
  createStore,
  applyMiddleware,
}

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
    listeners.forEach(function (v) {
      return v();
    });
  }

  return {
    getState: getState,
    subscribe: subscribe,
    dispatch: dispatch
  };
}

// return (store) => new store
function applyMiddleware(middlewares) {
  return function (store) {
    var mids = middlewares.map(function (m) {
      return m(store);
    });
    mids.reverse();
    var dispatch = mids.reduce(function (dis, mid) {
      return mid(dis);
    }, store.dispatch);
    store.dispatch = dispatch;
    return store;
  };
}

export { createStore, applyMiddleware };

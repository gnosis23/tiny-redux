function createStore(reducer, enhancer) {
  var state = null;
  var listeners = [];
  if (enhancer) {
    return enhancer(createStore)(reducer);
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

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

// return (store) => new store
function applyMiddleware() {
  for (var _len = arguments.length, middlewares = Array(_len), _key = 0; _key < _len; _key++) {
    middlewares[_key] = arguments[_key];
  }

  return function (createStore) {
    return function () {
      for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      var store = createStore.apply(undefined, args);
      var _dispatch = function dispatch() {
        throw new Error("ispatching while constructing your middleware is not allowed." + "Other middleware would not be applied to this dispatch.");
      };

      var middlewareAPI = {
        getState: store.getState,
        // the dispatch passed in here must be proxied
        // this dispatch will be reassigned
        dispatch: function dispatch() {
          return _dispatch.apply(undefined, arguments);
        }
      };

      // soft copy
      middlewares = middlewares.slice();
      middlewares.reverse();

      var mids = middlewares.map(function (m) {
        return m(middlewareAPI);
      });
      _dispatch = mids.reduce(function (dis, mid) {
        return mid(dis);
      }, store.dispatch);

      return _extends({}, store, {
        dispatch: _dispatch
      });
    };
  };
}

export { createStore, applyMiddleware };

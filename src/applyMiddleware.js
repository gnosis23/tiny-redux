// return (store) => new store
export default function applyMiddleware(...middlewares) {
  return createStore => (...args) => {
    const store = createStore(...args);
    let dispatch = () => {
      throw new Error(
        `ispatching while constructing your middleware is not allowed.` +
        `Other middleware would not be applied to this dispatch.`
      )
    };

    const middlewareAPI = {
      getState: store.getState,
      // the dispatch passed in here must be proxied
      // this dispatch will be reassigned
      dispatch: (...args) => dispatch(...args)
    };

    // soft copy
    middlewares = middlewares.slice();
    middlewares.reverse();

    const mids = middlewares.map(m => m(middlewareAPI));
    dispatch = mids.reduce(
      (dis, mid) => mid(dis),
      store.dispatch
    );

    return {
      ...store,
      dispatch,
    };
  }
}

import compose from './compose';

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

    const chain = middlewares.map(middleware => middleware(middlewareAPI));
    dispatch = compose(...chain)(store.dispatch);

    return {
      ...store,
      dispatch,
    };
  }
}

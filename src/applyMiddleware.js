// return (store) => new store
export default function applyMiddleware(...middlewares) {
  return (store) => {
    // soft copy
    middlewares = middlewares.slice();
    middlewares.reverse();
    const mids = middlewares.map(m => m(store));
    store.dispatch = mids.reduce(
      (dis, mid) => mid(dis),
      store.dispatch
    );
    return store;
  }
}

// return (store) => new store
export default function applyMiddleware(middlewares) {
  return (store) => {
    const mids = middlewares.map(m => m(store));
    mids.reverse();
    store.dispatch = mids.reduce(
      (dis, mid) => mid(dis),
      store.dispatch
    );
    return store;
  }
}

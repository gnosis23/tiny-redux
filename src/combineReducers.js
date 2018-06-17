
export default function combineReducers(reducerObject) {
  if (reducerObject === null || typeof(reducerObject) !== 'object') {
    throw new Error('reducers is not object');
  }

  let missedReducer = undefined;
  Object.keys(reducerObject).forEach(key => {
    if (reducerObject[key] === undefined) {
      missedReducer = key;
    }
  });
  if (missedReducer) {
    console.error(`No reducer provided for key "${missedReducer}"`);
  }

  return (store, action) => {
    const nextStore = {};
    Object.keys(reducerObject).forEach(key => {
      if (reducerObject[key]) {
        if (action === null) {
          throw new Error(`"${key}" not an action`);
        }
        if (action.type === undefined) {
          throw new Error(`"${key}" not an action`);
        }
        const value = reducerObject[key](store[key], action);
        if (value === undefined) {
          throw new Error(`"${action.type}" gets undefined for key "${key}"`);
        }
        nextStore[key] = value;
      }
    });
    return nextStore;
  };
}

import React from 'react'
import ReactDOM from 'react-dom'
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from './redux'
import Counter from './components/Counter'
import counter from './reducers'

const store = createStore(counter, applyMiddleware(thunk));
const rootEl = document.getElementById('root');

function incrementAsync() {
  return dispatch => {
    setTimeout(() => {
      dispatch({type: 'INCREMENT'})
    }, 1000);
  }
}

const render = () => ReactDOM.render(
  <Counter
    value={store.getState()}
    onIncrement={() => store.dispatch({ type: 'INCREMENT' })}
    onDecrement={() => store.dispatch({ type: 'DECREMENT' })}
    onIncrementAsync={() => store.dispatch(incrementAsync())}
  />,
  rootEl
);

render();
store.subscribe(render);

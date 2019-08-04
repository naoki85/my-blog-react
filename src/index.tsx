import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import thunk from 'redux-thunk';
import App from './containers/App';
import posts from "./reducers";
import { applyMiddleware, compose, createStore, StoreEnhancerStoreCreator, combineReducers } from "redux";
import * as serviceWorker from './serviceWorker';

export interface CustomWindow extends Window {
  __REDUX_DEVTOOLS_EXTENSION__: () => StoreEnhancerStoreCreator<{}, {}>;
}
declare let window: CustomWindow;

const rootReducer = () => combineReducers({ posts });

const store = createStore(rootReducer(), compose(
  applyMiddleware(thunk),
  window.__REDUX_DEVTOOLS_EXTENSION__
    ? window.__REDUX_DEVTOOLS_EXTENSION__()
    : (f: StoreEnhancerStoreCreator<{}, {}>) => f
));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

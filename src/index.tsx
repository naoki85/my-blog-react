import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import App from './containers/App';
import postReducer from "./reducers";
import { compose, createStore, StoreEnhancerStoreCreator } from "redux";
import * as serviceWorker from './serviceWorker';

export interface CustomWindow extends Window {
  __REDUX_DEVTOOLS_EXTENSION__: () => StoreEnhancerStoreCreator<{}, {}>;
}
declare let window: CustomWindow;
const composeEnhancers = (window.__REDUX_DEVTOOLS_EXTENSION__() as typeof compose) || compose;

const store = createStore(postReducer, composeEnhancers);

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

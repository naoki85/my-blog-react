import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Redirect, Switch } from 'react-router-dom';
import { Provider } from "react-redux";
import thunk from 'redux-thunk';
import {routerMiddleware, connectRouter, ConnectedRouter} from 'connected-react-router';
import { History, createBrowserHistory } from 'history';
import App from './containers/App';
import PostShow from './containers/posts/Show';
import Footer from './containers/Footer';
import Navbar from './containers/Navbar';
import posts from "./reducers";
import recommendedBooks from "./reducers/recommendedBooks";
import { applyMiddleware, compose, createStore, StoreEnhancerStoreCreator, combineReducers } from "redux";
import * as serviceWorker from './serviceWorker';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import { ThemeProvider } from '@material-ui/styles';
import theme from './styles/theme'

export interface CustomWindow extends Window {
  __REDUX_DEVTOOLS_EXTENSION__: () => StoreEnhancerStoreCreator<{}, {}>;
}
declare let window: CustomWindow;

const history = createBrowserHistory();

const rootReducer = (history: History<{}>) => combineReducers({
  router: connectRouter(history),
  posts,
  recommendedBooks
});

const configureStore = (history: History<{}>) => {
  return createStore(rootReducer(history), compose(
    applyMiddleware(routerMiddleware(history), thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__
      ? window.__REDUX_DEVTOOLS_EXTENSION__()
      : (f: StoreEnhancerStoreCreator<{}, {}>) => f
  ));
};
const store = configureStore(history);

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <CssBaseline />
        <Navbar />
        <Container maxWidth="lg">
          <Switch>
            <Route path={'/posts/:id'} component={PostShow} />
            <Route exact={true} path={'/'} component={App} />
            <Redirect to={'/'} />
          </Switch>
        </Container>
        <Footer />
      </ConnectedRouter>
    </Provider>
  </ThemeProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

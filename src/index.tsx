import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Redirect, Switch } from 'react-router-dom';
import { Provider } from "react-redux";
import thunk from 'redux-thunk';
import {routerMiddleware, connectRouter, ConnectedRouter} from 'connected-react-router';
import { History, createBrowserHistory } from 'history';
import App from './containers/App';
import PostShow from './containers/posts/Show';
import Footer from './components/organisms/Footer';
import Navbar from './components/organisms/Navbar';
import WithAuth from "./containers/admin/Admin";
import adminLogin from "./containers/admin/Login";
import adminPostsIndex from "./containers/admin/posts/Index";
import adminPostsNew from "./containers/admin/posts/New";
import adminPostsEdit from "./containers/admin/posts/Edit";
import adminRecommendedBooksIndex from "./containers/admin/recommended_books/Index";
import ErrorsNotFound from './containers/errors/NotFound';
import posts from "./reducers";
import recommendedBooks from "./reducers/recommendedBooks";
import auth from "./reducers/auth";
import imageUpload from "./reducers/imageUpload";
import { applyMiddleware, compose, createStore, StoreEnhancerStoreCreator, combineReducers } from "redux";
import * as serviceWorker from './serviceWorker';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import { ThemeProvider } from '@material-ui/styles';
import theme from './styles/theme';
import ReactGA from 'react-ga';

export interface CustomWindow extends Window {
  __REDUX_DEVTOOLS_EXTENSION__: () => StoreEnhancerStoreCreator<{}, {}>;
}
declare let window: CustomWindow;

export const history = createBrowserHistory();
ReactGA.initialize('UA-123372116-2');
history.listen(({ pathname }) => {
  ReactGA.set({ page: pathname });
  ReactGA.pageview(pathname);
});

const rootReducer = (history: History<{} | null | undefined>) => combineReducers({
  router: connectRouter(history),
  posts,
  recommendedBooks,
  auth,
  imageUpload
});

const configureStore = (history: History<{} | null | undefined>) => {
  return createStore(rootReducer(history), compose(
    applyMiddleware(routerMiddleware(history), thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__
      ? window.__REDUX_DEVTOOLS_EXTENSION__()
      : (f: StoreEnhancerStoreCreator<{}, {}>) => f
  ));
};
const store = configureStore(history);

const classRoot = {
  display: 'flex',
};
const classMain = {
  marginTop: '70px',
};

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <div style={classRoot}>
          <CssBaseline />
          <Navbar />
          <Container maxWidth="lg" style={classMain}>
            <Switch>
              <Route path={'/posts/:id'} component={PostShow} />
              <Route exact={true} path={'/not_found'} component={ErrorsNotFound} />
              <Route exact={true} path={'/admin/login'} component={adminLogin} />
              <Route exact={true} path={'/admin/posts/new'} component={WithAuth(adminPostsNew)} />
              <Route path={'/admin/posts/edit/:id'} component={WithAuth(adminPostsEdit)} />
              <Route exact={true} path={'/admin/posts'} component={WithAuth(adminPostsIndex)} />
              <Route exact={true} path={'/admin/recommended_books'} component={WithAuth(adminRecommendedBooksIndex)} />
              <Route exact={true} path={'/'} component={App} />
              <Redirect to={'/not_found'} />
            </Switch>
            <Footer />
          </Container>
        </div>
      </ConnectedRouter>
    </Provider>
  </ThemeProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

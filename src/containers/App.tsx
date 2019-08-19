import React from "react";
import { connect } from "react-redux";
import { Dispatch, Action, AnyAction } from "redux";
import {Location, StoreState} from "../types/state";
import { Actions } from '../actions';
import AppComponent, { AppProps, AppStateProps, AppDispatchProps } from '../components/App';
import ReactGA from "react-ga";

export const mapStateToProps = function(state: StoreState): AppStateProps {
  return {
    posts: state.posts.Posts,
    page: state.posts.Page,
    maxPage: state.posts.MaxPage,
    loading: state.posts.loading
  }
};

const mapDispatchToProps = function(
  dispatch: Dispatch<Action<{}>>
): AppDispatchProps & {
    dispatch: Dispatch<Action<{}>>;
  } {
  const dispatchOverThunk = dispatch as (
    thunk: (
      dispatch: Dispatch<AnyAction>,
      getState: () => StoreState
    ) => Promise<void>
  ) => void | Dispatch;

  return {
    dispatch,
    fetchPosts: (page: number) => dispatchOverThunk(Actions.fetchPosts(page))
  };
};

class Posts extends React.Component<AppProps & { dispatch: Dispatch; location: Location }> {
  componentDidMount() {
    const { pathname } = this.props.location;
    ReactGA.set({ page: pathname });
    ReactGA.pageview(pathname);

    const dispatch = this.props.dispatch as (
      thunk: (
        dispatch: Dispatch<AnyAction>,
        getState: () => StoreState
      ) => Promise<void>
    ) => void | Dispatch;
    dispatch(Actions.fetchPosts(1));
  }
  render() {
    return <AppComponent {...this.props} />;
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Posts);

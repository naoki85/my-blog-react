import React from "react";
import { connect } from "react-redux";
import { Dispatch, Action, AnyAction } from "redux";
import { StoreState } from "../types/state";
import { Actions } from '../actions';
import AppComponent, { AppStateProps } from '../components/App';

export const mapStateToProps = function(state: StoreState): AppStateProps {
  return {
    posts: state.posts || []
  }
};

const mapDispatchToProps = function(
  dispatch: Dispatch<Action<{}>>
): {
    dispatch: Dispatch<Action<{}>>;
  } {
  return {
    dispatch,
  };
};

class Posts extends React.Component<AppStateProps & { dispatch: Dispatch }> {
  componentDidMount() {
    const dispatch = this.props.dispatch as (
      thunk: (
        dispatch: Dispatch<AnyAction>,
        getState: () => StoreState
      ) => Promise<void>
    ) => void | Dispatch;
    dispatch(Actions.fetchPosts());
  }
  render() {
    return <AppComponent {...this.props} />;
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Posts);

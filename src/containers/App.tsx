import { connect } from "react-redux";
import { Dispatch } from "redux";
import { StoreState } from "../types/state";
import { fetchPosts } from '../actions';
import { PostsState } from '../reducers';
import AppComponent, { AppStateProps } from '../components/App';

export const mapStateToProps = function(state: StoreState): AppStateProps {
  return {
    posts: state.posts || []
  }
};

interface DispatchProps {
  fetchPosts: () => PostsState;
}

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  fetchPosts: () => dispatch(fetchPosts()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppComponent);

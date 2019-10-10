import React from "react";
import { connect } from "react-redux";
import { Dispatch, Action, AnyAction } from "redux";
import PostShowComponent, { PostProps } from '../../components/posts/Show';
import { Match, StoreState, Post, RecommendedBook, Location } from "../../types/state";
import { Actions } from "../../actions";
import {RecommendedBooksActions} from "../../actions/recommendedBooks";
import ReactGA from 'react-ga';

const mapStateToProps = function(state: StoreState) {
  return {
    posts: state.posts.Posts,
    loading: state.posts.loading,
    recommendedBooks: state.recommendedBooks.Books,
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

class PostShow extends React.Component<PostProps &
{ posts: Post[]; recommendedBooks: RecommendedBook[]; match: Match; dispatch: Dispatch; location: Location }> {
  componentDidMount() {
    const { pathname } = this.props.location;
    ReactGA.set({ page: pathname });
    ReactGA.pageview(pathname);

    const postId = Number(this.props.match.params.id);
    const dispatch = this.props.dispatch as (
      thunk: (
        dispatch: Dispatch<AnyAction>,
        getState: () => StoreState
      ) => Promise<void>
    ) => void | Dispatch;
    dispatch(Actions.fetchPost(postId));
    dispatch(RecommendedBooksActions.fetchRecommendedBooks());
  }

  render() {
    const post = this.props.posts[0];
    if (!post) {
      return null;
    }

    return <PostShowComponent post={post} loading={this.props.loading} recommendedBooks={this.props.recommendedBooks} />;
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostShow);

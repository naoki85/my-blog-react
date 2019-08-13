import React from "react";
import { connect } from "react-redux";
import { Dispatch, Action, AnyAction } from "redux";
import PostShowComponent, { PostProps } from '../../components/posts/Show';
import { Match, StoreState, Post, RecommendedBook } from "../../types/state";
import { Actions } from "../../actions";
import {RecommendedBooksActions} from "../../actions/recommendedBooks";

const mapStateToProps = function(state: StoreState) {
  return {
    posts: state.posts.Posts,
    recommendedBooks: state.recommendedBooks,
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
{ posts: Post[]; recommendedBooks: RecommendedBook[]; match: Match; dispatch: Dispatch }> {
  componentDidMount() {
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

    return <PostShowComponent post={post} recommendedBooks={this.props.recommendedBooks} />;
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostShow);

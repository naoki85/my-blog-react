import React from "react";
import { Dispatch, Action, AnyAction } from "redux";
import { connect } from "react-redux";
import {RecommendedBooksActions} from "../../../actions/recommendedBooks";
import {StoreState, RecommendedBook} from "../../../types/state";
import AdminRecommendedBooksIndexComponent, { RecommendedBooksProps } from '../../../components/admin/recommended_books/Index';

const mapStateToProps = function(state: StoreState) {
  return {
    recommendedBooks: state.recommendedBooks,
  }
};

const mapDispatchToProps = (dispatch: Dispatch<Action<{}>>): {
  dispatch: Dispatch<Action<{}>>;
} => {
  return {
    dispatch,
  };
};

class AdminRecommendedBooksIndex extends React.Component<RecommendedBooksProps &
{ dispatch: Dispatch; recommendedBooks: RecommendedBook[] }> {
  componentDidMount() {
    const dispatch = this.props.dispatch as (
      thunk: (
        dispatch: Dispatch<AnyAction>,
        getState: () => StoreState
      ) => Promise<void>
    ) => void | Dispatch;
    dispatch(RecommendedBooksActions.fetchRecommendedBooks());
  }

  render() {
    return <AdminRecommendedBooksIndexComponent recommendedBooks={this.props.recommendedBooks} />;
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminRecommendedBooksIndex);


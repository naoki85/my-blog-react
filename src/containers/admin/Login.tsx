import React from "react";
import { connect } from "react-redux";
import { Dispatch, Action } from "redux";
import AdminLoginComponent, { AdminLoginProps } from '../../components/admin/Login';
import { StoreState } from "../../types/state";

const mapStateToProps = function(state: StoreState) {
  return {
    auth: state.auth
  }
};

const mapDispatchToProps = (dispatch: Dispatch<Action<{}>>): {
  dispatch: Dispatch<Action<{}>>;
} => {
  return {
    dispatch,
  };
};

class AdminLogin extends React.Component<AdminLoginProps & { dispatch: Dispatch }> {
  render() {
    return <AdminLoginComponent auth={this.props.auth} dispatch={this.props.dispatch} />;
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminLogin);

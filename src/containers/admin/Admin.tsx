import React from "react";
import {Dispatch} from 'redux';
import { RouteComponentProps } from 'react-router';
import { localStorageItemName } from '../../config/const';
import CustomizedMenus from '../../components/admin/Menu';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function withAuth(AuthComponent: any) {
  return class AuthWrapped extends React.Component<RouteComponentProps & { dispatch: Dispatch }> {
    componentWillMount() {
      const token = localStorage.getItem(localStorageItemName);
      if (!token) {
        this.props.history.replace('/admin/login');
      }
    }

    render() {
      if (localStorage.getItem(localStorageItemName)) {
        return (
          <>
            <CustomizedMenus />
            <AuthComponent history={this.props.history} />
          </>
        )
      } else {
        return null;
      }
    }
  }
}

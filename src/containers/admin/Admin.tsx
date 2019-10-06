import React from "react";
import { RouteComponentProps } from 'react-router';
import {localStorageItemName} from '../../config/const';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function withAuth(AuthComponent: any) {
  return class AuthWrapped extends React.Component<RouteComponentProps> {
    componentWillMount() {
      const token = localStorage.getItem(localStorageItemName);
      if (!token) {
        this.props.history.replace('/admin/login');
      }
    }

    render() {
      if (localStorage.getItem('blogNaoki85AuthenticationToken')) {
        return (
          <AuthComponent history={this.props.history} />
        )
      } else {
        return null;
      }
    }
  }
}

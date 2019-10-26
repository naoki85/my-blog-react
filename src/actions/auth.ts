import axios from 'axios';
import {Auth} from '../types/state';
import {ActionsUnion, createAction} from './types';
import {Dispatch, AnyAction} from 'redux';
import {history} from '../index';
import {apiURL, localStorageItemName} from '../config/const';

export enum TypeKeys {
  TRY_LOGIN = 'TRY_LOGIN',
  LOGIN_SUCCESS = 'LOGIN_SUCCESS',
  LOGIN_FAIL = 'LOGIN_FAIL',
  TRY_LOGOUT = 'TRY_LOGOUT',
  LOGOUT_SUCCESS = 'LOGOUT_SUCCESS',
}

const defaultRequestHeaders = {
  'Content-Type': 'application/json',
};
const defaultRequestBody = {};

const loginStart = () => createAction(TypeKeys.TRY_LOGIN, {});
const logoutStart = () => createAction(TypeKeys.TRY_LOGOUT, {});

const loginSuccess = (data: Auth) =>
  createAction(TypeKeys.LOGIN_SUCCESS, {
    data,
  });
const logoutSuccess = (data: Auth) =>
  createAction(TypeKeys.LOGOUT_SUCCESS, {
    data,
  });

const loginFail = (data: Auth) => createAction(TypeKeys.LOGIN_FAIL, {data});

const tryLogin = (email: string, password: string) => {
  return async (dispatch: Dispatch<AnyAction>) => {
    dispatch(loginStart());
    let mergedBody = Object.assign({}, defaultRequestBody);
    mergedBody = Object.assign(mergedBody, {email, password});
    try {
      const response = await axios.post(
        `${apiURL}/login`,
        JSON.stringify(mergedBody),
        {headers: defaultRequestHeaders}
      );
      localStorage.setItem(localStorageItemName, response.data);
      dispatch(
        loginSuccess({
          Status: 'success',
          Message: 'Login succeed.',
        })
      );
      setTimeout(() => history.push('/admin/posts'), 2000);
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e.message);
      dispatch(
        loginFail({
          Status: 'error',
          Message: 'Login failure',
        })
      );
    }
  };
};

const tryLogout = () => {
  return async (dispatch: Dispatch<AnyAction>) => {
    dispatch(logoutStart());
    const token = localStorage.getItem(localStorageItemName);
    let mergedHeader = Object.assign({}, defaultRequestHeaders);
    mergedHeader = Object.assign(mergedHeader, {
      Authorization: 'Bearer ' + token,
    });
    try {
      await axios.delete(`${apiURL}/logout`, {
        data: defaultRequestBody,
        headers: mergedHeader,
      });
      dispatch(logoutSuccess({}));
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e.message);
    } finally {
      localStorage.setItem(localStorageItemName, '');
      history.push('/admin/login');
    }
  };
};

export const DispatchActions = {
  loginSuccess,
  loginFail,
  logoutSuccess,
};
export const AuthActions = {
  ...DispatchActions,
  tryLogin,
  tryLogout,
};
export type AuthActions = ActionsUnion<typeof DispatchActions>;

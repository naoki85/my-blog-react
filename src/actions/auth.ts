import axios from 'axios';
import { Auth } from '../types/state';
import { ActionsUnion, createAction } from './types';
import { Dispatch, AnyAction } from 'redux';
import { history } from '../index';

export enum TypeKeys {
  TRY_LOGIN = 'TRY_LOGIN',
  LOGIN_SUCCESS = 'LOGIN_SUCCESS',
  LOGIN_FAIL = 'LOGIN_FAIL',
}

declare let process: {
  env: {
    REACT_APP_API_URL: string;
    LOCAL_STORAGE_ITEM_NAME: string;
  };
};

const apiURL = process.env.REACT_APP_API_URL;
const itemName = process.env.LOCAL_STORAGE_ITEM_NAME;
const defaultRequestHeaders = {
  "Content-Type": "application/json"
};
const defaultRequestBody = {};

const loginStart = () => createAction(TypeKeys.TRY_LOGIN, {});

const loginSuccess = (data: Auth) =>
  createAction(TypeKeys.LOGIN_SUCCESS, {
    data,
  });

const loginFail = (data: Auth) =>
  createAction(TypeKeys.LOGIN_FAIL, { data });

const tryLogin = (email: string, password: string) => {
  return async (dispatch: Dispatch<AnyAction>) => {
    dispatch(loginStart());
    let mergedBody = Object.assign({}, defaultRequestBody);
    mergedBody = Object.assign(mergedBody, { email, password });
    try {
      const response = await axios.post(`${apiURL}/login`, JSON.stringify(mergedBody),
        {headers: defaultRequestHeaders});
      localStorage.setItem(itemName, response.data);
      dispatch(loginSuccess({
        Status: 'success',
        Message: 'Login succeed.'
      }));
      history.push('/admin/posts');
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e.message);
      dispatch(loginFail({
        Status: 'error',
        Message: 'Login failure'
      }));
    }
  };
};

export const DispatchActions = {
  loginSuccess,
  loginFail,
};
export const AuthActions = {
  ...DispatchActions,
  tryLogin,
};
export type AuthActions = ActionsUnion<typeof DispatchActions>;

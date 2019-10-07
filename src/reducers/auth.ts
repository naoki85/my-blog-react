import { AuthActions, TypeKeys } from '../actions/auth';
import { Auth } from '../types/state';

export const initialState: Auth = {};

export default (state = initialState, action: AuthActions) => {
  switch (action.type) {
    case TypeKeys.LOGIN_SUCCESS:
    case TypeKeys.LOGIN_FAIL:
    case TypeKeys.LOGOUT_SUCCESS: {
      return action.payload.data;
    }
    default: {
      return state;
    }
  }
};


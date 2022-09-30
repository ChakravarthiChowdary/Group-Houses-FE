import { AnyAction } from "redux";
import { AuthReducerState } from "../../types/StateTypes";
import {
  AUTH_AUTOLOGIN_FAIL,
  AUTH_AUTOLOGIN_START,
  AUTH_AUTOLOGIN_SUCCESS,
  AUTH_SIGNIN_FAIL,
  AUTH_SIGNIN_START,
  AUTH_SIGNIN_SUCCESS,
  CLEAN_UP_AUTH_STATE,
  FORGOT_PASSWORD_FAIL,
  FORGOT_PASSWORD_START,
  FORGOT_PASSWORD_SUCCESS,
  SIGN_OUT,
  SIGN_UP_FAIL,
  SIGN_UP_START,
  SIGN_UP_SUCCESS,
} from "../actionTypes/authActionTypes";

const initialState: AuthReducerState = {
  user: null,
  loading: false,
  error: null,
  passwordChangeRequired: false,
  passwordUpdated: false,
};

export const authReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case AUTH_SIGNIN_START:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case AUTH_SIGNIN_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        user: action.payload,
      };
    case AUTH_SIGNIN_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
        user: null,
      };
    case AUTH_AUTOLOGIN_START:
      return {
        ...state,
        autoLoginLoading: true,
      };
    case AUTH_AUTOLOGIN_FAIL:
      return {
        ...state,
        autoLoginLoading: false,
        user: null,
      };
    case AUTH_AUTOLOGIN_SUCCESS:
      return {
        ...state,
        autoLoginLoading: false,
        user: action.payload,
      };
    case FORGOT_PASSWORD_START:
      return {
        ...state,
        loading: true,
        error: null,
        passwordUpdated: false,
      };
    case FORGOT_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        passwordUpdated: true,
        error: null,
      };
    case FORGOT_PASSWORD_FAIL:
      return {
        ...state,
        loading: false,
        passwordUpdated: false,
        error: action.payload,
      };
    case CLEAN_UP_AUTH_STATE:
      return initialState;
    case SIGN_UP_START:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case SIGN_UP_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        passwordChangeRequired: action.payload.passwordChangeRequired,
        user: action.payload,
      };
    case SIGN_UP_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
        passwordChangeRequired: false,
      };
    case SIGN_OUT:
      localStorage.removeItem("user");
      return initialState;
    default:
      return state;
  }
};

import { AnyAction } from "redux";
import { ThunkAction } from "redux-thunk";
import { User } from "../../types/StateTypes";
import {
  AUTH_AUTOLOGIN_FAIL,
  AUTH_AUTOLOGIN_START,
  AUTH_AUTOLOGIN_SUCCESS,
  AUTH_SIGNIN_FAIL,
  AUTH_SIGNIN_START,
  AUTH_SIGNIN_SUCCESS,
  FORGOT_PASSWORD_FAIL,
  FORGOT_PASSWORD_START,
  FORGOT_PASSWORD_SUCCESS,
  SIGN_UP_FAIL,
  SIGN_UP_START,
  SIGN_UP_SUCCESS,
} from "../actionTypes/authActionTypes";
import { RootState } from "../store";

export const signIn = (
  email: string,
  password: string
): ThunkAction<void, RootState, unknown, AnyAction> => {
  return async (dispatch) => {
    try {
      dispatch({ type: AUTH_SIGNIN_START });
      const response = await fetch("http://localhost:5000/api/v1/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();

      if (result.errors || result.error) {
        dispatch({
          type: AUTH_SIGNIN_FAIL,
          payload: result.errors
            ? {
                message: result.errors[0].msg,
                statusCode: 500,
                requestStatus: "Fail",
              }
            : result.error,
        });
        return;
      }

      localStorage.setItem("user", JSON.stringify(result));
      dispatch({ type: AUTH_SIGNIN_SUCCESS, payload: result });
    } catch (error) {
      dispatch({ type: AUTH_SIGNIN_FAIL, payload: error });
    }
  };
};

export const autoLogin = (): ThunkAction<
  void,
  RootState,
  unknown,
  AnyAction
> => {
  return async (dispatch) => {
    try {
      dispatch({ type: AUTH_AUTOLOGIN_START });
      let user = localStorage.getItem("user");
      if (user) {
        const userInfo: User = await JSON.parse(user);

        const currentDate = new Date();
        const expiryDate = new Date(userInfo.expiresIn);

        if (expiryDate < currentDate) {
          dispatch({ type: AUTH_AUTOLOGIN_FAIL });
          return;
        }

        dispatch({ type: AUTH_AUTOLOGIN_SUCCESS, payload: userInfo });
      } else {
        dispatch({ type: AUTH_AUTOLOGIN_FAIL });
        localStorage.removeItem("user");
      }
    } catch (error) {
      dispatch({ type: AUTH_AUTOLOGIN_FAIL, payload: error });
      localStorage.removeItem("user");
    }
  };
};

export const forgotPassword = (
  email: string,
  password: string,
  confirmPassword: string,
  dateOfBirth: Date,
  securityQuestion: string,
  securityAnswer: string
): ThunkAction<void, RootState, unknown, AnyAction> => {
  return async (dispatch) => {
    try {
      dispatch({ type: FORGOT_PASSWORD_START });

      const response = await fetch(
        "http://localhost:5000/api/v1/auth/forgotpassword",
        {
          method: "POST",
          body: JSON.stringify({
            email,
            newPassword: password,
            confirmNewPassword: confirmPassword,
            dateOfBirth,
            securityAnswer,
            securityQuestion,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const result = await response.json();

      if (result.errors || result.error) {
        dispatch({
          type: FORGOT_PASSWORD_FAIL,
          payload: result.errors
            ? {
                message: result.errors[0].msg,
                statusCode: 500,
                requestStatus: "Fail",
              }
            : result.error,
        });
        return;
      }

      dispatch({
        type: FORGOT_PASSWORD_SUCCESS,
        payload: {
          ...result,
        },
      });
    } catch (error) {
      dispatch({ type: FORGOT_PASSWORD_FAIL, payload: error });
    }
  };
};

export const signUpUser = (
  email: string,
  password: string,
  name: string,
  confirmPassword: string,
  files: FileList | null,
  dateOfBirth: Date,
  securityQuestion: string,
  securityAnswer: string
): ThunkAction<void, RootState, unknown, AnyAction> => {
  return async (dispatch) => {
    try {
      dispatch({ type: SIGN_UP_START });

      const response = await fetch("http://localhost:5000/api/v1/auth/signup", {
        method: "POST",
        body: JSON.stringify({
          email,
          password,
          name,
          confirmPassword,
          dateOfBirth,
          securityAnswer,
          securityQuestion,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = await response.json();

      if (result.errors || result.error) {
        dispatch({
          type: SIGN_UP_FAIL,
          payload: result.errors
            ? {
                message: result.errors[0].msg,
                statusCode: 500,
                requestStatus: "Fail",
              }
            : result.error,
        });
        return;
      }

      let uploadResult;

      if (files && files.length > 0) {
        const formData = new FormData();
        formData.append("image", files[0]);
        formData.append("userId", result._id);

        const uploadResponse = await fetch(
          "http://localhost:5000/api/v1/auth/upload/userprofilepic",
          {
            method: "POST",
            body: formData,
          }
        );

        uploadResult = await uploadResponse.json();

        if (uploadResult.errors || uploadResult.error) {
          dispatch({
            type: SIGN_UP_FAIL,
            payload: uploadResult.errors
              ? {
                  message: uploadResult.errors[0].msg,
                  statusCode: 500,
                  requestStatus: "Fail",
                }
              : uploadResult.error,
          });
          return;
        }
      }

      localStorage.setItem(
        "user",
        JSON.stringify({
          ...result,
          photoUrl: uploadResult ? uploadResult.photoUrl : "",
        })
      );

      dispatch({
        type: SIGN_UP_SUCCESS,
        payload: {
          ...result,
          photoUrl: uploadResult ? uploadResult.photoUrl : "",
        },
      });
    } catch (error) {
      dispatch({ type: SIGN_UP_FAIL, payload: error });
    }
  };
};

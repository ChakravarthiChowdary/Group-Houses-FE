import { ActionTypes } from "@mui/base";
import { AnyAction } from "redux";
import { ThunkAction } from "redux-thunk";
import { LatestNews } from "../../types/StateTypes";
import {
  DELETE_NEWS_FAIL,
  DELETE_NEWS_SUCCESS,
  FAV_NEWS_FAIL,
  FAV_NEWS_SUCCESS,
  GET_FAV_LIKED_NEWS_FAIL,
  GET_FAV_LIKED_NEWS_SUCCESS,
  GET_LATEST_NEWS_FAIL,
  GET_LATEST_NEWS_START,
  GET_LATEST_NEWS_SUCCESS,
  GET_MYPOSTS_FAIL,
  GET_MYPOSTS_START,
  GET_MYPOSTS_SUCCESS,
  LIKED_NEWS_ERROR,
  LIKED_NEWS_SUCCESS,
  POST_LATEST_NEWS_FAIL,
  POST_LATEST_NEWS_START,
  POST_LATEST_NEWS_SUCCESS,
} from "../actionTypes/latestNewsActionTypes";
import { RootState } from "../store";

export const getLatestNews = (): ThunkAction<
  void,
  RootState,
  unknown,
  AnyAction
> => {
  return async (dispatch, getState) => {
    try {
      const token = getState().auth.user.token;
      dispatch({ type: GET_LATEST_NEWS_START });

      const response = await fetch("http://localhost:5000/api/v1/latestNews", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const result = await response.json();

      if (result.errors || result.error) {
        dispatch({
          type: GET_LATEST_NEWS_FAIL,
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

      const likedOrFavNewsResponse = await fetch(
        "http://localhost:5000/api/v1/latestNews/likeandfavnews",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const likedOrFavNewsResult = await likedOrFavNewsResponse.json();

      if (likedOrFavNewsResult.errors || likedOrFavNewsResult.error) {
        dispatch({
          type: GET_FAV_LIKED_NEWS_FAIL,
          payload: likedOrFavNewsResult.errors
            ? {
                message: likedOrFavNewsResult.errors[0].msg,
                statusCode: 500,
                requestStatus: "Fail",
              }
            : likedOrFavNewsResult.error,
        });
        return;
      }
      dispatch({ type: GET_LATEST_NEWS_SUCCESS, payload: result.latestNews });

      dispatch({
        type: GET_FAV_LIKED_NEWS_SUCCESS,
        payload: {
          likedNews: likedOrFavNewsResult.likedNews,
          favNews: likedOrFavNewsResult.favNews,
        },
      });
    } catch (error) {
      dispatch({ type: GET_LATEST_NEWS_FAIL, payload: error });
    }
  };
};

export const postLatestNews = (
  title: string,
  description: string,
  files: FileList | null
): ThunkAction<void, RootState, unknown, AnyAction> => {
  return async (dispatch, getState) => {
    try {
      const token = getState().auth.user.token;
      const userId = getState().auth.user.id;
      dispatch({ type: POST_LATEST_NEWS_START });

      const response = await fetch("http://localhost:5000/api/v1/latestNews", {
        method: "POST",
        body: JSON.stringify({
          title,
          description,
          userId,
        }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await response.json();

      if (result.errors || result.error) {
        dispatch({
          type: POST_LATEST_NEWS_FAIL,
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
        formData.append("ticketId", result._id);
        formData.append("userId", result.userId);

        const uploadResponse = await fetch(
          "http://localhost:5000/api/v1/latestNews/upload/latestNewsImage",
          {
            method: "POST",
            body: formData,
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        uploadResult = await uploadResponse.json();

        if (uploadResult.errors || uploadResult.error) {
          dispatch({
            type: POST_LATEST_NEWS_FAIL,
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

      dispatch({
        type: POST_LATEST_NEWS_SUCCESS,
      });
    } catch (error) {
      dispatch({ type: POST_LATEST_NEWS_FAIL, payload: error });
    }
  };
};

export const getMyPosts = (): ThunkAction<
  void,
  RootState,
  unknown,
  AnyAction
> => {
  return async (dispatch, getState) => {
    try {
      const { id, token } = getState().auth.user;
      dispatch({ type: GET_MYPOSTS_START });
      const response = await fetch(
        `http://localhost:5000/api/v1/latestNews/myPosts/${id}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const result = await response.json();
      if (result.errors || result.error) {
        dispatch({
          type: GET_MYPOSTS_FAIL,
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

      dispatch({ type: GET_MYPOSTS_SUCCESS, payload: result.posts });
    } catch (error) {
      dispatch({ type: GET_MYPOSTS_FAIL, payload: error });
    }
  };
};

export const deleteNews = (
  newsId: string
): ThunkAction<void, RootState, unknown, AnyAction> => {
  return async (dispatch, getState) => {
    try {
      const token = getState().auth.user.token;

      const response = await fetch(
        `http://localhost:5000/api/v1/latestNews/${newsId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 204) {
        dispatch({ type: DELETE_NEWS_SUCCESS, payload: newsId });
        return;
      }

      const result = await response.json();

      if (result.errors || result.error) {
        dispatch({
          type: DELETE_NEWS_FAIL,
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
    } catch (error) {
      dispatch({ type: DELETE_NEWS_FAIL, payload: error });
    }
  };
};

export const likeNews = (
  newsId: string,
  news: LatestNews
): ThunkAction<void, RootState, unknown, AnyAction> => {
  return async (dispatch, getState) => {
    try {
      const likedNews = getState().latestNews.likedNews;
      const token = getState().auth.user.token;

      const response = await fetch(
        `http://localhost:5000/api/v1/latestNews/like/${newsId}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const result = await response.json();

      if (result.errors || result.error) {
        dispatch({
          type: LIKED_NEWS_ERROR,
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

      if (result.fav) {
        likedNews.push(news);
      }

      dispatch({
        type: LIKED_NEWS_SUCCESS,
        payload: result.fav
          ? likedNews
          : likedNews.filter((el: LatestNews) => el._id !== news._id),
      });
    } catch (error) {
      dispatch({ type: LIKED_NEWS_ERROR, payload: error });
    }
  };
};

export const favoNews = (
  newsId: string,
  news: LatestNews
): ThunkAction<void, RootState, unknown, AnyAction> => {
  return async (dispatch, getState) => {
    try {
      const token = getState().auth.user.token;
      const favNews = getState().latestNews.favNews;

      const response = await fetch(
        `http://localhost:5000/api/v1/latestNews/fav/${newsId}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const result = await response.json();

      if (result.errors || result.error) {
        dispatch({
          type: FAV_NEWS_FAIL,
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
      console.log(result);
      if (result.fav) {
        favNews.push(news);
      }

      dispatch({
        type: FAV_NEWS_SUCCESS,
        payload: result.fav
          ? favNews
          : favNews.filter((el: LatestNews) => el._id !== news._id),
      });
    } catch (error) {
      dispatch({ type: FAV_NEWS_FAIL, payload: error });
    }
  };
};

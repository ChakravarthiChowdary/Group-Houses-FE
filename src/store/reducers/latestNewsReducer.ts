import { AnyAction } from "redux";
import { LatetsNewsState } from "../../types/StateTypes";
import { SIGN_OUT } from "../actionTypes/authActionTypes";
import {
  CLEAR_POST_NEWS_STATE,
  DELETE_NEWS_SUCCESS,
  GET_LATEST_NEWS_FAIL,
  GET_LATEST_NEWS_START,
  GET_LATEST_NEWS_SUCCESS,
  GET_MYPOSTS_FAIL,
  GET_MYPOSTS_START,
  GET_MYPOSTS_SUCCESS,
  POST_LATEST_NEWS_FAIL,
  POST_LATEST_NEWS_START,
  POST_LATEST_NEWS_SUCCESS,
} from "../actionTypes/latestNewsActionTypes";

const initialState: LatetsNewsState = {
  loading: false,
  error: null,
  latestNews: [],
  postLoading: false,
  postError: null,
  postSuccess: false,
  myPostsLoading: false,
  myPosts: [],
  myPostsError: null,
};

export const latestNewsReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case GET_LATEST_NEWS_START:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case GET_LATEST_NEWS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        latestNews: action.payload,
      };
    case GET_LATEST_NEWS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
        latestNews: [],
      };
    case POST_LATEST_NEWS_START:
      return {
        ...state,
        postLoading: true,
        postError: null,
        postSuccess: false,
      };
    case POST_LATEST_NEWS_SUCCESS:
      return {
        ...state,
        postLoading: false,
        postError: null,
        postSuccess: true,
      };
    case POST_LATEST_NEWS_FAIL:
      return {
        ...state,
        postLoading: false,
        postError: action.payload,
        postSuccess: false,
      };
    case CLEAR_POST_NEWS_STATE:
      return {
        ...state,
        postLoading: false,
        postError: null,
        postSuccess: false,
      };
    case GET_MYPOSTS_START:
      return {
        ...state,
        myPostsLoading: true,
        myPostsError: null,
      };
    case GET_MYPOSTS_SUCCESS:
      return {
        ...state,
        myPostsLoading: false,
        myPostsError: null,
        myPosts: action.payload,
      };
    case GET_MYPOSTS_FAIL:
      return {
        ...state,
        myPostsLoading: false,
        myPostsError: action.payload,
        myPosts: [],
      };
    case DELETE_NEWS_SUCCESS:
      return {
        ...state,
        myPosts: state.myPosts.filter((post) => post._id !== action.payload),
      };
    case SIGN_OUT:
      return initialState;
    default:
      return state;
  }
};

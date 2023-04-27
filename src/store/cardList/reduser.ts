import { Reducer } from 'react';
import {
  PostRequestAction,
  PostRequestSuccessAction,
  PostRequestErrorAction,
  POST_LIST_REQUEST,
  POST_LIST_REQUEST_ERROR,
  POST_LIST_REQUEST_SUCCESS,
} from './action';

export type PostListState = {
  loading: boolean;
  error: string;
  data: [];
};

type PostListActions =
  | PostRequestAction
  | PostRequestSuccessAction
  | PostRequestErrorAction;

export const postListReduser: Reducer<PostListState, PostListActions> = (
  state,
  action
) => {
  switch (action.type) {
    case POST_LIST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case POST_LIST_REQUEST_ERROR:
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    case POST_LIST_REQUEST_SUCCESS:
      return {
        ...state,
        data: action.data,
        loading: false,
      };
    default:
      return state;
  }
};

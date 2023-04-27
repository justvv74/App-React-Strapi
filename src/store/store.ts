import { Reducer, configureStore } from "@reduxjs/toolkit";
import { PostListState, postListReduser } from "./cardList/reduser";
import {
  POST_LIST_REQUEST,
  POST_LIST_REQUEST_ERROR,
  POST_LIST_REQUEST_SUCCESS,
  PostRequestAction,
  PostRequestErrorAction,
  PostRequestSuccessAction,
} from "./cardList/action";

export interface RootState {
  postList: PostListState;
}

const initialState: RootState = {
  postList: {
    data: [],
    loading: false,
    error: "",
  },
};

type MyAction =
  | PostRequestAction
  | PostRequestSuccessAction
  | PostRequestErrorAction;

export const rootReduser: Reducer<RootState, MyAction> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case POST_LIST_REQUEST:
    case POST_LIST_REQUEST_SUCCESS:
    case POST_LIST_REQUEST_ERROR:
      return {
        ...state,
        postList: postListReduser(state.postList, action),
      };
    default:
      return state;
  }
};

export const store = configureStore({
  reducer: rootReduser,
});

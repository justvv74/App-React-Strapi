import axios from "axios";
import { ActionCreator, Action } from "redux";
import { ThunkAction } from "redux-thunk";
import { RootState } from "../store";

export const POST_LIST_REQUEST = "POST_LIST_REQUEST";
export type PostRequestAction = {
  type: typeof POST_LIST_REQUEST;
};
export const postRequest: ActionCreator<PostRequestAction> = () => ({
  type: POST_LIST_REQUEST,
});

export const POST_LIST_REQUEST_SUCCESS = "POST_LIST_REQUEST_SUCCESS";
export type PostRequestSuccessAction = {
  type: typeof POST_LIST_REQUEST_SUCCESS;
  data: [];
};

export const postRequestSuccess: ActionCreator<PostRequestSuccessAction> = (
  data: [],
  after: string
) => ({
  type: POST_LIST_REQUEST_SUCCESS,
  data,
});

export const POST_LIST_REQUEST_ERROR = "POST_LIST_REQUEST_ERROR";
export type PostRequestErrorAction = {
  type: typeof POST_LIST_REQUEST_ERROR;
  error: string;
};

export const postRequestError: ActionCreator<PostRequestErrorAction> = (
  error: string
) => ({
  type: POST_LIST_REQUEST_ERROR,
  error,
});

export const postListRequestAsync =
  (): ThunkAction<void, RootState, unknown, Action<string>> => (dispatch) => {
    dispatch(postRequest());
    console.log(112233);
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}api/posts`)
      .then((res) => {
        dispatch(postRequestSuccess(res.data.data));
      })
      .catch((err) => dispatch(postRequestError(String(err))));
  };

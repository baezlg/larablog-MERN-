import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import {
  addCommentReducer,
  commentListReducer,
  popularPostReducer,
  postCatCountReducer,
  postCatReducer,
  postListReducer,
  postReducer,
} from "./post/postReducers";

const reducer = combineReducers({
  postList: postListReducer,
  popularPostList: popularPostReducer,
  postCatCountList: postCatCountReducer,
  postCatList: postCatReducer,
  postItem: postReducer,
  commentList: commentListReducer,
  addcomment: addCommentReducer,
});

const initialState = {};

const middleware = [thunk, logger];

const store = createStore(
  reducer,
  initialState,
  applyMiddleware(...middleware)
);

export default store;

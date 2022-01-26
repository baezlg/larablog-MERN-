import axios from "axios";
import { types } from "./../types";

export const listPosts =
  (newPosts = false, page) =>
  async (dispatch) => {
    try {
      dispatch({ type: types.POST_LIST_REQUEST });
      let res;
      if (newPosts) {
        res = await axios.get(`http://localhost:8080/api/posts?new=true`);
      } else {
        res = await axios.get(`http://localhost:8080/api/posts?page=${page}`);
        console.log(res);
      }

      dispatch({
        type: types.POST_LIST_SUCCESS,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: types.POST_LIST_FAIL,
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      });
    }
  };
export const getPost = (slug) => async (dispatch) => {
  try {
    dispatch({ type: types.POST_REQUEST });

    const { data } = await axios.get(`http://localhost:8080/api/posts/${slug}`);

    dispatch({
      type: types.POST_SUCCESS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: types.POST_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export const listPopularPost = () => async (dispatch) => {
  try {
    dispatch({ type: types.POPULAR_POSTS_REQUEST });

    const res = await axios.get(`http://localhost:8080/api/posts/popular-post`);

    dispatch({
      type: types.POPULAR_POSTS_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: types.POPULAR_POSTS_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export const listCatCount = () => async (dispatch) => {
  try {
    dispatch({ type: types.POST_CAT_COUNT_REQUEST });

    const res = await axios.get(
      `http://localhost:8080/api/posts/categories-count`
    );

    dispatch({
      type: types.POST_CAT_COUNT_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: types.POST_CAT_COUNT_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};
export const listCat = () => async (dispatch) => {
  try {
    dispatch({ type: types.POST_CAT_REQUEST });

    const res = await axios.get(`http://localhost:8080/api/categories`);

    dispatch({
      type: types.POST_CAT_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: types.POST_CAT_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};
export const listComment = (id) => async (dispatch) => {
  try {
    dispatch({ type: types.COMMENT_LIST_REQUEST });

    if (id) {
      const res = await axios.get(
        `http://localhost:8080/api/posts/${id}/comments`
      );
      dispatch({
        type: types.COMMENT_LIST_SUCCESS,
        payload: res.data,
      });
    }
  } catch (err) {
    dispatch({
      type: types.COMMENT_LIST_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};
export const addCommentAction = (id, body) => async (dispatch) => {
  try {
    dispatch({ type: types.ADD_COMMENT_REQUEST });

    if (id) {
      const res = await axios.post(
        `http://localhost:8080/api/posts/${id}/comments`,
        body
      );
      dispatch({
        type: types.ADD_COMMENT_SUCCESS,
        payload: res.data,
      });
    }
  } catch (err) {
    dispatch({
      type: types.ADD_COMMENT_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

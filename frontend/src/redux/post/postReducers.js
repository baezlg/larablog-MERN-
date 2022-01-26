import { types } from "./../types";

export const postListReducer = (state = { posts: [] }, action) => {
  switch (action.type) {
    case types.POST_LIST_REQUEST:
      return { loading: true, products: [] };
    case types.POST_LIST_SUCCESS:
      return {
        loading: false,
        posts: action.payload,
      };
    case types.POST_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const popularPostReducer = (state = { popularPosts: [] }, action) => {
  switch (action.type) {
    case types.POPULAR_POSTS_REQUEST:
      return { loading: true, popularPosts: [] };
    case types.POPULAR_POSTS_SUCCESS:
      return {
        loading: false,
        popularPosts: action.payload,
      };
    case types.POPULAR_POSTS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const postReducer = (state = { post: {} }, action) => {
  switch (action.type) {
    case types.POST_REQUEST:
      return { loading: true, post: {} };
    case types.POST_SUCCESS:
      return {
        loading: false,
        post: action.payload,
      };
    case types.POST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
export const commentListReducer = (state = { comments: [] }, action) => {
  switch (action.type) {
    case types.COMMENT_LIST_REQUEST:
      return { loading: true, comments: [] };
    case types.COMMENT_LIST_SUCCESS:
      return {
        loading: false,
        comments: action.payload,
      };
    case types.COMMENT_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
export const addCommentReducer = (state = {}, action) => {
  switch (action.type) {
    case types.ADD_COMMENT_REQUEST:
      return { loading: true };
    case types.ADD_COMMENT_SUCCESS:
      return {
        loading: false,
        success: true,
        comment: action.payload,
      };
    case types.ADD_COMMENT_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const postCatCountReducer = (state = { postCatCount: [] }, action) => {
  switch (action.type) {
    case types.POST_CAT_COUNT_REQUEST:
      return { loading: true, popularPosts: [] };
    case types.POST_CAT_COUNT_SUCCESS:
      return {
        loading: false,
        postCatCount: action.payload,
      };
    case types.POST_CAT_COUNT_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const postCatReducer = (state = { postCat: [] }, action) => {
  switch (action.type) {
    case types.POST_CAT_REQUEST:
      return { loading: true, popularPosts: [] };
    case types.POST_CAT_SUCCESS:
      return {
        loading: false,
        postCat: action.payload,
      };
    case types.POST_CAT_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

import * as api from "../api/index.js";
/**
 * It's a function that takes a form as an argument, and returns a function that takes a dispatch as an
 * argument, and returns a promise that dispatches an action with the data from the promise
 * @param form - the form data that is being sent to the API
 */
export const createPosts = (form) => async (dispatch) => {
  const { data } = await api.createPost(form);
  dispatch({ type: "CREATE", payload: data });
};
/**
 * It's a function that takes a form as an argument, and returns a function that takes a dispatch as an
 * argument, and returns a promise that dispatches an action with the data from the promise
 * @param form - the form data that is being sent to the API
 */
export const getPost = (form) => async (dispatch) => {
  const { data } = await api.getPost(form);
  dispatch({ type: "FETCH_ALL", payload: data });
};
/**
 * It's a function that takes an id as an argument and returns a function that takes a dispatch
 * function as an argument
 * @param id - The id of the post you want to get.
 */
export const getCurrentPosts = (id) => async (dispatch) => {
  try {
    const { data } = await api.getCurrentePost(id);
    dispatch({ type: "CURRENT", payload: data });
  } catch (error) {
    window.location.href = "/";
  }
};
/**
 * It takes a value and an id, and then it makes an API call to the comments endpoint, and then it
 * dispatches the data to the reducer
 * @param value - the comment text
 * @param id - The id of the post you want to comment on.
 * @returns The data from the api call.
 */
export const comment = (value, id) => async (dispatch) => {
  const { data } = await api.comments(value, id);
  dispatch({ type: "COMMENT", payload: data });
  return data;
};

/**
 * When the deletePost function is called, it will call the api.deletePost function, which will return
 * a promise, which will return an object with a data property, which will be passed to the dispatch
 * function, which will call the reducer with the DELETE action type and the data as the payload.
 * @param id - The id of the post to delete.
 */
export const deletePost = (id) => async (dispatch) => {
  const { data } = await api.deletePost(id);
  dispatch({ type: "DELETE", payload: data });
};

/**
 * This function is an async function that takes in a value and an id, and then dispatches an action
 * with the type UPDATE and the payload of the data returned from the api call.
 * @param value - the value of the input field
 * @param id - The id of the post you want to edit
 */
export const editPosts = (value, id) => async (dispatch) => {
  const { data } = await api.editPost(value, id);
  dispatch({ type: "UPDATE", payload: data });
};

/**
 * This function is an asynchronous function that takes in a value and an id, and returns the data from
 * the api call
 * @param value - the value of the score
 * @param id - the id of the user
 * @returns The data from the api call.
 */
export const userScores = (value, id) => async (dispatch) => {
  const { data } = await api.userscores(value, id);
  return data;
};

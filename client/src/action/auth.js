import * as api from "../api/index.js";
import { displayToast } from "../util/alert/alert.js";
/**
 * It's an async function that takes in a user object, and then dispatches the user object to the
 * reducer
 * @param user - The user object that contains the token.
 */
export const getMe = (user) => async (dispatch) => {
  try {
    const { data } = await api.getme(user);
    dispatch({ type: "USER", payload: data });
  } catch {
    localStorage.clear();
    window.location.href = "/";
  }
};

/**
 * It takes in a formData object, makes an API call to the backend, and dispatches an action to the
 * reducer
 * @param formData - This is the data that is sent to the server.
 */
export const signin = (formData) => async (dispatch) => {
  try {
    const { data } = await api.signin(formData);
    dispatch({ type: "AUTH", data });
    window.location.href = "/";
  } catch (error) {
    displayToast(`${error.response.data.message}`, "error", "red");
  }
};
/**
 * It takes in formData, makes an API call to the backend, and dispatches the data to the reducer
 * @param formData - This is the data that is passed to the API.
 */
export const signUp = (formData) => async (dispatch) => {
  try {
    const { data } = await api.signup(formData);
    dispatch({ type: "AUTH", data });
    window.location.href = "/";
  } catch (error) {
    displayToast(`${error.response.data.message}`, "error", "red");
  }
};
/**
 * This function takes in a formData object, and then dispatches an action with the data returned from
 * the API call.
 * @param formData - {
 */
export const changePassword = (formData) => async (dispatch) => {
  const { data } = await api.changePassword(formData);
  dispatch({ type: "CHANGE", data });
};

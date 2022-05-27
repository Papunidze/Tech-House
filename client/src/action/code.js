import * as api from "../api/index.js";

/**
 * This function will dispatch a START_LOADING action, then make an API call, then dispatch a SAVECODE
 * action, then dispatch an END_LOADING action.
 * @param formdata - This is the form data that is being sent to the API.
 */
export const createCodes = (formdata) => async (dispatch) => {
  dispatch({ type: "START_LOADING" });
  const { data } = await api.createCode(formdata);
  dispatch({ type: "SAVECODE", data });
  dispatch({ type: "END_LOADING" });
};

/**
 * It takes in an id, and then it makes an api call to the backend to get the current code, and then it
 * dispatches the data to the reducer
 * @param id - the id of the code you want to get
 */
export const currentCode = (id) => async (dispatch) => {
  try {
    dispatch({ type: "START_LOADING" });
    const { data } = await api.currentCodes(id);
    dispatch({ type: "CURRENTCODE", payload: data });
    dispatch({ type: "END_LOADING" });
  } catch (error) {
    window.location.href = "/";
  }
};
/**
 * It takes in a value and an id, and then it makes an API call to the backend, and then it dispatches
 * an action to the reducer
 * @param value - the value of the code
 * @param id - the id of the code you want to edit
 */
export const editCode = (value, id) => async (dispatch) => {
  const { data } = await api.editCodes(value, id);
  dispatch({ type: "UPDATECODE", payload: data });
};

/**
 * It takes in a formdata object, and then dispatches a start loading action, then it makes an api call
 * to the backend, and then it dispatches an action with the data from the api call, and then it
 * dispatches an end loading action
 * @param formdata - This is the data that is sent to the server.
 */
export const myCode = (formdata) => async (dispatch) => {
  dispatch({ type: "START_LOADING" });
  const { data } = await api.myCodes(formdata);
  dispatch({ type: "MYCODE", payload: data });
  dispatch({ type: "END_LOADING" });
};
/**
 * It takes an id as an argument, and then it calls the deleteCode function from the api file, which is
 * an axios request to the backend. Then it dispatches an action to the reducer, which is a function
 * that takes in the current state and an action, and returns a new state
 * @param id - the id of the code you want to delete
 */
export const deleteCodes = (id) => async (dispatch) => {
  const { data } = await api.deleteCode(id);
  dispatch({ type: "DELETECODE", payload: data });
};

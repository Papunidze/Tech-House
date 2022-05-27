import * as api from "../api/index.js";
export const createQuests = (form) => async (dispatch) => {
  const { data } = await api.createquest(form);
  dispatch({ type: "QUESTCREATE", payload: data });
};
/**
 * It's a function that takes a form as an argument, and returns a function that takes a dispatch as an
 * argument, and returns a promise that dispatches an action with a payload of data
 * @param form - {
 */
export const getQuest = (form) => async (dispatch) => {
  const { data } = await api.getquest(form);
  dispatch({ type: "QUESTFETCH_ALL", payload: data });
};
/**
 * It's a function that takes in an id and returns a function that takes in a dispatch function and
 * returns a function that takes in an id and returns a function that takes in a dispatch function and
 * returns a function that takes in
 * @param id - the id of the user
 */
export const getCurrentQuests = (id) => async (dispatch) => {
  try {
    const { data } = await api.getCurrentequest(id);
    dispatch({ type: "QUESTCURRENT", payload: data });
  } catch (error) {
    window.location.href = "/quest";
  }
};
/**
 * This function is used to post a comment to a quest
 * @param value - the comment text
 * @param id - the id of the quest
 * @returns The data is being returned.
 */
export const comment = (value, id) => async (dispatch) => {
  const { data } = await api.commentsQuest(value, id);
  dispatch({ type: "QUESTCOMMENT", payload: data });
  return data;
};

/**
 * It takes an id as an argument, and then it calls the deletequest function from the api file, which
 * is an axios request to the backend. The response from the backend is then dispatched to the reducer
 * @param id - The id of the quest you want to delete.
 */
export const deleteQuest = (id) => async (dispatch) => {
  const { data } = await api.deletequest(id);
  dispatch({ type: "QUESTDELETE", payload: data });
};

/**
 * This function is called when the user clicks the "Edit" button on the quest page. It takes the
 * user's input and the quest's id as parameters, and then sends a request to the server to update the
 * quest
 * @param value - the value of the input field
 * @param id - the id of the quest you want to edit
 */
export const editQuests = (value, id) => async (dispatch) => {
  const { data } = await api.editquest(value, id);
  dispatch({ type: "QUESTUPDATE", payload: data });
};

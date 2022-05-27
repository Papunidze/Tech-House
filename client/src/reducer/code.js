/**
 * It returns the state of the code reducer
 * @param [state] - This is the current state of the store.
 * @param action - The action object that was dispatched.
 * @returns The code reducer is returning the state of the code.
 */
import { displayToast } from "../util/alert/alert";

const code = (state = { isLoading: true, codearr: [] }, action) => {
  switch (action.type) {
    case "START_LOADING": {
      return { ...state, isLoading: true };
    }
    case "END_LOADING": {
      return { ...state, isLoading: false };
    }
    case "SAVECODE": {
      return action?.data;
    }
    case "CURRENTCODE": {
      return { ...state, code: action.payload };
    }
    case "UPDATECODE":
      displayToast(`Successfully saved`, "success", "green");
      return action.payload;
    case "MYCODE":
      return { ...state, codearr: action.payload };
    case "DELETECODE":
      displayToast(`${action.payload.message}`, "success", "green");
      return {
        ...state,
        codearr: state.codearr.filter(
          (element) => element._id !== action.payload.codeId
        ),
      };
    default:
      return state;
  }
};

export default code;

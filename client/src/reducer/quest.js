import { displayToast } from "../util/alert/alert";

const questReducer = (state = { isLoading: true, quest: [] }, action) => {
  switch (action.type) {
    case "START_LOADING": {
      return { ...state, isLoading: true };
    }
    case "END_LOADING": {
      return { ...state, isLoading: false };
    }
    case "QUESTFETCH_ALL":
      return action.payload;
    case "QUESTCREATE":
      return insert(state, 0, action.payload);
    case "QUESTUPDATE":
      return state.map((quest) =>
        quest._id === action.payload._id ? action.payload : quest
      );
    case "QUESTDELETE":
      displayToast(`${action.payload.message}`, "success", "green");
      return state.filter((quest) => quest._id !== action.payload.questID);
    case "QUESTCOMMENT":
      // eslint-disable-next-line array-callback-return
      state.filter((quest) => {
        if (quest._id === action.payload._id) {
          quest.questComment = action.payload.questComment;
        }
      });
      return state;
    default:
      return state;
  }
};
export default questReducer;
const insert = (arr, index, newItem) => [
  ...arr.slice(0, index),
  newItem,
  ...arr.slice(index),
];

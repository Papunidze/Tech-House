import { displayToast } from "../util/alert/alert";

const UserReducer = (state = { users: null }, action) => {
  switch (action.type) {
    case "AUTH": {
      localStorage.setItem(
        "profile",
        JSON.stringify({
          _id: action?.data.result._id,
          costumeId: action.data.result.costumeId,
          token: action?.data.token,
        })
      );
      return { ...state, users: action?.data };
    }
    case "LOGOUT": {
      localStorage.clear();
      window.location.href = "/authorization";
      return { ...state, users: null };
    }
    case "USER": {
      return action.payload;
    }
    case "CHANGE": {
      displayToast(`${action.data}`, "success", "green");
      return state;
    }
    default:
      return state;
  }
};

export default UserReducer;

/* Combining all the reducers into one reducer. */
import { combineReducers } from "redux";

import UserReducer from "./user";
import postsReducer from "./post";
import currentPost from "./CurrentPost";
import code from "./code";
import questReducer from "./quest";
export const reducers = combineReducers({
  UserReducer,
  postsReducer,
  currentPost,
  code,
  questReducer,
});

import { displayToast } from "../util/alert/alert";
const postsReducer = (posts = [], action) => {
  switch (action.type) {
    case "FETCH_ALL":
      return action.payload;
    case "CREATE":
      return insert(posts, 0, action.payload);
    case "UPDATE":
      return posts.map((post) =>
        post._id === action.payload._id ? action.payload : post
      );
    case "DELETE":
      displayToast(`${action.payload.message}`, "success", "green");
      return posts.filter((post) => post._id !== action.payload.postId);
    default:
      return posts;
  }
};
export default postsReducer;
/**
 * It takes an array, an index, and a new item, and returns a new array with the new item inserted at
 * the given index
 * @param arr - the array to insert into
 * @param index - the index where you want to insert the new item
 * @param newItem - The item to be inserted into the array.
 */
const insert = (arr, index, newItem) => [
  ...arr.slice(0, index),
  newItem,
  ...arr.slice(index),
];

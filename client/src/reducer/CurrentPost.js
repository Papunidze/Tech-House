/**
 * It takes in an array of posts and an action, and returns the current post
 * @param [posts] - the current state of the posts
 * @param action - This is the action that is being dispatched.
 * @returns The current post
 */
const currentPost = (posts = [], action) => {
  switch (action.type) {
    case "CURRENT":
      return action.payload;
    case "COMMENT":
      return action.payload;
    default:
      return posts;
  }
};
export default currentPost;

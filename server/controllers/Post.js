/**
 * It takes the id of the post and the id of the user who commented on the post and the score of the
 * comment and updates the user's xp
 * @param req - The request object. This contains information about the HTTP request that raised the
 * event.
 * @param res - The response object.
 */
import Post from "../module/postScheme.js";
import mongoose from "mongoose";
import User from "../module/userScheme.js";

export const createPost = async (req, res) => {
  const post = req.body;
  const newPost = new Post({
    ...post,
    crId: req.userId,
  });
  try {
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const getPost = async (req, res) => {
  try {
    const Posts = await Post.find();
    res.status(200).json(Posts.reverse());
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getCurrentePost = async (req, res) => {
  const { id } = req.params;
  try {
    const CurrentPost = await Post.findById(id);
    res.status(200).json(CurrentPost);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const comment = async (req, res) => {
  try {
    const { id } = req.params;
    const { value } = req.body;
    const post = await Post.findById(id);
    post.postComment.push(value);
    const updatePost = await Post.findByIdAndUpdate(id, post, { new: true });
    res.json(updatePost);
  } catch (err) {}
};

export const deletePost = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);
  await Post.findByIdAndDelete(id);
  res.json({ message: "Post deleted successfully.", postId: id });
};
export const editPost = async (req, res) => {
  const { id } = req.params;
  const post = req.body;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);
  const editPost = await Post.findByIdAndUpdate(id, post, { new: true });
  res.json(editPost);
};

export const userscores = async (req, res) => {
  const { id } = req.params;
  const { _id, score } = req.body;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);
  const posts = await Post.findById(id);
  let getscore = 0;
  posts.postComment.map((element) => {
    if (element.authorId === _id && element.score === 0) {
      getscore = score * posts.Score;
      element.score = score;
    } else if (element.score === score) {
      getscore = 0;
    } else if (element.score !== 0) {
      getscore = (element.score + (score - element.score)) * posts.Score;
      getscore -= element.score * posts.Score;
      element.score = score;
    } else {
      res.status(404).json({ message: "Comment Not Found" });
    }
  });
  await Post.findByIdAndUpdate(id, posts, { new: true });
  const user = await User.findById({ _id });
  let updateXp = user.xp + getscore;
  User.findByIdAndUpdate({ _id }, { $set: { xp: updateXp } }, { new: true })
    .then((st) => {
      res.status(200).send(st);
    })
    .catch((err) => {
      res.status(404).send(err);
    });
};

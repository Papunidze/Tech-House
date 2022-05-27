/* This is the routes file for the post. */
import express from "express";
import {
  comment,
  createPost,
  deletePost,
  editPost,
  getCurrentePost,
  getPost,
  userscores,
} from "../controllers/Post.js";
import protect from "../middleware/auth.js";

const routes = express.Router();

routes.post("/", protect, createPost);
routes.get("/", getPost);
routes.get("/:id", getCurrentePost);
routes.post("/:id/comment", protect, comment);
routes.delete("/:id", protect, deletePost);
routes.patch("/:id", protect, editPost);
routes.patch("/score/:id", protect, userscores);
export default routes;

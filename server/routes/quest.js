/* This is importing the express library and the quest controller. */
import express from "express";
import {
  comment,
  createQuest,
  deleteQuest,
  editQuest,
  getCurrentQuest,
  getQuest,
} from "../controllers/quest.js";
import protect from "../middleware/auth.js";

const routes = express.Router();

routes.post("/", protect, createQuest);
routes.get("/", getQuest);
routes.get("/:id", getCurrentQuest);
routes.post("/:id/comment", protect, comment);
routes.delete("/:id", protect, deleteQuest);
routes.patch("/:id", protect, editQuest);
export default routes;

/* Importing the express module and the other modules. */
import express from "express";
import { changePassword, getMe, sigin, signup } from "../controllers/User.js";
import protect from "../middleware/auth.js";

const routes = express.Router();

routes.post("/signin", sigin);
routes.post("/signup", signup);
routes.post("/me", protect, getMe);
routes.patch("/change", protect, changePassword);

export default routes;

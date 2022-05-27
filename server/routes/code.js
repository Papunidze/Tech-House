/* This is the code for the routes.js file. It is importing the express module and the code controller.
It is then creating the routes for the API. */
import express from "express";
import {
  createCode,
  currentCode,
  deleteCode,
  editCode,
  myCode,
} from "../controllers/Code.js";

const routes = express.Router();

routes.post("/savecode", createCode);
routes.post("/mycode", myCode);
routes.get("/current/:id", currentCode);
routes.patch("/:id", editCode);
routes.post("/codedelete", deleteCode);
export default routes;

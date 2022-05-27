/* Creating a schema for the database. */
import mongoose from "mongoose";

const codeScheme = mongoose.Schema({
  title: { type: String },
  html: { type: String, default: "" },
  css: { type: String, default: "" },
  javascript: { type: String, default: "" },
  createdAt: {
    type: Date,
    default: new Date(),
  },
  creatorId: { type: String },
});

let Code = mongoose.model("Code", codeScheme);
export default Code;

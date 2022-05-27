import mongoose from "mongoose";

const questScheme = mongoose.Schema({
  message: { type: String },
  creatorId: { type: String },
  questComment: [
    {
      author: String,
      comment: String,
    },
  ],
  File: {
    type: String,
    default: "",
  },
  creator: { type: String },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

let Quest = mongoose.model("Quest", questScheme);
export default Quest;

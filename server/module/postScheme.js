import mongoose from "mongoose";

const postScheme = mongoose.Schema({
  Title: { type: String },
  Message: { type: String },
  Score: { type: Number },
  creatorId: { type: String },
  postComment: [
    {
      authorId: String,
      author: String,
      comment: String,
      score: Number,
    },
  ],
  File: {
    type: String,
    default:
      "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png",
  },
  Creator: { type: String },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

let Post = mongoose.model("Post", postScheme);
export default Post;

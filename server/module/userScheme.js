import mongoose from "mongoose";

const userScheme = mongoose.Schema({
  name: { type: String },
  lastname: { type: String },
  email: { type: String },
  password: { type: String },
  xp: { type: Number },
  id: { type: String },
  costumeId: { type: String },
});

let User = mongoose.model("User", userScheme);
export default User;

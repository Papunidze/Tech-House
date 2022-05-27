/**
 * It takes a user's id and password, and updates the password in the database
 * @param req - The request object represents the HTTP request and has properties for the request query
 * string, parameters, body, HTTP headers, and so on.
 * @param res - The response object.
 * @returns The user is being returned.
 */
import jwt from "jsonwebtoken";
import User from "../module/userScheme.js";
import generateID from "../util/randomid.js";

export const sigin = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email, password });
  if (!user) {
    return res.status(404).json({ message: "email  or password incorect" });
  }
  const token = jwt.sign({ email: user, id: user._id }, "test", {
    expiresIn: "1h",
  });
  res.send({ result: user, token });
};

export const signup = async (req, res) => {
  const { name, lastname, email, password } = req.body;
  const findUserEmail = await User.findOne({ email });
  if (findUserEmail)
    return res.status(404).json({ message: "email is alredy used " });
  const newUser = await User.create({
    name,
    lastname,
    email,
    password,
    xp: 0,
    costumeId: generateID(),
  });
  const token = jwt.sign({ email: newUser, id: newUser._id }, "test", {
    expiresIn: "1h",
  });
  newUser.save().then((userDoc) => {
    res.send({ result: userDoc, token });
  });
};

export const getMe = async (req, res) => {
  try {
    const { _id, costumeId } = req.body;
    const user_Id = await User.findOne({ _id });
    const user_costumeId = await User.findOne({ costumeId });
    if (user_Id && user_costumeId) {
      res.send({ result: user_Id });
    }
  } catch (err) {
    res.status(404).send(err);
  }
};

export const changePassword = async (req, res) => {
  const { _id, password } = req.body;
  User.findByIdAndUpdate(
    { _id },
    { $set: { password: password } },
    { new: true }
  )
    .then(() => {
      res.send("Password success changed");
    })
    .catch((err) => {
      res.status(404).send(err);
    });
};

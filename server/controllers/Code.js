/**
 * It creates a new code, returns the new code, and returns all the codes created by the user
 * @param req - The request object represents the HTTP request and has properties for the request query
 * string, parameters, body, HTTP headers, and so on.
 * @param res - The response object.
 */
import Code from "../module/codeScheme.js";
import mongoose from "mongoose";
export const createCode = async (req, res) => {
  const codeBody = req.body;
  const newCode = await Code.create({ ...codeBody });
  res.status(201).json(newCode);
};

export const myCode = async (req, res) => {
  const { creatorId } = req.body;
  const mycod = await Code.find({ creatorId });
  res.send(mycod);
};

export const currentCode = async (req, res) => {
  const { id } = req.params;
  try {
    const code = await Code.findById(id);
    res.status(200).json(code);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
export const editCode = async (req, res) => {
  const { id } = req.params;
  const code = req.body;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No code with id: ${id}`);
  const editCodes = await Code.findByIdAndUpdate(id, code, { new: true });
  res.json(editCodes);
};
export const deleteCode = async (req, res) => {
  const { _id } = req.body;
  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send(`No post with id: ${_id}`);
  await Code.findByIdAndDelete(_id);
  res.json({ message: "Post deleted successfully.", codeId: _id });
};

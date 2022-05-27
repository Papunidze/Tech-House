/**
 * It creates a new quest, gets all quests, gets a specific quest, adds a comment to a quest, deletes a
 * quest, and edits a quest
 * @param req - The request object. This contains information about the HTTP request that raised the
 * event.
 * @param res - The response object.
 */
import Quest from "../module/questScheme.js";
import mongoose from "mongoose";

export const createQuest = async (req, res) => {
  const quest = req.body;
  const newQuest = new Quest({
    ...quest,
  });
  try {
    await newQuest.save();
    res.status(201).json(newQuest);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const getQuest = async (req, res) => {
  try {
    const quest = await Quest.find();
    res.status(200).json(quest.reverse());
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getCurrentQuest = async (req, res) => {
  const { id } = req.params;
  try {
    const currentQuest = await Quest.findById(id);
    res.status(200).json(currentQuest);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const comment = async (req, res) => {
  try {
    const { id } = req.params;
    const { value } = req.body;
    const quest = await Quest.findById(id);
    quest.questComment.push(value);
    const UpdateQuest = await Quest.findByIdAndUpdate(id, quest, { new: true });
    res.json(UpdateQuest);
  } catch (err) {}
};

export const deleteQuest = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No Quest with id: ${id}`);
  await Quest.findByIdAndDelete(id);
  res.json({ message: "Quest deleted successfully.", questID: id });
};

export const editQuest = async (req, res) => {
  const { id } = req.params;
  const quests = req.body;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No Quest with id: ${id}`);
  const editQuest = await Quest.findByIdAndUpdate(id, quests, { new: true });
  res.json(editQuest);
};

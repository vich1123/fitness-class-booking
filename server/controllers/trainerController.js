import Trainer from "../models/Trainer.js";
import mongoose from "mongoose";

// Get all trainers
export const getAllTrainers = async (req, res) => {
  try {
    const trainers = await Trainer.find();
    res.status(200).json(trainers);
  } catch (error) {
    console.error("Error fetching trainers:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get trainer by ID
export const getTrainerById = async (req, res) => {
  try {
    const trainer = await Trainer.findById(req.params.id);
    if (!trainer) return res.status(404).json({ message: "Trainer not found" });
    res.status(200).json(trainer);
  } catch (error) {
    console.error("Error fetching trainer by ID:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Add new trainer
export const addTrainer = async (req, res) => {
  try {
    const newTrainer = new Trainer(req.body);
    await newTrainer.save();
    res.status(201).json(newTrainer);
  } catch (error) {
    console.error("Error adding trainer:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Update trainer
export const updateTrainer = async (req, res) => {
  try {
    const trainer = await Trainer.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!trainer) return res.status(404).json({ message: "Trainer not found" });
    res.status(200).json(trainer);
  } catch (error) {
    console.error("Error updating trainer:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Delete trainer
export const deleteTrainer = async (req, res) => {
  try {
    const trainer = await Trainer.findByIdAndDelete(req.params.id);
    if (!trainer) return res.status(404).json({ message: "Trainer not found" });
    res.status(200).json({ message: "Trainer deleted successfully" });
  } catch (error) {
    console.error("Error deleting trainer:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Submit feedback
export const submitFeedback = async (req, res) => {
  try {
    const { user, rating, comment } = req.body;

    if (!mongoose.Types.ObjectId.isValid(user)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    const trainer = await Trainer.findById(req.params.id);
    if (!trainer) {
      return res.status(404).json({ message: "Trainer not found" });
    }

    // Ensure feedback array exists
    trainer.feedback = trainer.feedback || [];

    trainer.feedback.push({ user, rating, comment });
    await trainer.save();

    res.status(201).json({ message: "Feedback submitted successfully", trainer });
  } catch (error) {
    console.error("Error submitting feedback:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

import Trainer from "../models/Trainer.js";

// Get all trainers
export const getAllTrainers = async (req, res) => {
  try {
    const trainers = await Trainer.find();
    res.status(200).json(trainers);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Get trainer by ID
export const getTrainerById = async (req, res) => {
  try {
    const trainer = await Trainer.findById(req.params.id);
    if (!trainer) return res.status(404).json({ message: "Trainer not found" });
    res.status(200).json(trainer);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Add new trainer
export const addTrainer = async (req, res) => {
  try {
    const newTrainer = new Trainer(req.body);
    await newTrainer.save();
    res.status(201).json(newTrainer);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Update trainer
export const updateTrainer = async (req, res) => {
  try {
    const trainer = await Trainer.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(trainer);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Delete trainer
export const deleteTrainer = async (req, res) => {
  try {
    await Trainer.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Trainer deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
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

    trainer.feedback.push({ user, rating, comment });
    await trainer.save();

    res.status(201).json({ message: "Feedback submitted successfully", trainer });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

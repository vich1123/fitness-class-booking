import Trainer from '../models/Trainer.js';

// Get all trainers
export const getAllTrainers = async (req, res) => {
  try {
    const trainers = await Trainer.find().populate('feedback.user', 'name');
    res.status(200).json(trainers);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch trainers', error: error.message });
  }
};

// Get trainer by ID
export const getTrainerById = async (req, res) => {
  try {
    const trainer = await Trainer.findById(req.params.id).populate('feedback.user', 'name');
    if (!trainer) {
      return res.status(404).json({ message: 'Trainer not found' });
    }
    res.status(200).json(trainer);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch trainer', error: error.message });
  }
};

// Create a new trainer
export const createTrainer = async (req, res) => {
  try {
    const newTrainer = await Trainer.create(req.body);
    res.status(201).json(newTrainer);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create trainer', error: error.message });
  }
};

// Update trainer
export const updateTrainer = async (req, res) => {
  try {
    const updatedTrainer = await Trainer.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedTrainer) return res.status(404).json({ message: 'Trainer not found' });

    res.status(200).json(updatedTrainer);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update trainer', error: error.message });
  }
};

// Delete trainer
export const deleteTrainer = async (req, res) => {
  try {
    const deletedTrainer = await Trainer.findByIdAndDelete(req.params.id);
    if (!deletedTrainer) return res.status(404).json({ message: 'Trainer not found' });

    res.status(200).json({ message: 'Trainer deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete trainer', error: error.message });
  }
};

// Add feedback
export const addTrainerFeedback = async (req, res) => {
  try {
    const { trainerId } = req.params;
    const { user, rating, comment } = req.body;

    if (!user || !rating) {
      return res.status(400).json({ message: 'User and rating are required' });
    }

    const trainer = await Trainer.findById(trainerId);
    if (!trainer) {
      return res.status(404).json({ message: 'Trainer not found' });
    }

    trainer.feedback.push({ user, rating, comment });

    const totalRatings = trainer.feedback.reduce((sum, f) => sum + f.rating, 0);
    trainer.averageRating = totalRatings / trainer.feedback.length;

    await trainer.save();
    res.status(200).json({ message: 'Feedback added successfully', trainer });
  } catch (error) {
    res.status(500).json({ message: 'Error adding feedback', error: error.message });
  }
};

// Get feedback
export const getTrainerFeedback = async (req, res) => {
  try {
    const trainer = await Trainer.findById(req.params.trainerId).populate('feedback.user', 'name');
    if (!trainer) {
      return res.status(404).json({ message: 'Trainer not found' });
    }
    res.status(200).json({ feedback: trainer.feedback });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching feedback', error: error.message });
  }
};

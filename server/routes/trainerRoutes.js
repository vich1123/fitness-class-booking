const express = require('express');
const router = express.Router();
const Trainer = require('../models/Trainer'); // Import the Trainer model

// Get all trainers
router.get('/', async (req, res) => {
  try {
    const trainers = await Trainer.find(); // Fetch all trainers from the database
    res.status(200).json(trainers);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch trainers', error: error.message });
  }
});

// Add a new trainer
router.post('/', async (req, res) => {
  const { name, specialization, experience } = req.body;

  try {
    const newTrainer = new Trainer({
      name,
      specialization,
      experience,
    });

    const savedTrainer = await newTrainer.save(); // Save the new trainer to the database
    res.status(201).json(savedTrainer);
  } catch (error) {
    res.status(500).json({ message: 'Failed to add trainer', error: error.message });
  }
});

module.exports = router;

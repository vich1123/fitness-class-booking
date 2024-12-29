const express = require('express');
const router = express.Router();
const Class = require('../models/Class');
const Trainer = require('../models/Trainer'); // Ensure trainer exists

// Get all classes
router.get('/', async (req, res) => {
  try {
    const classes = await Class.find().populate('trainer'); // Populate trainer details
    res.status(200).json(classes);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch classes', error: error.message });
  }
});

// Add a new class
router.post('/', async (req, res) => {
  const { name, trainerId, schedule, capacity } = req.body;

  try {
    const trainer = await Trainer.findById(trainerId);
    if (!trainer) {
      return res.status(404).json({ message: 'Trainer not found' });
    }

    const newClass = new Class({
      name,
      trainer: trainerId,
      schedule,
      capacity,
    });

    const savedClass = await newClass.save();
    res.status(201).json(savedClass);
  } catch (error) {
    res.status(500).json({ message: 'Failed to add class', error: error.message });
  }
});

module.exports = router;

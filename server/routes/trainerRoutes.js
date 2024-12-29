const express = require('express');
const router = express.Router();

// Get all trainers
router.get('/', (req, res) => {
  // Add logic to fetch all trainers
  res.json({ message: 'List of all trainers' });
});

// Add a new trainer
router.post('/', (req, res) => {
  const { name, specialization } = req.body;
  // Add logic to create a new trainer
  res.json({ message: `Trainer added with name: ${name}` });
});

module.exports = router;

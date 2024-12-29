const express = require('express');
const router = express.Router();

// Get all classes
router.get('/', (req, res) => {
  // Add logic to fetch all classes
  res.json({ message: 'List of all classes' });
});

// Add a new class
router.post('/', (req, res) => {
  const { name, trainer, schedule } = req.body;
  // Add logic to create a new class
  res.json({ message: `Class added with name: ${name}` });
});

module.exports = router;

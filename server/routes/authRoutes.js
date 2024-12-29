const express = require('express');
const router = express.Router();

// Login route
router.post('/login', (req, res) => {
  const { email, password } = req.body;
  // Add authentication logic here
  res.json({ message: `User logged in with email: ${email}` });
});

// Registration route
router.post('/register', (req, res) => {
  const { name, email, password } = req.body;
  // Add registration logic here
  res.json({ message: `User registered with email: ${email}` });
});

module.exports = router;

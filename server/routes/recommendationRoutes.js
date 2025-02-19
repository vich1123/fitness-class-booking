const express = require('express');
const { getRecommendations } = require('../controllers/recommendationController');
const router = express.Router();

// Route to get recommendations for a user
router.get('/:userId', getRecommendations);

module.exports = router;

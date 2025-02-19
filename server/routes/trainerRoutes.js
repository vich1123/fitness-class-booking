import express from 'express';
import {
  getAllTrainers,
  getTrainerById,
  createTrainer,
  updateTrainer,
  deleteTrainer,
  addTrainerFeedback,
  getTrainerFeedback
} from '../controllers/trainerController.js';

const router = express.Router();

router.get('/', getAllTrainers);
router.get('/:id', getTrainerById);
router.post('/', createTrainer);
router.put('/:id', updateTrainer);
router.delete('/:id', deleteTrainer);

// Feedback routes
router.post('/:trainerId/feedback', addTrainerFeedback);
router.get('/:trainerId/feedback', getTrainerFeedback);

export default router;

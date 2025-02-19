import express from 'express';
import {
  getAllClasses,
  getClassById,
  createClass,
  updateClass,
  deleteClass,
  getRecommendedClasses,
} from '../controllers/classController.js';

const router = express.Router();

router.get('/', getAllClasses);
router.get('/:id', getClassById);
router.post('/', createClass);
router.put('/:id', updateClass);
router.delete('/:id', deleteClass);
router.post('/recommendations', getRecommendedClasses);

export default router;

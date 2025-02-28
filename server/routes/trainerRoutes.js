import express from "express";
import {
  getAllTrainers,
  getTrainerById,
  submitFeedback, 
  addTrainer,
  updateTrainer,
  deleteTrainer,
} from "../controllers/trainerController.js";

const router = express.Router();

router.get("/", getAllTrainers);
router.get("/:id", getTrainerById);
router.post("/", addTrainer);
router.put("/:id", updateTrainer);
router.delete("/:id", deleteTrainer);
router.post("/:id/feedback", submitFeedback);

export default router;

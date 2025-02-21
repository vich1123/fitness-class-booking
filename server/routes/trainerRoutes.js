import express from "express";
import {
  getAllTrainers,
  getTrainerById,
  addTrainer,
  updateTrainer,
  deleteTrainer,
  submitFeedback, // Ensure this is imported
} from "../controllers/trainerController.js";

const router = express.Router();

router.get("/", getAllTrainers);
router.get("/:id", getTrainerById);
router.post("/", addTrainer);
router.put("/:id", updateTrainer);
router.delete("/:id", deleteTrainer);
router.post("/:id/feedback", submitFeedback); // Ensure this is correctly added

export default router;

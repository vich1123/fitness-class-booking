import express from "express";
import {
  getAllTrainers,
  getTrainerById,
  submitFeedback, 
} from "../controllers/trainerController.js";

const router = express.Router();

router.get("/", getAllTrainers);
router.get("/:id", getTrainerById);
router.post("/:id/feedback", submitFeedback);

export default router;

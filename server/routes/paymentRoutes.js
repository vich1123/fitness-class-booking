import express from "express";
import { processPayment, confirmPayment } from "../controllers/paymentController.js";

const router = express.Router();

router.post("/process", processPayment);
router.post("/confirm/:paymentId", confirmPayment);

export default router;

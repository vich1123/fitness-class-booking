import express from "express";
import { processPayment, getPaymentHistory } from "../controllers/paymentController.js";

const router = express.Router();

// Route for processing payment
router.post("/process", processPayment);

// Route for fetching payment history
router.get("/history/:userId", getPaymentHistory);

export default router;

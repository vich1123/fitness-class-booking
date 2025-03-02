import express from "express";
import { processPayment, getPaymentHistory } from "../controllers/paymentController.js";

const router = express.Router();

router.post("/process", processPayment);
router.get("/history/:userId", getPaymentHistory);

export default router;

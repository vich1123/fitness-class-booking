import express from "express";
import { registerUser, loginUser } from "../controllers/authController.js";

const router = express.Router();

// Route for User Registration
router.post("/register", registerUser);

// Route for User Login
router.post("/login", loginUser);

export default router;

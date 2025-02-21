import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import trainerRoutes from "./routes/trainerRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import notificationsRoutes from "./routes/notificationsRoutes.js";
import classRoutes from "./routes/classRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";

dotenv.config();

// Initialize Express app
const app = express();

// CORS Middleware to Explicitly Allow Netlify
app.use(
  cors({
    origin: ["https://fitnessbookingonline.netlify.app"], // Allow only this frontend
    credentials: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log(" Connected to MongoDB"))
  .catch((error) => {
    console.error(" MongoDB connection error:", error);
    process.exit(1);
  });

// API Routes
app.use("/api/trainers", trainerRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/notifications", notificationsRoutes);
app.use("/api/classes", classRoutes);
app.use("/api/payments", paymentRoutes); // Added payment route

// Root Endpoint
app.get("/", (req, res) => {
  res.send("Fitness Class Booking API is running...");
});

// Start Server
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

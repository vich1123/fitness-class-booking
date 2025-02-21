import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

//  Load .env file before using environment variables
dotenv.config();

// Debugging log to check if .env is loading correctly
console.log("🔍 MONGO_URI:", process.env.MONGO_URI);
console.log("🔍 PORT:", process.env.PORT);

// Initialize Express app
const app = express();

// Ensure MONGO_URI is present
if (!process.env.MONGO_URI) {
  console.error(" ERROR: MONGO_URI is undefined. Check your .env file.");
  process.exit(1);
}

// CORS Configuration
app.use(cors({
  origin: "https://fitnessbookingonline.netlify.app",
  credentials: true,
  methods: "GET, POST, PUT, PATCH, DELETE, OPTIONS",
  allowedHeaders: ["Content-Type", "Authorization"],
}));

// Middleware to parse JSON
app.use(express.json());

// Connect to MongoDB with proper error handling
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => {
    console.error("MongoDB Connection Error:", error.message);
    process.exit(1);
  });

// API Routes
import trainerRoutes from "./routes/trainerRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import notificationsRoutes from "./routes/notificationsRoutes.js";
import classRoutes from "./routes/classRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";

app.use("/api/trainers", trainerRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/notifications", notificationsRoutes);
app.use("/api/classes", classRoutes);
app.use("/api/payments", paymentRoutes);

// Root API Endpoint
app.get("/", (req, res) => {
  res.send(" Fitness Class Booking API is running...");
});

// Start Server
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

// Load environment variables
dotenv.config();

// Debug logs to verify `.env` variables
console.log(" MONGO_URI:", process.env.MONGO_URI || "Not Defined");
console.log(" FRONTEND_URL:", process.env.FRONTEND_URL || "Not Defined");

const app = express();

// CORS Policy to Allow Netlify & Localhost for Development
const allowedOrigins = [
  "https://fitnessbookingonline.netlify.app", // Production Frontend
  "http://localhost:3000", // Local Development
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("CORS Policy Blocked Request"));
      }
    },
    credentials: true,
    methods: "GET, POST, PUT, PATCH, DELETE, OPTIONS",
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.options("*", cors()); // Enable CORS Preflight Requests

//  Middleware
app.use(express.json());

//  MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log(" Connected to MongoDB"))
  .catch((error) => {
    console.error(" MongoDB Connection Error:", error.message);
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

// Define Routes
app.use("/api/trainers", trainerRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/notifications", notificationsRoutes);
app.use("/api/classes", classRoutes);
app.use("/api/payments", paymentRoutes);

// Root API Endpoint
app.get("/", (req, res) => {
  res.send("Fitness Class Booking API is Running...");
});

// Start Server
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

// Load environment variables
dotenv.config();

// Debug logs to verify `.env` variables
console.log("MONGO_URI:", process.env.MONGO_URI);
console.log("FRONTEND_URL:", process.env.FRONTEND_URL);

const app = express();

// Fix CORS Policy
const allowedOrigins = [
    "https://fitnessbookingonline.netlify.app",
    "http://localhost:3000"
];

app.use(cors({
    origin: allowedOrigins,
    credentials: true,
    methods: "GET, POST, PUT, PATCH, DELETE, OPTIONS",
    allowedHeaders: ["Content-Type", "Authorization"],
}));

app.options("*", cors());

// Middleware
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
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
  res.send("Fitness Class Booking API is running...");
});

// Start Server
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

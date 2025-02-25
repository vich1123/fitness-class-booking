import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

// Load environment variables
dotenv.config();

// Debug logs to verify `.env` variables
console.log("MONGO_URI:", process.env.MONGO_URI ? "Loaded" : "Not Found");
console.log("FRONTEND_URL:", process.env.FRONTEND_URL ? "Loaded" : "Not Found");

const app = express();

// Allow All Origins or Specific Allowed Origins
const allowedOrigins = [
    process.env.FRONTEND_URL || "https://fitnessbookingonline.netlify.app",
    "http://localhost:3000"
];

app.use(cors({
    origin: allowedOrigins, 
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
}));

// Ensure preflight requests are handled properly
app.options("*", cors()); 

// Middleware
app.use(express.json());

// Ensure CORS headers are added to all responses
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*"); // Allow requests from any origin
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
});

// MongoDB Connection with Error Handling
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log(" Connected to MongoDB");
    } catch (error) {
        console.error(" MongoDB Connection Error:", error.message);
        process.exit(1);
    }
};
connectDB();

// API Routes
import trainerRoutes from "./routes/trainerRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import notificationsRoutes from "./routes/notificationsRoutes.js";
import classRoutes from "./routes/classRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";

// Apply API Routes
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

// Global Error Handling Middleware
app.use((err, req, res, next) => {
    console.error(" Error:", err.message);
    res.status(500).json({ message: "Internal Server Error" });
});

// Start Server
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

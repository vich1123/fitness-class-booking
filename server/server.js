import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

// Load environment variables
dotenv.config();

// Debugging logs to verify environment variables
console.log("MONGO_URI:", process.env.MONGO_URI ? "Loaded" : "Not Found");
console.log("FRONTEND_URL:", process.env.FRONTEND_URL ? "Loaded" : "Not Found");

// Create Express App
const app = express();

// CORS Setup - Allow Deployed Frontend & Localhost
const allowedOrigins = [
    process.env.FRONTEND_URL || "https://fitnessbookingonline.netlify.app",
    "http://localhost:3000"
];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

// Ensure preflight requests are handled correctly
app.options("*", cors()); 

// Middleware
app.use(express.json());

// Explicitly handle CORS headers
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", allowedOrigins.includes(req.headers.origin) ? req.headers.origin : "https://fitnessbookingonline.netlify.app");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.header("Access-Control-Allow-Credentials", "true");
    next();
});

// MongoDB Connection with Debugging
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("Connected to MongoDB successfully.");
    } catch (error) {
        console.error("MongoDB Connection Error:", error.message);
        process.exit(1);
    }
};
connectDB();

// Import Routes
import trainerRoutes from "./routes/trainerRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import notificationsRoutes from "./routes/notificationsRoutes.js";
import classRoutes from "./routes/classRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";

// API Routes
app.use("/api/trainers", trainerRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/notifications", notificationsRoutes);
app.use("/api/classes", classRoutes);
app.use("/api/payments", paymentRoutes);

// **EXPLICITLY LOG EACH REQUEST**
app.use((req, res, next) => {
    console.log(` API Request - Method: ${req.method}, Path: ${req.path}`);
    next();
});

// Root Route
app.get("/", (req, res) => {
    res.send("Fitness Class Booking API is running...");
});

// Error Handling Middleware
app.use((err, req, res, next) => {
    console.error("Server Error:", err.message);
    res.status(500).json({ message: "Internal Server Error" });
});

// Start Server
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

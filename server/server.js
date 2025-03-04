import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();

const allowedOrigins = [
    "https://fitnessbooking.netlify.app",
    "http://localhost:3000"
];

app.options("*", (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", req.headers.origin || "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    return res.status(200).end();
});

app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("CORS not allowed for this origin."));
        }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());

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

mongoose.connection.on("disconnected", () => {
    console.log("MongoDB disconnected! Reconnecting...");
    connectDB();
});

// Debugging Route
app.get("/api/test", (req, res) => {
    res.json({ message: "API is running fine." });
});

// Import Routes
import trainerRoutes from "./routes/trainerRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import notificationsRoutes from "./routes/notificationsRoutes.js";
import classRoutes from "./routes/classRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import recommendationRoutes from "./routes/recommendationRoutes.js";

app.use("/api/trainers", trainerRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/notifications", notificationsRoutes);
app.use("/api/classes", classRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/recommendations", recommendationRoutes);

app.get("/", (req, res) => {
    res.send("Fitness Class Booking API is running.");
});

// Error Handling Middleware
app.use((err, req, res, next) => {
    console.error("Server Error:", err.message);
    res.status(500).json({ message: "Internal Server Error", error: err.message });
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

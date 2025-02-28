import Booking from "../models/Booking.js";
import Class from "../models/Class.js";
import mongoose from "mongoose";

export const getRecommendations = async (req, res) => {
    try {
        const { userId } = req.params;

        if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: "Invalid or missing User ID" });
        }

        // Find all user bookings
        const bookings = await Booking.find({ user: userId }).populate("class");

        if (!bookings.length) {
            return res.status(200).json({ recommendations: [] });
        }

        // Extract unique categories from booked classes
        const bookedCategories = [...new Set(bookings.map(b => b.class?.category).filter(Boolean))];

        // Fetch recommended classes based on previously booked categories
        const recommendedClasses = await Class.find({ category: { $in: bookedCategories } });

        res.status(200).json({ recommendations: recommendedClasses });
    } catch (error) {
        console.error("Error fetching recommendations:", error);
        res.status(500).json({ message: "Failed to fetch recommendations", error: error.message });
    }
};

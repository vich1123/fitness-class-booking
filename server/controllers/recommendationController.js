const Recommendation = require('../models/Recommendation');
const Booking = require('../models/Booking');
const Class = require('../models/Class');

// Fetch class recommendations based on user preferences or history
const getRecommendations = async (req, res) => {
    const { userId } = req.params; // Assuming the user ID is provided

    try {
        // Get all bookings for the user
        const bookings = await Booking.find({ user: userId }).populate('classId');
        const recommendedClasses = [];

        // Logic to filter classes based on user history or preferences
        for (const booking of bookings) {
            const classData = await Class.find({ category: booking.classId.category }); // Example filtering by category
            recommendedClasses.push(...classData);
        }

        res.status(200).json({ recommendations: recommendedClasses });
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch recommendations', error: error.message });
    }
};

module.exports = { getRecommendations };

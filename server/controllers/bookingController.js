import Booking from "../models/Booking.js";
import Notification from "../models/Notification.js";
import mongoose from "mongoose";
import User from "../models/User.js";

// Create a booking
export const createBooking = async (req, res) => {
  try {
    console.log("Received booking request:", req.body);

    const { userId, classId, date } = req.body;

    if (!userId || !classId || !date) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(classId)) {
      return res.status(400).json({ message: "Invalid user or class ID" });
    }

    const booking = await Booking.create({
      user: new mongoose.Types.ObjectId(userId),
      class: new mongoose.Types.ObjectId(classId),
      date,
      status: "confirmed",
      createdAt: new Date(),
    });

    await Notification.create({
      user: new mongoose.Types.ObjectId(userId),
      message: `Your booking for class ID ${classId} has been confirmed.`,
      type: "booking",
    });

    console.log("Booking created:", booking);

    res.status(201).json({ message: "Booking successful", booking });
  } catch (error) {
    console.error("Error creating booking:", error);
    res.status(500).json({ message: "Failed to create booking", error: error.message });
  }
};

// Get all bookings
export const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("user", "name email")
      .populate("class", "name schedule trainer price")
      .sort({ createdAt: -1 });

    console.log("All bookings fetched:", bookings.length);
    res.status(200).json(bookings);
  } catch (error) {
    console.error("Error fetching bookings:", error);
    res.status(500).json({ message: "Failed to fetch bookings", error: error.message });
  }
};

// Get booking by ID
export const getBookingById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid booking ID" });
    }

    const booking = await Booking.findById(id)
      .populate("user", "name email")
      .populate("class", "name schedule trainer price");

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    console.log("Booking found:", booking);
    res.status(200).json(booking);
  } catch (error) {
    console.error("Error fetching booking by ID:", error);
    res.status(500).json({ message: "Failed to fetch booking", error: error.message });
  }
};

// Get bookings by user
export const getBookingsByUser = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      console.error("Invalid User ID:", userId);
      return res.status(400).json({ message: "Invalid user ID" });
    }

    console.log(`Fetching bookings for user: ${userId}`);

    const bookings = await Booking.find({ user: new mongoose.Types.ObjectId(userId) })
      .populate("class", "name schedule trainer price")
      .sort({ createdAt: -1 });

    console.log("Bookings found:", bookings.length);

    res.status(200).json(bookings);
  } catch (error) {
    console.error("Error fetching user bookings:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// Cancel booking (Change status to "canceled" instead of deleting)
export const cancelBooking = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid booking ID" });
    }

    const booking = await Booking.findById(id);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    booking.status = "canceled"; // Update status instead of deleting
    await booking.save();

    await Notification.create({
      user: booking.user,
      message: `Your booking for class ID ${booking.class} has been canceled.`,
      type: "cancellation",
    });

    console.log("Booking canceled:", booking);
    res.status(200).json({ message: "Booking canceled successfully", booking });
  } catch (error) {
    console.error("Error canceling booking:", error);
    res.status(500).json({ message: "Failed to cancel booking", error: error.message });
  }
};

// Update booking status
export const updateBookingStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid booking ID" });
    }

    const booking = await Booking.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    console.log("Booking status updated:", booking);
    res.status(200).json(booking);
  } catch (error) {
    console.error("Error updating booking status:", error);
    res.status(500).json({ message: "Failed to update booking status", error: error.message });
  }
};

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

    const booking = await Booking.create({ user: userId, class: classId, date, status: "confirmed" });

    await Notification.create({
      user: userId,
      message: `Your booking for class ID ${classId} has been confirmed.`,
      type: "booking",
    });

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
      .populate("class", "name schedule");

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

    const booking = await Booking.findById(id).populate("user", "name email").populate("class", "name schedule");

    if (!booking) return res.status(404).json({ message: "Booking not found" });

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
      return res.status(400).json({ message: "Invalid user ID" });
    }

    console.log(`Fetching bookings for user: ${userId}`);

    const bookings = await Booking.find({ user: userId }).populate("class", "name schedule");

    res.status(200).json(bookings);
  } catch (error) {
    console.error("Error fetching user bookings:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// Cancel booking
export const cancelBooking = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid booking ID" });
    }

    const booking = await Booking.findById(id);
    if (!booking) return res.status(404).json({ message: "Booking not found" });

    await Booking.findByIdAndDelete(id);

    await Notification.create({
      user: booking.user,
      message: `Your booking for class ID ${booking.class} has been cancelled.`,
      type: "cancellation",
    });

    res.status(200).json({ message: "Booking canceled successfully" });
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

    if (!booking) return res.status(404).json({ message: "Booking not found" });

    res.status(200).json(booking);
  } catch (error) {
    console.error("Error updating booking status:", error);
    res.status(500).json({ message: "Failed to update booking status", error: error.message });
  }
};

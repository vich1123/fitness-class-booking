import Payment from "../models/Payment.js";
import Booking from "../models/Booking.js";
import mongoose from "mongoose";

// Process payment
export const processPayment = async (req, res) => {
  try {
    const { userId, bookingId, amount, paymentMethod } = req.body;

    if (!userId || !bookingId || !amount || !paymentMethod) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(bookingId)) {
      return res.status(400).json({ message: "Invalid user or booking ID" });
    }

    // Ensure booking exists
    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    // Create payment record
    const payment = new Payment({
      user: userId,
      booking: bookingId,
      amount,
      paymentMethod,
      status: "completed",
    });

    await payment.save();

    res.status(201).json({ message: "Payment successful", payment });
  } catch (error) {
    res.status(500).json({ message: "Payment processing failed", error: error.message });
  }
};

// Get payment history for a user
export const getPaymentHistory = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    const payments = await Payment.find({ user: userId }).populate("booking");
    res.status(200).json(payments);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch payment history", error: error.message });
  }
};

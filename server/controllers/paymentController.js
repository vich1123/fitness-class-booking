import Payment from "../models/Payment.js";
import Booking from "../models/Booking.js";
import mongoose from "mongoose";

/**
 * Generate Payment Confirmation URL
 */
const generatePaymentURL = (paymentId) => {
  return `https://fitness-class-booking.onrender.com/api/payments/confirm/${paymentId}`;
};

/**
 * Process Payment (Step 1)
 * Creates a new payment entry with "pending" status.
 */
export const processPayment = async (req, res) => {
  try {
    let { userId, bookingId, amount, paymentMethod } = req.body;

    console.log("Processing payment request:", { userId, bookingId, amount, paymentMethod });

    // Validate userId and bookingId
    if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(bookingId)) {
      console.error("Invalid user or booking ID:", { userId, bookingId });
      return res.status(400).json({ message: "Invalid user or booking ID format" });
    }

    // Check if the booking exists
    const booking = await Booking.findById(bookingId);
    if (!booking) {
      console.error(`Booking not found: ${bookingId}`);
      return res.status(404).json({ message: "Booking not found" });
    }

    // Check if a payment already exists for this booking
    let payment = await Payment.findOne({ booking: bookingId });

    if (payment) {
      if (payment.status === "completed") {
        console.warn(`Payment already completed for booking: ${bookingId}`);
        return res.status(400).json({ message: "Booking already paid" });
      } else {
        console.log(`Existing payment found for Booking ID: ${bookingId}, Payment ID: ${payment._id}`);
        return res.status(200).json({
          message: "Payment already initiated",
          url: generatePaymentURL(payment._id),
          payment
        });
      }
    }

    // Create a new payment entry with "pending" status
    console.log("Creating a new payment entry.");
    payment = await Payment.create({
      user: userId,
      booking: bookingId,
      amount,
      paymentMethod,
      status: "pending",
      createdAt: new Date(),
    });

    const paymentURL = generatePaymentURL(payment._id);
    res.status(201).json({ message: "Payment initiated", url: paymentURL, payment });
  } catch (error) {
    console.error("Error processing payment:", error);
    res.status(500).json({ message: "Payment processing failed", error: error.message });
  }
};

/**
 * Confirm Payment (Step 2)
 * Marks the payment as "completed" only after confirmation.
 */
export const confirmPayment = async (req, res) => {
  try {
    const { paymentId } = req.params;

    console.log(`Confirming payment with ID: ${paymentId}`);

    // Validate payment ID
    if (!mongoose.Types.ObjectId.isValid(paymentId)) {
      console.error(`Invalid payment ID: ${paymentId}`);
      return res.status(400).json({ message: "Invalid payment ID format" });
    }

    // Find the payment entry
    const payment = await Payment.findById(paymentId);
    if (!payment) {
      console.error(`Payment not found: ${paymentId}`);
      return res.status(404).json({ message: "Payment not found" });
    }

    // Check if payment is already confirmed
    if (payment.status === "completed") {
      console.warn(`Payment already confirmed: ${paymentId}`);
      return res.status(400).json({ message: "Payment already confirmed" });
    }

    // Ensure only "pending" payments can be confirmed
    if (payment.status === "pending") {
      payment.status = "completed";
      await payment.save();

      // Mark the associated booking as confirmed
      await Booking.findByIdAndUpdate(payment.booking, { status: "confirmed" });

      console.log(`Payment confirmed successfully for Payment ID: ${paymentId}`);
      return res.status(200).json({ message: "Payment successful", payment });
    } else {
      return res.status(400).json({ message: "Payment is not pending, cannot confirm" });
    }
  } catch (error) {
    console.error("Error confirming payment:", error);
    res.status(500).json({ message: "Payment confirmation failed", error: error.message });
  }
};

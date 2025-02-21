import mongoose from 'mongoose';
import User from './User.js'; // Ensure the User model is properly referenced

const bookingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  class: { type: mongoose.Schema.Types.ObjectId, ref: 'Class', required: true },
  status: { type: String, enum: ['confirmed', 'pending', 'canceled'], default: 'pending' }
}, { timestamps: true });

export default mongoose.model('Booking', bookingSchema);

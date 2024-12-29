const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
  user: { type: String, required: true }, // User's name or ID (depending on your structure)
  classId: { type: mongoose.Schema.Types.ObjectId, ref: 'Class', required: true }, // Reference to the Class model
  schedule: { type: String, required: true }, // Date and time of the booking
  createdAt: { type: Date, default: Date.now }, // Automatically set the booking creation date
});

module.exports = mongoose.model('Booking', BookingSchema);

const mongoose = require('mongoose');

const ClassSchema = new mongoose.Schema({
  name: { type: String, required: true }, // Class name
  trainer: { type: mongoose.Schema.Types.ObjectId, ref: 'Trainer', required: true }, // Reference to the Trainer model
  schedule: { type: String, required: true }, // Class schedule (e.g., "Monday, 7:00 AM")
  capacity: { type: Number, default: 20 }, // Optional: Max number of participants
  createdAt: { type: Date, default: Date.now }, // Automatically set the creation date
});

module.exports = mongoose.model('Class', ClassSchema);

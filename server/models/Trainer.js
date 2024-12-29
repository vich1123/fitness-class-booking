const mongoose = require('mongoose');

const TrainerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  specialization: { type: String, required: true },
  experience: { type: Number, required: true }, // Years of experience
});

module.exports = mongoose.model('Trainer', TrainerSchema);

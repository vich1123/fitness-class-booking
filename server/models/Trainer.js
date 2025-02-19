import mongoose from 'mongoose';

const TrainerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  specialization: { type: String, required: true },
  experience: { type: Number, default: 0, min: 0 },
  bio: { type: String, default: '' },
  averageRating: { type: Number, default: 0, min: 0, max: 5 },
  feedback: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      rating: { type: Number, required: true, min: 1, max: 5 },
      comment: { type: String },
      createdAt: { type: Date, default: Date.now },
    }
  ]
});

const Trainer = mongoose.model('Trainer', TrainerSchema);
export default Trainer;

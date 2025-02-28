import mongoose from 'mongoose';

const ClassSchema = new mongoose.Schema({
  name: { type: String, required: true },
  trainer: { type: mongoose.Schema.Types.ObjectId, ref: 'Trainer' },
  schedule: { type: String, required: true },
  capacity: { type: Number, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true }
});

export default mongoose.model('Class', ClassSchema);

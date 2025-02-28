import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const trainerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  specialization: { type: String, required: true },
  experience: { type: Number, required: true },
  bio: { type: String },
  feedback: [feedbackSchema], 
});

const Trainer = mongoose.model("Trainer", trainerSchema);

export default Trainer;

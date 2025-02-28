import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    class: { type: mongoose.Schema.Types.ObjectId, ref: "Class", required: true },
    date: { type: Date, required: true },
    status: { type: String, enum: ["confirmed", "pending", "canceled"], default: "confirmed" },
    createdAt: { type: Date, default: Date.now }, 
  },
  { timestamps: true } 
);

export default mongoose.model("Booking", bookingSchema);

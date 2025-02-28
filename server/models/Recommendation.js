import mongoose from "mongoose";

const recommendationSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    recommendedClasses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Class" }],
});

const Recommendation = mongoose.model("Recommendation", recommendationSchema);

export default Recommendation;

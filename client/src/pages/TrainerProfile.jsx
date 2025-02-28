import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const API_URL = process.env.REACT_APP_BACKEND_URL || "https://fitness-class-booking.onrender.com";

const TrainerProfile = () => {
  const { id } = useParams();
  const [trainer, setTrainer] = useState(null);
  const [feedback, setFeedback] = useState("");
  const [rating, setRating] = useState("");
  const [submitError, setSubmitError] = useState(null);

  useEffect(() => {
    const fetchTrainer = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/trainers/${id}`);
        setTrainer(response.data);
      } catch (error) {
        console.error("Error fetching trainer details", error);
        setSubmitError("Failed to load trainer details.");
      }
    };

    fetchTrainer();
  }, [id]);

  const submitFeedback = async () => {
    try {
      const userId = localStorage.getItem("userId");
      if (!userId) {
        setSubmitError("User not logged in.");
        return;
      }

      if (!feedback.trim() || rating < 1 || rating > 5) {
        setSubmitError("Please enter valid feedback and a rating between 1 and 5.");
        return;
      }

      setSubmitError(null);

      await axios.post(`${API_URL}/api/trainers/${id}/feedback`, {
        user: userId,
        rating: Number(rating),
        comment: feedback,
      });

      setFeedback("");
      setRating("");

      // Refresh trainer details
      const response = await axios.get(`${API_URL}/api/trainers/${id}`);
      setTrainer(response.data);
    } catch (err) {
      setSubmitError("Error submitting feedback.");
    }
  };

  if (!trainer) return <p className="text-center text-gray-500">Loading...</p>;

  return (
    <div className="container mx-auto max-w-2xl p-6 bg-white shadow-lg rounded-lg mt-10">
      <h2 className="text-3xl font-bold text-center text-blue-700">{trainer.name}</h2>
      <p className="text-center text-gray-600 text-lg">{trainer.specialization}</p>
      <p className="text-center text-gray-500">
        <strong>Experience:</strong> {trainer.experience} years
      </p>

      {/* Feedback Section */}
      <div className="mt-6">
        <h3 className="text-2xl font-semibold text-gray-700 mb-3">Feedback</h3>
        {trainer.feedback && trainer.feedback.length > 0 ? (
          <ul className="space-y-3 bg-gray-100 p-4 rounded-lg">
            {trainer.feedback.map((fb, index) => (
              <li key={index} className="p-2 border-b border-gray-300 last:border-none">
                <strong>Rating:</strong> {fb.rating} ⭐ | <strong>Comment:</strong> {fb.comment}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No feedback yet.</p>
        )}
      </div>

      {/* Feedback Submission */}
      <div className="mt-6">
        <h3 className="text-2xl font-semibold text-gray-700 mb-3">Submit Feedback</h3>
        <textarea
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
          placeholder="Write your feedback..."
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
        />
        <input
          type="number"
          className="w-full p-3 border rounded-lg mt-2 focus:ring-2 focus:ring-blue-500"
          placeholder="Rating (1-5)"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          min="1"
          max="5"
        />
        <button
          onClick={submitFeedback}
          className="mt-4 w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition"
        >
          Submit Feedback
        </button>
        {submitError && <p className="text-red-500 text-center mt-2">{submitError}</p>}
      </div>
    </div>
  );
};

export default TrainerProfile;

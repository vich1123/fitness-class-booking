import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const API_URL = process.env.REACT_APP_BACKEND_URL || "https://fitness-class-booking.onrender.com";

const TrainerProfile = () => {
  const { id } = useParams();
  const [trainer, setTrainer] = useState(null);
  const [feedback, setFeedback] = useState("");
  const [rating, setRating] = useState(0);
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
      if (!feedback.trim() || rating < 1 || rating > 5) {
        setSubmitError("Please enter valid feedback and a rating between 1 and 5.");
        return;
      }

      setSubmitError(null);

      await axios.post(`${API_URL}/api/trainers/${id}/feedback`, {
        user: "67b58a48a696cd03b8a30289", // Replace this with actual logged-in user ID
        rating: Number(rating),
        comment: feedback,
      });

      setFeedback("");
      setRating(0);

      // Refresh trainer details
      const response = await axios.get(`${API_URL}/api/trainers/${id}`);
      setTrainer(response.data);
    } catch (err) {
      setSubmitError("Error submitting feedback.");
    }
  };

  if (!trainer) return <p>Loading...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>{trainer.name}</h2>
      <p><strong>Specialization:</strong> {trainer.specialization}</p>
      <p><strong>Experience:</strong> {trainer.experience} years</p>

      <h3>Feedback</h3>
      {trainer.feedback && trainer.feedback.length > 0 ? (
        <ul>
          {trainer.feedback.map((fb, index) => (
            <li key={index}>
              <strong>Rating:</strong> {fb.rating} | <strong>Comment:</strong> {fb.comment}
            </li>
          ))}
        </ul>
      ) : (
        <p>No feedback yet.</p>
      )}

      <h3>Submit Feedback</h3>
      <input
        type="text"
        placeholder="Write your feedback..."
        value={feedback}
        onChange={(e) => setFeedback(e.target.value)}
        style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
      />
      <input
        type="number"
        placeholder="Rating (1-5)"
        value={rating}
        onChange={(e) => setRating(e.target.value)}
        style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
      />
      <button 
        onClick={submitFeedback} 
        style={{ padding: "10px", backgroundColor: "blue", color: "white", border: "none" }}
      >
        Submit Feedback
      </button>
      {submitError && <p style={{ color: "red" }}>{submitError}</p>}
    </div>
  );
};

export default TrainerProfile;

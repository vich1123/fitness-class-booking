import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../utils/api';

const TrainerProfile = () => {
  const { trainerId } = useParams();
  const [trainer, setTrainer] = useState(null);
  const [feedback, setFeedback] = useState([]);
  const [newFeedback, setNewFeedback] = useState({ rating: 5, comment: '' });

  useEffect(() => {
    const fetchTrainerDetails = async () => {
      try {
        const response = await axios.get(`/trainers/${trainerId}`);
        setTrainer(response.data);
      } catch (error) {
        console.error('Error fetching trainer details', error);
      }
    };

    const fetchTrainerFeedback = async () => {
      try {
        const response = await axios.get(`/trainers/${trainerId}/feedback`);
        setFeedback(response.data.feedback);
      } catch (error) {
        console.error('Error fetching trainer feedback', error);
      }
    };

    fetchTrainerDetails();
    fetchTrainerFeedback();
  }, [trainerId]);

  const handleFeedbackSubmit = async () => {
    try {
      const response = await axios.post(`/trainers/${trainerId}/feedback`, {
        user: "USER_ID_HERE", // Replace with actual user ID
        rating: newFeedback.rating,
        comment: newFeedback.comment,
      });
      setFeedback([...feedback, response.data.trainer.feedback.slice(-1)[0]]);
      setNewFeedback({ rating: 5, comment: '' });
    } catch (error) {
      console.error('Error submitting feedback', error);
    }
  };

  if (!trainer) return <p>Loading...</p>;

  return (
    <div>
      <h1>{trainer.name}</h1>
      <p>Specialization: {trainer.specialization}</p>
      <p>Experience: {trainer.experience} years</p>
      <p>Average Rating: {trainer.averageRating.toFixed(1)}</p>

      <h3>Feedback</h3>
      {feedback.length > 0 ? (
        feedback.map((f, index) => (
          <div key={index}>
            <p><strong>{f.user.name}:</strong> {f.comment} ({f.rating})</p>
          </div>
        ))
      ) : (
        <p>No feedback yet.</p>
      )}

      <h3>Submit Feedback</h3>
      <select value={newFeedback.rating} onChange={(e) => setNewFeedback({ ...newFeedback, rating: e.target.value })}>
        {[1, 2, 3, 4, 5].map(num => <option key={num} value={num}>{num}</option>)}
      </select>
      <input type="text" value={newFeedback.comment} onChange={(e) => setNewFeedback({ ...newFeedback, comment: e.target.value })} />
      <button onClick={handleFeedbackSubmit}>Submit</button>
    </div>
  );
};

export default TrainerProfile;

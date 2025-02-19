import { useState, useEffect } from 'react';
import axios from 'axios';

const Trainers = () => {
  const [trainers, setTrainers] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:10000/api/trainers')
      .then((response) => setTrainers(response.data))
      .catch((error) => console.error('Error fetching trainers:', error));
  }, []);

  return (
    <div>
      <h2>Our Trainers</h2>
      {trainers.length > 0 ? (
        trainers.map((trainer) => (
          <div key={trainer._id}>
            <h3>{trainer.name}</h3>
            <p>Specialization: {trainer.specialization}</p>
            <p>Experience: {trainer.experience} years</p>
          </div>
        ))
      ) : (
        <p>No trainers found.</p>
      )}
    </div>
  );
};

export default Trainers;

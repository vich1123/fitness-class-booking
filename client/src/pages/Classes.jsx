import React, { useEffect, useState } from "react";
import axios from "axios";

const API_URL = process.env.REACT_APP_BACKEND_URL || "https://fitness-class-booking.onrender.com";

const Classes = ({ userId }) => {
  const [classes, setClasses] = useState([]);
  const [recommendedClasses, setRecommendedClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/classes`);
        setClasses(response.data);
      } catch (err) {
        setError("Failed to fetch classes");
      } finally {
        setLoading(false);
      }
    };

    const fetchRecommendedClasses = async () => {
      try {
        if (userId) {
          const response = await axios.get(`${API_URL}/api/classes/recommendations/${userId}`);
          setRecommendedClasses(response.data);
        }
      } catch (error) {
        console.error("Error fetching recommended classes:", error);
      }
    };

    fetchClasses();
    fetchRecommendedClasses();
  }, [userId]);

  const handleBookClass = (id) => {
    alert(`Class with ID ${id} booked successfully!`);
  };

  if (loading) return <p>Loading...</p>;

  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div>
      <h1>Available Classes</h1>
      {classes.length === 0 ? <p>No classes available</p> : classes.map(cls => (
        <div key={cls._id}>
          <h2>{cls.name}</h2>
          <p>Trainer: {cls.trainer?.name || "N/A"}</p>
          <p>Schedule: {cls.schedule}</p>
          <p>Capacity: {cls.capacity}</p>
          <p>Price: ${cls.price}</p>
          <button onClick={() => handleBookClass(cls._id)}>Book Class</button>
        </div>
      ))}

      {userId && recommendedClasses.length > 0 && (
        <>
          <h2>Recommended Classes</h2>
          {recommendedClasses.map(cls => (
            <div key={cls._id}>
              <h2>{cls.name}</h2>
              <p>Trainer: {cls.trainer?.name || "N/A"}</p>
              <p>Schedule: {cls.schedule}</p>
              <p>Capacity: {cls.capacity}</p>
              <p>Price: ${cls.price}</p>
              <button onClick={() => handleBookClass(cls._id)}>Book Class</button>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default Classes;

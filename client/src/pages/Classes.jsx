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
        const response = await axios.get(`${API_URL}/api/classes`, {
          headers: {
            "Content-Type": "application/json",
          },
        });
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

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-gray-700 text-lg font-semibold">Loading...</p>
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-red-500 text-lg font-semibold">{error}</p>
      </div>
    );

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold text-center text-blue-700 mb-6">
        Available Classes
      </h1>
      <div className="grid md:grid-cols-2 sm:grid-cols-1 gap-6">
        {classes.map((classItem) => (
          <div
            key={classItem._id}
            className="bg-white shadow-md rounded-lg p-6 border border-gray-200"
          >
            <h2 className="text-xl font-semibold text-gray-900">{classItem.name}</h2>
            <p className="text-gray-600">
              <strong>Trainer:</strong> {classItem.trainer?.name || "N/A"}
            </p>
            <p className="text-gray-600">
              <strong>Schedule:</strong> {classItem.schedule}
            </p>
            <p className="text-gray-600">
              <strong>Capacity:</strong> {classItem.capacity}
            </p>
            <p className="text-gray-600">
              <strong>Price:</strong> ${classItem.price}
            </p>
            <button
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all"
              onClick={() => handleBookClass(classItem._id)}
            >
              Book Class
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Classes;

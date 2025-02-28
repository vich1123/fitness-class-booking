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

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6 text-blue-700">Available Classes</h1>

      {loading ? (
        <p className="text-center text-gray-500">Loading classes...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
          {classes.length === 0 ? (
            <p className="text-center col-span-3">No classes available.</p>
          ) : (
            classes.map((cls) => (
              <div
                key={cls._id}
                className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition duration-300"
              >
                <h3 className="text-xl font-semibold text-gray-900">{cls.name}</h3>
                <p className="text-gray-700"><strong>Trainer:</strong> {cls.trainer?.name || "N/A"}</p>
                <p className="text-gray-600"><strong>Schedule:</strong> {cls.schedule}</p>
                <p className="text-gray-600"><strong>Capacity:</strong> {cls.capacity}</p>
                <p className="text-gray-900 font-bold mt-2">${cls.price}</p>
                <button
                  className="mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
                  onClick={() => handleBookClass(cls._id)}
                >
                  Book Class
                </button>
              </div>
            ))
          )}
        </div>
      )}

      {userId && recommendedClasses.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-center text-blue-700 mb-4">Recommended Classes</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
            {recommendedClasses.map((cls) => (
              <div
                key={cls._id}
                className="bg-gray-100 shadow-md rounded-lg p-6 hover:shadow-lg transition duration-300"
              >
                <h3 className="text-xl font-semibold text-gray-900">{cls.name}</h3>
                <p className="text-gray-700"><strong>Trainer:</strong> {cls.trainer?.name || "N/A"}</p>
                <p className="text-gray-600"><strong>Schedule:</strong> {cls.schedule}</p>
                <p className="text-gray-600"><strong>Capacity:</strong> {cls.capacity}</p>
                <p className="text-gray-900 font-bold mt-2">${cls.price}</p>
                <button
                  className="mt-4 w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition"
                  onClick={() => handleBookClass(cls._id)}
                >
                  Book Class
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Classes;

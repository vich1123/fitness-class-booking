import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const API_URL = process.env.REACT_APP_BACKEND_URL || "https://fitness-class-booking.onrender.com";

const Classes = () => {
  const { userId, isAuthenticated } = useContext(AuthContext);
  const [classes, setClasses] = useState([]);
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

    fetchClasses();
  }, []);

  const handleBookAndPay = async (classId, price) => {
    if (!isAuthenticated || !userId) {
      alert("You must be logged in to book a class.");
      return;
    }

    try {
      // Step 1: Create a Booking
      const bookingResponse = await axios.post(`${API_URL}/api/bookings`, {
        userId,
        classId,
        date: new Date().toISOString(),
      });

      if (bookingResponse.status === 201) {
        const bookingId = bookingResponse.data.booking._id;
        alert("Class booked successfully! Redirecting to payment...");

        // Step 2: Process Payment
        const paymentResponse = await axios.post(`${API_URL}/api/payments/process`, {
          userId,
          bookingId,
          amount: price,
          paymentMethod: "Card",
        });

        if (paymentResponse.data.url) {
          window.location.href = paymentResponse.data.url; // Redirect to payment gateway
        } else {
          alert("Payment initiation failed!");
        }
      }
    } catch (error) {
      console.error("Booking error:", error.response?.data || error.message);
      alert("Failed to book class. Please try again.");
    }
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
          {classes.map((cls) => (
            <div key={cls._id} className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition duration-300">
              <h3 className="text-xl font-semibold text-gray-900">{cls.name}</h3>
              <p className="text-gray-700"><strong>Trainer:</strong> {cls.trainer?.name || "N/A"}</p>
              <p className="text-gray-600"><strong>Schedule:</strong> {cls.schedule}</p>
              <p className="text-gray-600"><strong>Capacity:</strong> {cls.capacity}</p>
              <p className="text-gray-900 font-bold mt-2">${cls.price}</p>

              <button
                className="mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
                onClick={() => handleBookAndPay(cls._id, cls.price)}
              >
                Book & Pay
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Classes;

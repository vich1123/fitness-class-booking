import React, { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const BookClass = () => {
  const { classId } = useParams();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleBooking = async () => {
    try {
      console.log("Attempting to book class:", classId);

      const response = await axios.post("http://localhost:10000/api/bookings", {  // ✅ FIXED: Removed extra "/api/"
        userId: "65b4b9f9b8bf7c305a123456", // Replace with actual user ID
        classId,
        date: new Date().toISOString(),
      });

      setSuccess("Booking successful!");
      console.log("Booking response:", response.data);
    } catch (err) {
      console.error("Booking failed:", err.response?.data || err.message);
      setError("Booking failed. Please try again.");
    }
  };

  return (
    <div>
      <h2>Book Class</h2>
      <button onClick={handleBooking} className="bg-blue-500 text-white p-2 rounded">
        Book Now
      </button>
      {success && <p className="text-green-500">{success}</p>}
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};

export default BookClass;

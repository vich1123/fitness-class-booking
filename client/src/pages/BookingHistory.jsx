import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const API_URL = process.env.REACT_APP_BACKEND_URL || "https://fitness-class-booking.onrender.com";

const BookingHistory = () => {
  const { userId, isAuthenticated } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated || !userId) {
      setError("User not logged in.");
      setLoading(false);
      return;
    }

    const fetchBookings = async () => {
      try {
        console.log("Fetching bookings for user:", userId);
        const response = await axios.get(`${API_URL}/api/bookings/user/${userId}`);
        
        if (response.status === 200 && response.data.length > 0) {
          setBookings(response.data);
        } else {
          setError("No bookings found.");
        }
      } catch (error) {
        setError("Failed to fetch booking history.");
        console.error("Error fetching booking history:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [userId, isAuthenticated]);

  return (
    <div className="container mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <h2 className="text-2xl font-bold text-center text-blue-700">Booking History</h2>

      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : error ? (
        <p className="text-red-500 text-center">{error}</p>
      ) : bookings.length === 0 ? (
        <p className="text-gray-500 text-center">No bookings found.</p>
      ) : (
        <ul className="bg-gray-100 p-4 rounded-lg space-y-3">
          {bookings.map((booking) => (
            <li key={booking._id} className="p-3 border-b border-gray-300 last:border-none">
              <strong>Class:</strong> {booking.class?.name || "N/A"} <br />
              <strong>Date:</strong> {new Date(booking.createdAt).toLocaleDateString()} <br />
              <strong>Status:</strong> {booking.status}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BookingHistory;

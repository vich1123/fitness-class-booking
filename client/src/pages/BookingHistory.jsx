import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const API_URL = process.env.REACT_APP_BACKEND_URL || "https://fitness-class-booking.onrender.com";

const BookingHistory = () => {
  const { userId, isAuthenticated } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchBookings = async () => {
    try {
      if (!isAuthenticated || !userId) {
        setError("User not logged in.");
        setLoading(false);
        return;
      }

      const response = await axios.get(`${API_URL}/api/bookings/user/${userId}`);
      if (response.status === 200 && Array.isArray(response.data)) {
        setBookings(response.data);
        setError("");
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

  useEffect(() => {
    fetchBookings();
  }, [userId, isAuthenticated]);

  const handlePayment = async (bookingId, amount) => {
    try {
      const response = await axios.post(`${API_URL}/api/payments/process`, {
        userId,
        bookingId,
        amount,
        paymentMethod: "Credit Card",
      });

      if (response.status === 201) {
        alert("Payment successful!");
        fetchBookings();
      }
    } catch (error) {
      alert("Payment failed. Please try again.");
      console.error("Payment error:", error);
    }
  };

  return (
    <div>
      {bookings.map((booking) => (
        <button onClick={() => handlePayment(booking._id, booking.class?.price || 0)}>Pay Now</button>
      ))}
    </div>
  );
};

export default BookingHistory;

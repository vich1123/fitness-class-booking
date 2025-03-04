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

      console.log("Fetching bookings for user:", userId);
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

  const handlePayment = async (bookingId, amount) => {
    if (!bookingId) {
      alert("Error: Invalid booking ID.");
      return;
    }

    try {
      console.log(`Processing payment for booking ID: ${bookingId}`);
      const paymentResponse = await axios.post(`${API_URL}/api/payments/process`, {
        userId,
        bookingId,
        amount,
        paymentMethod: "Card",
      });

      if (paymentResponse.data.url) {
        console.log("Redirecting to payment URL:", paymentResponse.data.url);
        window.location.href = paymentResponse.data.url; // Redirect to payment gateway
      } else {
        alert("Payment failed: No payment URL received.");
      }
    } catch (error) {
      console.error("Payment failed:", error.response?.data || error.message);
      alert("Payment failed. Please try again.");
    }
  };

  useEffect(() => {
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
              <strong>Trainer:</strong> {booking.class?.trainer || "N/A"} <br />
              <strong>Date:</strong> {new Date(booking.date).toLocaleDateString()} <br />
              <strong>Price:</strong> ${booking.class?.price || "N/A"} <br />
              <strong>Status:</strong> {booking.status} <br />

              {/* Show "Pay Now" button only if booking is pending */}
              {booking.status === "pending" && (
                <button
                  onClick={() => handlePayment(booking._id, booking.class?.price)}
                  className="mt-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                >
                  Pay Now
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BookingHistory;

import React, { useEffect, useState } from "react";
import axios from "axios";

const BookingHistory = () => {
  const [bookings, setBookings] = useState([]);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, []);

  useEffect(() => {
    if (!userId) return;

    const fetchBookings = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/trainers`);
        setBookings(response.data);
      } catch (error) {
        console.error("Error fetching booking history:", error);
      }
    };

    fetchBookings();
  }, [userId]);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Booking History</h2>
      {bookings.length === 0 ? (
        <p className="text-gray-500">No bookings found</p>
      ) : (
        <ul className="bg-white shadow-md rounded-lg p-4">
          {bookings.map((booking) => (
            <li key={booking._id} className="p-2 border-b last:border-none">
              Class: {booking.class.name} | Date: {new Date(booking.date).toLocaleDateString()}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BookingHistory;

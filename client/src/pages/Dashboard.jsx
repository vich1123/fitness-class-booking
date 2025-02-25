import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [notifications, setNotifications] = useState([]);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, []);

  useEffect(() => {
    if (!userId) return;

    const fetchNotifications = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/notifications/${userId}`);
        setNotifications(response.data);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    fetchNotifications();
  }, [userId]);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
      <div className="mb-4">
        <Link to="/booking-history" className="text-blue-500 hover:underline">View Booking History</Link>
      </div>
      <div className="mb-4">
        <Link to="/payment-history" className="text-blue-500 hover:underline">View Payment History</Link>
      </div>
      <h3 className="text-xl font-bold mt-4">Notifications</h3>
      {notifications.length === 0 ? (
        <p className="text-gray-500">No notifications available</p>
      ) : (
        <ul className="bg-white shadow-md rounded-lg p-4">
          {notifications.map((notification) => (
            <li key={notification._id} className="p-2 border-b last:border-none">{notification.message}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dashboard;

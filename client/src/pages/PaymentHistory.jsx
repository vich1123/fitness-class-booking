import React, { useEffect, useState } from "react";
import axios from "axios";

const API_URL = process.env.REACT_APP_BACKEND_URL || "https://fitness-class-booking.onrender.com";

const PaymentHistory = () => {
  const [payments, setPayments] = useState([]);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (!userId) return;

    const fetchPayments = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/payments/history/${userId}`);
        setPayments(response.data);
      } catch (error) {
        console.error("Error fetching payment history:", error);
      }
    };

    fetchPayments();
  }, [userId]);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Payment History</h2>
      {payments.length === 0 ? (
        <p className="text-gray-500">No payments found</p>
      ) : (
        <ul className="bg-white shadow-md rounded-lg p-4">
          {payments.map((payment) => (
            <li key={payment._id} className="p-2 border-b last:border-none">
              Booking: {payment.booking?._id || "N/A"} | 
              Amount: ${payment.amount} | 
              Status: {payment.status}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PaymentHistory;

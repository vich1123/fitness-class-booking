import React, { useState } from "react";
import { useParams } from "react-router-dom";

const Payment = () => {
  const { bookingId } = useParams();
  const [paymentStatus, setPaymentStatus] = useState(null);

  const handlePayment = async () => {
    try {
      const response = await fetch(`/api/payments/${bookingId}/pay`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      if (response.ok) {
        setPaymentStatus("Payment successful!");
      } else {
        setPaymentStatus("Payment failed: " + data.message);
      }
    } catch (error) {
      setPaymentStatus("Payment failed: " + error.message);
    }
  };

  return (
    <div className="payment-container">
      <h2>Complete Your Payment</h2>
      <button onClick={handlePayment}>Pay Now</button>
      {paymentStatus && <p>{paymentStatus}</p>}
    </div>
  );
};

export default Payment;

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getClassById, initiatePayment } from '../utils/api';

const BookClass = () => {
  const { id } = useParams();
  const [classDetails, setClassDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchClassDetails = async () => {
      try {
        const data = await getClassById(id);
        setClassDetails(data);
      } catch (err) {
        setError('Error fetching class details');
      } finally {
        setLoading(false);
      }
    };
    fetchClassDetails();
  }, [id]);

  const handlePayment = async () => {
    try {
      const userId = 'user123'; // Replace with actual user ID from context/auth
      const paymentResponse = await initiatePayment(id, userId);
      alert(`Payment initiated: ${paymentResponse.paymentUrl}`);
      window.location.href = paymentResponse.paymentUrl;
    } catch (err) {
      alert('Failed to initiate payment');
    }
  };

  if (loading) return <p>Loading class details...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Book Class</h2>
      {classDetails ? (
        <div>
          <p>Class: {classDetails.name}</p>
          <p>Trainer: {classDetails.trainer}</p>
          <p>Schedule: {classDetails.schedule}</p>
          <p>Price: ${classDetails.price}</p>
          <button onClick={handlePayment}>Proceed to Payment</button>
        </div>
      ) : (
        <p>Class details not found.</p>
      )}
    </div>
  );
};

export default BookClass;

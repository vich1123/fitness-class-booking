import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import API from '../utils/api';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

const Payment = ({ classId, amount }) => {
    const handlePayment = async () => {
        try {
            const response = await API.post('/bookings/pay', { classId, amount });
            const { sessionId } = response.data;

            const stripe = await stripePromise;
            await stripe.redirectToCheckout({ sessionId });
        } catch (error) {
            alert('Payment failed.');
        }
    };

    return (
        <button onClick={handlePayment} className="bg-blue-500 text-white p-2 rounded">
            Pay Now
        </button>
    );
};

export default Payment;

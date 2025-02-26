import axios from "axios";

const API_BASE_URL = "https://fitness-class-booking.onrender.com/api";

// Create an Axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
});

// Function to register a new user
export const registerUser = async (userData) => {
  try {
    const response = await api.post("/auth/register", userData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Registration failed" };
  }
};

// Function to log in a user
export const loginUser = async (userData) => {
  try {
    const response = await api.post("/auth/login", userData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Login failed" };
  }
};

// Function to fetch all trainers
export const getTrainers = async () => {
  try {
    const response = await api.get("/trainers");
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to fetch trainers" };
  }
};

// Function to fetch trainer details by ID
export const getTrainerById = async (id) => {
  try {
    const response = await api.get(`/trainers/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Trainer not found" };
  }
};

// Function to submit feedback for a trainer
export const submitFeedback = async (trainerId, feedbackData) => {
  try {
    const response = await api.post(`/trainers/${trainerId}/feedback`, feedbackData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to submit feedback" };
  }
};

// Function to create a new booking
export const createBooking = async (bookingData) => {
  try {
    const response = await api.post("/bookings", bookingData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Booking failed" };
  }
};

// Function to get booking history
export const getBookingHistory = async (userId) => {
  try {
    const response = await api.get(`/bookings/history/${userId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to fetch booking history" };
  }
};

// Function to process payments
export const processPayment = async (paymentData) => {
  try {
    const response = await api.post("/payments/process", paymentData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Payment processing failed" };
  }
};

// Function to get class details by ID
export const getClassById = async (id) => {
  try {
    const response = await api.get(`/classes/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Class not found" };
  }
};

export default api;

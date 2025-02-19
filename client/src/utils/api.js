import axios from 'axios';

const API_URL = 'http://localhost:10000/api';

// Fetch all classes
export const getClasses = async () => {
  try {
    const response = await axios.get(`${API_URL}/classes`);
    return response.data;
  } catch (error) {
    console.error('Error fetching classes:', error);
    throw error;
  }
};

// Fetch class by ID
export const getClassById = async (id) => {
  if (!id) throw new Error('Class ID is required');
  try {
    const response = await axios.get(`${API_URL}/classes/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching class details:', error);
    throw error;
  }
};

// Fetch trainer by ID
export const getTrainerById = async (id) => {
  if (!id) throw new Error('Trainer ID is required');
  try {
    const response = await axios.get(`${API_URL}/trainers/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching trainer details:', error);
    throw error;
  }
};

// Initiate Payment
export const initiatePayment = async (classId, userId) => {
  if (!classId || !userId) throw new Error('Class ID and User ID are required');
  try {
    const response = await axios.post(`${API_URL}/payments/initiate`, {
      classId,
      userId,
    });
    return response.data;
  } catch (error) {
    console.error('Error initiating payment:', error);
    throw error;
  }
};

// Fetch Recommended Classes
export const fetchRecommendations = async (interests) => {
  try {
    const response = await axios.post(`${API_URL}/classes/recommendations`, {
      interests,
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching recommended classes:', error);
    throw error;
  }
};

// Fetch Notifications
export const fetchNotifications = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}/notifications/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching notifications:', error);
    throw error;
  }
};

// Ensure backward compatibility
export default {
  getClasses,
  getClassById,
  getTrainerById,
  initiatePayment,
  fetchRecommendations,
  fetchNotifications,
};

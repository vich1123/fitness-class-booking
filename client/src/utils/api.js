import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:10000/api",
});

export const getClasses = () => API.get("/classes");
export const getClassById = (id) => API.get(`/classes/${id}`);
export const createBooking = (bookingData) => API.post("/bookings", bookingData);
export const getTrainerById = (id) => API.get(`/trainers/${id}`);

export default API;

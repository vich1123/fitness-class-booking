import React, { useContext } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import TrainerProfile from "./pages/TrainerProfile";
import BookClass from "./pages/BookClass";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Classes from "./pages/Classes";
import Trainers from "./pages/Trainers";
import BookingHistory from "./pages/BookingHistory";
import Payment from "./pages/Payment";
import NotFound from "./pages/NotFound";
import { AuthContext } from "./context/AuthContext"; 
import PrivateRoute from "./components/PrivateRoute"; 

function App() {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Redirect to login if not authenticated */}
        <Route path="/" element={isAuthenticated ? <Home /> : <Navigate to="/login" />} />

        {/* Protect all routes using PrivateRoute */}
        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="/trainers" element={<PrivateRoute><Trainers /></PrivateRoute>} />
        <Route path="/trainers/:id" element={<PrivateRoute><TrainerProfile /></PrivateRoute>} />
        <Route path="/book/:classId" element={<PrivateRoute><BookClass /></PrivateRoute>} />
        <Route path="/classes" element={<PrivateRoute><Classes /></PrivateRoute>} />
        <Route path="/booking-history" element={<PrivateRoute><BookingHistory /></PrivateRoute>} />
        <Route path="/payment/:bookingId" element={<PrivateRoute><Payment /></PrivateRoute>} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;

import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
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
import PaymentHistory from "./pages/PaymentHistory";
import Payment from "./pages/Payment";
import NotFound from "./pages/NotFound";
import { AuthContext } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import React, { useContext, useEffect, useState } from "react";

function App() {
  const { isAuthenticated } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, [isAuthenticated]);

  if (loading) return <p>Loading...</p>;

  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes - Require Authentication */}
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/trainers" element={<Trainers />} />
          <Route path="/trainers/:id" element={<TrainerProfile />} />
          <Route path="/book/:classId" element={<BookClass />} />
          <Route path="/classes" element={<Classes />} />
          <Route path="/booking-history" element={<BookingHistory />} />
          <Route path="/payment/:bookingId" element={<Payment />} />
          <Route path="/payment-history" element={<PaymentHistory />} />
        </Route>

        {/* Catch-All 404 Page */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;

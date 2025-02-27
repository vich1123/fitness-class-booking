import React, { useContext } from "react";
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
import Payment from "./pages/Payment";
import NotFound from "./pages/NotFound";
import { AuthContext } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";  // ✅ Correct import

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

        {/* Protect these routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/trainers" element={<Trainers />} />
          <Route path="/trainers/:id" element={<TrainerProfile />} />
          <Route path="/book/:classId" element={<BookClass />} />
          <Route path="/classes" element={<Classes />} />
          <Route path="/booking-history" element={<BookingHistory />} />
          <Route path="/payment/:bookingId" element={<Payment />} />
        </Route>

        {/* 404 Page */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;

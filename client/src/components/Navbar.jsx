import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    navigate("/login"); // Redirect to login after logout
  };

  return (
    <nav className="bg-blue-600 p-4 text-white">
      <div className="container mx-auto flex justify-between">
        <Link to="/" className="font-bold text-lg">
          Fitness Class Booking
        </Link>
        <div className="flex gap-4">
          <Link to="/">Home</Link>
          <Link to="/trainers">Trainers</Link>
          <Link to="/classes">Classes</Link>
          <Link to="/dashboard">Dashboard</Link>

          {token ? (
            <button onClick={handleLogout} className="bg-red-500 px-3 py-1 rounded">
              Logout
            </button>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

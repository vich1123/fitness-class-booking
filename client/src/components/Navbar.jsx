import React from 'react';

const Navbar = () => {
  return (
    <nav className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between">
        <h1 className="text-xl font-bold">Fitness Class Booking</h1>
        <ul className="flex space-x-4">
          <li><a href="/" className="hover:underline">Home</a></li>
          <li><a href="/trainers" className="hover:underline">Trainers</a></li>
          <li><a href="/classes" className="hover:underline">Classes</a></li>
          <li><a href="/dashboard" className="hover:underline">Dashboard</a></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;

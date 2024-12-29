import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <header className="bg-blue-500 text-white text-center py-16">
        <h1 className="text-4xl font-bold">Welcome to Fitness Class Booking</h1>
        <p className="mt-4 text-xl">Book your personalized fitness classes today!</p>
      </header>
      <main className="container mx-auto py-8">
        <h2 className="text-2xl font-bold mb-4">Top Trainers</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-white shadow-lg p-4 rounded-md border">
            <h2 className="text-xl font-bold">John Doe</h2>
            <p className="text-gray-600">Yoga Expert</p>
            <Link
              to="/trainers"
              className="text-blue-500 hover:underline mt-2 block"
            >
              View Profile
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;

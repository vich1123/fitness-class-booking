import React from "react";

const Dashboard = () => {
  const userData = {
    name: "John Doe",
    email: "johndoe@example.com",
    bookings: ["Yoga", "Cardio"],
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <p>Welcome, {userData.name}</p>
      <p>Email: {userData.email}</p>
      <h2 className="text-xl font-semibold mt-4">Your Bookings:</h2>
      <ul className="list-disc pl-6">
        {userData.bookings.map((booking, index) => (
          <li key={index}>{booking}</li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;

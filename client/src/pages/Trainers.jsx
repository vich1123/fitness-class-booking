import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Trainers = () => {
  const [trainers, setTrainers] = useState([]);

  useEffect(() => {
    const fetchTrainers = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/trainers`);
        setTrainers(response.data);
      } catch (error) {
        console.error("Error fetching trainers:", error);
      }
    };
    fetchTrainers();
  }, []);

  return (
    <div className="container mx-auto p-5">
      <h1 className="text-3xl font-bold text-center mb-5">Top Trainers</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {trainers.map((trainer) => (
          <div key={trainer._id} className="border rounded-lg p-5 shadow-md">
            <h2 className="text-xl font-semibold">{trainer.name}</h2>
            <p className="text-gray-500">{trainer.specialization}</p>
            <Link to={`/trainers/${trainer._id}`} className="mt-3 inline-block bg-blue-500 text-white px-4 py-2 rounded-md" >
              View Profile
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Trainers;

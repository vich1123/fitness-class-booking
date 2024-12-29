import React from 'react';

const TrainerCard = ({ name, expertise }) => {
  return (
    <div className="border rounded-lg shadow-md p-4">
      <h3 className="text-xl font-bold">{name}</h3>
      <p className="text-gray-600">{expertise}</p>
      <button className="bg-blue-500 text-white mt-4 py-2 px-4 rounded">View Profile</button>
    </div>
  );
};

export default TrainerCard;

import React from 'react';

const ClassCard = ({ name, schedule, capacity }) => {
  return (
    <div className="border rounded-lg shadow-md p-4">
      <h3 className="text-xl font-bold">{name}</h3>
      <p className="text-gray-600">Schedule: {schedule}</p>
      <p className="text-gray-600">Capacity: {capacity}</p>
      <button className="bg-green-500 text-white mt-4 py-2 px-4 rounded">Book Now</button>
    </div>
  );
};

export default ClassCard;

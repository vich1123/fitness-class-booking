import React, { useEffect, useState } from "react";

const Classes = () => {
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    // Simulate API call to fetch classes
    setClasses([
      { id: 1, name: "Yoga", trainer: "John Doe" },
      { id: 2, name: "Cardio", trainer: "Jane Smith" },
    ]);
  }, []);

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Available Classes</h1>
      {classes.length === 0 ? (
        <p>No classes available at the moment.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {classes.map((classItem) => (
            <div
              key={classItem.id}
              className="bg-white shadow-lg p-4 rounded-md border"
            >
              <h2 className="text-xl font-bold">{classItem.name}</h2>
              <p className="text-gray-600">Trainer: {classItem.trainer}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Classes;

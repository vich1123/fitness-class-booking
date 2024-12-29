import React, { useEffect, useState } from "react";
import ClassCard from "../components/ClassCard";

const Classes = () => {
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    // Fetch classes from API
    fetch("/api/classes")
      .then((res) => res.json())
      .then((data) => setClasses(data))
      .catch((err) => console.error("Error fetching classes:", err));
  }, []);

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Available Classes</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {classes.map((classItem) => (
          <ClassCard key={classItem.id} classInfo={classItem} />
        ))}
      </div>
    </div>
  );
};

export default Classes;

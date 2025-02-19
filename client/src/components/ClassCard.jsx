import React, { useEffect, useState } from 'react';
import { getClassById } from '../utils/api';

const ClassCard = ({ classId }) => {
  const [classData, setClassData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchClassDetails = async () => {
      try {
        const data = await getClassById(classId);
        setClassData(data);
      } catch (err) {
        setError('Error: Class data not available.');
      }
    };
    fetchClassDetails();
  }, [classId]);

  return (
    <div className="class-card">
      {error ? (
        <p>{error}</p>
      ) : classData ? (
        <div>
          <h3>{classData.name}</h3>
          <p>Schedule: {classData.schedule}</p>
          <p>Trainer: {classData.trainer?.name}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ClassCard;

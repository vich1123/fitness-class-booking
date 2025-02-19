import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Classes = () => {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await axios.get('http://localhost:10000/api/classes');
        setClasses(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching class data:', error);
        setError('Failed to load classes');
        setLoading(false);
      }
    };
    fetchClasses();
  }, []);

  if (loading) {
    return <p>Loading classes...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h2>Available Classes</h2>
      {classes.length === 0 ? (
        <p>No classes available at the moment.</p>
      ) : (
        <div>
          {classes.map((classItem) => (
            <div key={classItem._id} className="border p-4 my-4">
              <h3>{classItem.name}</h3>
              <p>Trainer: {classItem.trainer?.name || 'Unknown'}</p>
              <p>Schedule: {classItem.schedule}</p>
              <p>Capacity: {classItem.capacity}</p>
              <p>Price: {classItem.price}</p>
              
              <Link to={`/book/${classItem._id}`}>
                <button className="bg-blue-500 text-white px-4 py-2 mt-2">Book Class</button>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Classes;

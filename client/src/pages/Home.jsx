import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TrainerCard from '../components/TrainerCard';
import ClassCard from '../components/ClassCard';

const Home = () => {
  const trainers = [
    { id: 1, name: 'John Doe', expertise: 'Yoga Expert' },
    { id: 2, name: 'Jane Smith', expertise: 'Personal Trainer' },
  ];

  const [classes, setClasses] = useState([]);

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await axios.get('http://localhost:10000/api/classes');
        setClasses(response.data);
      } catch (error) {
        console.error("Error fetching classes:", error);
      }
    };

    fetchClasses();
  }, []);

  return (
    <div>
      <section className="bg-blue-500 text-white p-8 text-center">
        <h1 className="text-3xl font-bold">Welcome to Fitness Class Booking</h1>
        <p className="mt-4">Book your personalized fitness classes today!</p>
      </section>

      <section className="py-8 px-4">
        <h2 className="text-2xl font-semibold mb-4">Top Trainers</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {trainers.map(trainer => (
            <TrainerCard key={trainer.id} {...trainer} />
          ))}
        </div>
      </section>

      <section className="py-8 px-4">
        <h2 className="text-2xl font-semibold mb-4">Available Classes</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {classes.length === 0 ? (
            <p>No classes available.</p>
          ) : (
            classes.map(cls => (
              <ClassCard key={cls._id} classId={cls._id} {...cls} />
            ))
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;

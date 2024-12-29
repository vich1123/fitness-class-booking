import React from 'react';
import TrainerCard from '../components/TrainerCard';

const Home = () => {
  return (
    <div>
      <header className="bg-blue-500 text-white text-center py-16">
        <h1 className="text-4xl font-bold">Welcome to Fitness Class Booking</h1>
        <p className="mt-4 text-xl">Book your personalized fitness classes today!</p>
      </header>
      <main className="container mx-auto py-8">
        <h2 className="text-2xl font-bold mb-4">Top Trainers</h2>
        <div className="grid grid-cols-3 gap-4">
          <TrainerCard name="John Doe" expertise="Yoga" />
          <TrainerCard name="Jane Smith" expertise="Cardio" />
          <TrainerCard name="Emily Johnson" expertise="Strength Training" />
        </div>
      </main>
    </div>
  );
};

export default Home;

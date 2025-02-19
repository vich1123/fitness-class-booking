import React, { useEffect, useState } from 'react';
import { fetchRecommendations, fetchNotifications } from '../utils/api';

const Dashboard = () => {
  const [recommendedClasses, setRecommendedClasses] = useState([]);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const interests = ["Yoga", "Strength Training"]; // Replace with actual user interests
        const recommendations = await fetchRecommendations(interests);
        setRecommendedClasses(recommendations);
      } catch (error) {
        console.error('Error fetching recommended classes:', error);
      }

      try {
        const userId = "USER_ID_HERE"; // Replace with actual user ID
        const notificationsData = await fetchNotifications(userId);
        setNotifications(notificationsData);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Recommended Classes</h2>
      {recommendedClasses.length > 0 ? (
        recommendedClasses.map((classItem) => (
          <div key={classItem.id}>
            <p>{classItem.name} - {classItem.schedule}</p>
          </div>
        ))
      ) : (
        <p>No recommendations available.</p>
      )}

      <h2>Notifications</h2>
      {notifications.length > 0 ? (
        notifications.map((notification) => (
          <div key={notification.id}>
            <p>{notification.message}</p>
          </div>
        ))
      ) : (
        <p>No new notifications.</p>
      )}
    </div>
  );
};

export default Dashboard;

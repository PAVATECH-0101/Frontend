import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './RouteSuggestions.css'; // Assuming we will style the suggestions

const RouteSuggestions = () => {
  const [routes, setRoutes] = useState([]);

  useEffect(() => {
    const fetchRoutes = async () => {
      try {
        const response = await axios.get('/api/route-suggestions');
        setRoutes(response.data);
      } catch (error) {
        console.error('Error fetching route suggestions', error);
      }
    };

    fetchRoutes();
  }, []);

  return (
    <div className="route-suggestions-container">
      <h2>Suggested Routes</h2>
      {routes.length > 0 ? (
        <ul className="route-list">
          {routes.map((route, index) => (
            <li key={index} className="route-item">
              <p>Distance: {route.distance}</p>
              <p>Duration: {route.duration}</p>
              {/* Display route steps or any other info */}
            </li>
          ))}
        </ul>
      ) : (
        <p>No routes found.</p>
      )}
    </div>
  );
};

export default RouteSuggestions;

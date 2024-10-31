import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './RouteSuggestions.css'; // Assuming we will style the suggestions

const RouteSuggestions = ({ destination }) => {
  const [routes, setRoutes] = useState([]);
  const [loading, setLoading] = useState(true); // State for loading
  const [error, setError] = useState(null); // State for error

  useEffect(() => {
    const fetchRoutes = async () => {
      try {
        // Make sure to set the correct API endpoint and include your API key
        const response = await axios.get(`/api/route-suggestions`, {
          params: {
            destination,
            apiKey: process.env.REACT_APP_API_KEY,
          },
        });
        setRoutes(response.data.routes); // Adjust according to your API response structure
      } catch (error) {
        console.error('Error fetching route suggestions', error);
        setError('Failed to fetch route suggestions. Please try again later.');
      } finally {
        setLoading(false); // Stop loading regardless of success or failure
      }
    };

    if (destination) { // Only fetch routes if destination is provided
      fetchRoutes();
    }
  }, [destination]); // Depend on destination to refetch routes when it changes

  return (
    <div className="route-suggestions-container">
      <h2>Suggested Routes</h2>
      {loading ? (
        <p>Loading...</p> // Show loading text while fetching data
      ) : error ? (
        <p>{error}</p> // Show error message if there's an error
      ) : routes.length > 0 ? (
        <ul className="route-list">
          {routes.map((route, index) => (
            <li key={index} className="route-item">
              <p>Distance: {route.distance} km</p> {/* Assuming distance is in kilometers */}
              <p>Duration: {route.duration} mins</p> {/* Assuming duration is in minutes */}
              {/* Display additional route information here if available */}
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

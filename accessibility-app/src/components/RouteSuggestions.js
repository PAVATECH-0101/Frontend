import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './RouteSuggestions.css'; // Assuming we will style the suggestions

const RouteSuggestions = ({ destination }) => { // Accept destination as a prop
  const [routes, setRoutes] = useState([]);
  const [loading, setLoading] = useState(true); // State for loading
  const [error, setError] = useState(null); // State for error

  useEffect(() => {
    const fetchRoutes = async () => {
      try {
        // Include the destination in your API call and use the API key from environment variables
        const response = await axios.get(`/api/route-suggestions?destination=${destination}&apiKey=${process.env.REACT_APP_API_KEY}`);
        setRoutes(response.data);
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
              <p>Distance: {route.distance}</p>
              <p>Duration: {route.duration}</p>
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

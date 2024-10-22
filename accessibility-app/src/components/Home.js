import React, { useState } from 'react';
import axios from 'axios';
import './Home.css'; // Assuming we will have CSS for the background image

const Home = () => {
  const [destination, setDestination] = useState('');

  const handleSearch = async () => {
    if (!destination) {
      alert('Please enter a destination');
      return; // Prevent the request if no destination is provided
    }
    
    try {
      const response = await axios.get(`/api/route-suggestions?destination=${destination}&apiKey=${process.env.REACT_APP_API_KEY}`);
      console.log(response.data);
      // Handle response data here (e.g., updating state to display results)
    } catch (error) {
      console.error('Error fetching route suggestions', error);
      alert('Failed to fetch route suggestions. Please try again later.'); // User feedback on error
    }
  };

  return (
    <div className="home-container" style={{ backgroundImage: 'url("/path-to-your-background.jpg")' }}>
      <div className="overlay">
        <div className="home-content">
          <p>Locate routes customized to meet your accessibility requirements.</p>
          <input
            type="text"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            placeholder="Enter your destination"
            className="input-field"
          />
          <button onClick={handleSearch} className="search-button">Find Routes</button>
        </div>
      </div>
    </div>
  );
};

export default Home;


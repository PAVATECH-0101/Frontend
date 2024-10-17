import React, { useState } from 'react';
import axios from 'axios';
import './Home.css'; // Assuming we will have CSS for the background image

const Home = () => {
  const [destination, setDestination] = useState('');

  const handleSearch = async () => {
    try {
      const response = await axios.get(`/api/route-suggestions?destination=${destination}&apiKey=${process.env.REACT_APP_API_KEY}`);
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching route suggestions', error);
    }
  };
  
  return (
    <div className="home-container" style={{ backgroundImage: 'url("/path-to-your-background.jpg")' }}>
      <div className="overlay">
        <div className="home-content">
          <h1>Experience the most accessible routes in the city</h1>
          <p>Find routes tailored to your accessibility needs</p>
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

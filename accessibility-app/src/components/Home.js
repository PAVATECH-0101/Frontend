import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Home.css'; // Keep this for other styling needs

const Home = () => {
  const [destination, setDestination] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSearch = async () => {
    // Validate input
    if (!destination) {
      setErrorMessage('Please enter a destination.');
      return;
    }

    setLoading(true);
    setErrorMessage('');

    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(destination)}&key=${process.env.REACT_APP_API_KEY}`
      );

      console.log('API Response:', response.data);

      if (response.data.status === 'OK' && response.data.results.length > 0) {
        const { lat, lng } = response.data.results[0].geometry.location;

        // Default start waypoint (consider fetching user's location or setting a fixed start point)
        const startWaypoint = { lat: 0, lng: 0 }; // Replace with actual start location if available

        navigate('/map', {
          state: { startWaypoint, endWaypoint: { lat, lng } },
        });
      } else {
        setErrorMessage('No results found for that destination.');
      }
    } catch (error) {
      console.error('Error fetching route suggestions', error);
      setErrorMessage('Failed to fetch route suggestions. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="home-container"
      style={{
        backgroundImage: `url(${process.env.PUBLIC_URL}/images/background2.jpg)`,
        backgroundSize: 'cover',
        backgroundPosition: 'right',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20px',
      }}
    >
      <div
        className="overlay"
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          padding: '20px',
          borderRadius: '10px',
          width: '80%',
          maxWidth: '600px',
        }}
      >
        <div className="home-content" style={{ color: 'black' }}>
          <p>Find accessible routes tailored to your needs.</p>
          <input
            type="text"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            placeholder="Enter your destination"
            className="input-field"
          />
          <button onClick={handleSearch} className="search-button" disabled={loading}>
            {loading ? 'Finding Routes...' : 'Find Routes'}
          </button>

          {errorMessage && <p className="error-message">{errorMessage}</p>}
        </div>
      </div>
    </div>
  );
};

export default Home;

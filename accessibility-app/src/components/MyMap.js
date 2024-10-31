import React, { useEffect, useState } from 'react';
import { GoogleMap, DirectionsRenderer, useLoadScript } from '@react-google-maps/api';

// Define styles for the map container
const mapContainerStyle = {
  width: '100%',
  height: '100vh', // Full viewport height
};

const MyMap = () => {
  // Load Google Maps API
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_API_KEY, // Ensure the API key is set in your .env file
    libraries: ['places'], // Include any additional libraries needed
  });

  const [directions, setDirections] = useState(null);

  useEffect(() => {
    if (isLoaded) {
      const directionsService = new window.google.maps.DirectionsService();
      const startWaypoint = { lat: 37.7749, lng: -122.4194 }; // Starting point: San Francisco
      const endWaypoint = { lat: 34.0522, lng: -118.2437 }; // Destination: Los Angeles

      // Request directions and handle errors
      directionsService.route(
        {
          origin: startWaypoint,
          destination: endWaypoint,
          travelMode: window.google.maps.TravelMode.DRIVING,
        },
        (result, status) => {
          if (status === window.google.maps.DirectionsStatus.OK) {
            setDirections(result);
          } else {
            console.error(`Error fetching directions: ${status}`, result);
          }
        }
      );
    }
  }, [isLoaded]);

  // Handle loading state and load errors
  if (loadError) return <div>Error loading map</div>;
  if (!isLoaded) return <div>Loading...</div>;

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      center={{ lat: 36.7783, lng: -119.4179 }} // Centered in California
      zoom={6}
    >
      {directions && <DirectionsRenderer directions={directions} />}
    </GoogleMap>
  );
};

// App component to include MyMap and footer
const App = () => (
  <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
    <div style={{ flex: 1 }}>
      <MyMap />
    </div>
    <div className="footer" style={{ height: '50px', background: '#f1f1f1' }}>
      {/* Footer content goes here, such as copyright or navigation links */}
      <p style={{ textAlign: 'center', margin: 'auto' }}>© 2024 Your App Name</p>
    </div>
  </div>
);

export default App;

import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import RouteSuggestions from './components/RouteSuggestions';
import Header from './components/Header';
import Footer from './components/Footer';
import Login from './components/Login';
import MyMap from './MyMap'; // Import the MyMap component
import WaypointInput from './components/WaypointInput'; // Import the WaypointInput component
import './index.css'; // Import Tailwind-enabled CSS file

const App = () => {
  const [startWaypoint, setStartWaypoint] = useState({ lat: null, lng: null });
  const [endWaypoint, setEndWaypoint] = useState({ lat: null, lng: null });
  const [isWaypointValid, setIsWaypointValid] = useState(false); // New state to track validity of waypoints

  // Handle changes for the start waypoint input
  const handleStartChange = (e) => {
    const { name, value } = e.target;
    setStartWaypoint((prev) => ({ ...prev, [name]: parseFloat(value) || null }));
  };

  // Handle changes for the end waypoint input
  const handleEndChange = (e) => {
    const { name, value } = e.target;
    setEndWaypoint((prev) => ({ ...prev, [name]: parseFloat(value) || null }));
  };

  // Validate if both waypoints have valid latitude and longitude
  useEffect(() => {
    const isValidWaypoint = (waypoint) =>
      waypoint.lat !== null && waypoint.lng !== null && 
      waypoint.lat >= -90 && waypoint.lat <= 90 && 
      waypoint.lng >= -180 && waypoint.lng <= 180;

    const valid = isValidWaypoint(startWaypoint) && isValidWaypoint(endWaypoint);
    setIsWaypointValid(valid);
  }, [startWaypoint, endWaypoint]);

  // Store waypoints in localStorage
  useEffect(() => {
    localStorage.setItem('startWaypoint', JSON.stringify(startWaypoint));
    localStorage.setItem('endWaypoint', JSON.stringify(endWaypoint));
  }, [startWaypoint, endWaypoint]);

  return (
    <div className="app-container">
      <Header />
      <div className="waypoint-inputs-container">
        {/* Waypoint Input components for Start and End */}
        <WaypointInput title="Input Start Waypoint" waypoint={startWaypoint} handleChange={handleStartChange} />
        <WaypointInput title="Input End Waypoint" waypoint={endWaypoint} handleChange={handleEndChange} />

        {/* Display the current waypoints */}
        <div className="waypoint-display">
          <h3>Saved Start Waypoint: {startWaypoint.lat && startWaypoint.lng ? JSON.stringify(startWaypoint) : 'Not Set'}</h3>
          <h3>Saved End Waypoint: {endWaypoint.lat && endWaypoint.lng ? JSON.stringify(endWaypoint) : 'Not Set'}</h3>
        </div>
      </div>

      {/* Render the map only if both waypoints are valid */}
      <div className="map-container">
        {isWaypointValid ? (
          <MyMap startWaypoint={startWaypoint} endWaypoint={endWaypoint} />
        ) : (
          <p className="text-center text-red-500">Please enter valid start and end waypoints to display the map.</p>
        )}
      </div>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/route-suggestions" element={<RouteSuggestions />} />
        <Route path="/login" element={<Login />} />
        <Route path="/map" element={<MyMap startWaypoint={startWaypoint} endWaypoint={endWaypoint} />} />
      </Routes>

      <Footer />
    </div>
  );
};

export default App;

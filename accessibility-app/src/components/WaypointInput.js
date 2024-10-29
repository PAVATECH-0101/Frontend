import React, { useState } from 'react';

const WaypointInput = ({ title, waypoint, handleChange }) => {
  const [errors, setErrors] = useState({ lat: '', lng: '' });

  // Validate latitude and longitude ranges
  const validateInput = (name, value) => {
    let error = '';
    if (name === 'lat') {
      if (value < -90 || value > 90) {
        error = 'Latitude must be between -90 and 90 degrees.';
      }
    } else if (name === 'lng') {
      if (value < -180 || value > 180) {
        error = 'Longitude must be between -180 and 180 degrees.';
      }
    }
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    validateInput(name, parseFloat(value)); // Validate input during change
    handleChange(e); // Call the passed handleChange function
  };

  return (
    <div className="waypoint-input my-4 p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">{title}</h2>
      
      {/* Latitude Input */}
      <div className="input-group mb-4">
        <label htmlFor="lat" className="block text-sm font-medium text-gray-700">Latitude:</label>
        <input
          type="number"
          id="lat"
          name="lat"
          placeholder="Enter Latitude"
          className={`mt-2 p-2 border ${errors.lat ? 'border-red-500' : 'border-gray-300'} rounded-md w-full focus:outline-none focus:ring-2 ${errors.lat ? 'focus:ring-red-500' : 'focus:ring-indigo-500'} focus:border-indigo-500`}
          value={waypoint.lat || ''}
          onChange={handleInputChange}
          min="-90"
          max="90"
          step="0.0001"
          required
          aria-invalid={errors.lat ? 'true' : 'false'}
          aria-describedby="lat-error"
        />
        {errors.lat && <p id="lat-error" className="text-red-500 text-sm mt-1" aria-live="polite">{errors.lat}</p>}
      </div>
      
      {/* Longitude Input */}
      <div className="input-group mb-4">
        <label htmlFor="lng" className="block text-sm font-medium text-gray-700">Longitude:</label>
        <input
          type="number"
          id="lng"
          name="lng"
          placeholder="Enter Longitude"
          className={`mt-2 p-2 border ${errors.lng ? 'border-red-500' : 'border-gray-300'} rounded-md w-full focus:outline-none focus:ring-2 ${errors.lng ? 'focus:ring-red-500' : 'focus:ring-indigo-500'} focus:border-indigo-500`}
          value={waypoint.lng || ''}
          onChange={handleInputChange}
          min="-180"
          max="180"
          step="0.0001"
          required
          aria-invalid={errors.lng ? 'true' : 'false'}
          aria-describedby="lng-error"
        />
        {errors.lng && <p id="lng-error" className="text-red-500 text-sm mt-1" aria-live="polite">{errors.lng}</p>}
      </div>
    </div>
  );
};

export default WaypointInput;

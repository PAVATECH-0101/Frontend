import axios from 'axios';

const getDirections = async (start, end) => {
  const apiKey = process.env.REACT_APP_GOOGLE_API_KEY;
  const directionsUrl = `https://maps.googleapis.com/maps/api/directions/json?origin=${start.lat},${start.lng}&destination=${end.lat},${end.lng}&key=${apiKey}`;

  try {
    const response = await axios.get(directionsUrl);
    if (response.data.status === 'OK') {
      return response.data.routes[0];
    } else {
      console.error('Error fetching directions:', response.data.error_message);
      return null;
    }
  } catch (error) {
    console.error('Error with API request:', error);
    return null;
  }
};

export default getDirections;

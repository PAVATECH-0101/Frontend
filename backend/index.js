const express = require('express');
const cors = require('cors');
const axios = require('axios');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

app.get('/api/route-suggestions', async (req, res) => {
  const { destination } = req.query;

  // Example call to Google Maps API (you'll need to add your API key)
  try {
    const googleMapsResponse = await axios.get(`https://maps.googleapis.com/maps/api/directions/json`, {
      params: {
        origin: 'Current_Location', // Replace with actual user location
        destination,
        key: 'AIzaSyAvs_B-nfUTsUhg_NDnEnawP64sTKImVkQ',
      }
    });

    // Process the response to find accessible routes
    const accessibleRoutes = googleMapsResponse.data.routes.map(route => {
      return {
        distance: route.legs[0].distance.text,
        duration: route.legs[0].duration.text,
        steps: route.legs[0].steps,
      };
    });

    res.json(accessibleRoutes);
  } catch (error) {
    res.status(500).send('Error fetching route suggestions');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

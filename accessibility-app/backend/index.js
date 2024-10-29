const express = require('express');
const cors = require('cors');
const axios = require('axios');
const bodyParser = require('body-parser');
const sql = require('mssql'); // For Azure SQL Database
const bcrypt = require('bcrypt'); // Import bcrypt for password hashing
require('dotenv').config(); // Load environment variables from .env file

const app = express();
const PORT = process.env.PORT || 5000;

// Azure SQL Database configuration
const config = {
  user: process.env.AZURE_SQL_USER, // Username from .env
  password: process.env.AZURE_SQL_PASSWORD, // Password from .env
  server: process.env.AZURE_SQL_SERVER, // Server from .env
  database: process.env.AZURE_SQL_DATABASE, // Database from .env
  options: {
    encrypt: true, // Use this if you're on Azure
    trustServerCertificate: true, // Change to true for local dev / self-signed certs
  },
};

app.use(cors());
app.use(bodyParser.json());

// Route for route suggestions
app.get('/api/route-suggestions', async (req, res) => {
  const { destination } = req.query;

  try {
    const googleMapsResponse = await axios.get(`https://maps.googleapis.com/maps/api/directions/json`, {
      params: {
        origin: 'Current_Location',
        destination,
        key: process.env.GOOGLE_MAPS_API_KEY, // Use Google Maps API key from .env
      }
    });

    const accessibleRoutes = googleMapsResponse.data.routes.map(route => ({
      distance: route.legs[0].distance.text,
      duration: route.legs[0].duration.text,
      steps: route.legs[0].steps,
    }));

    res.json(accessibleRoutes);
  } catch (error) {
    res.status(500).send('Error fetching route suggestions');
  }
});

// New Login Route
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    await sql.connect(config);
    const result = await sql.query`SELECT * FROM Users WHERE Email = ${email}`;

    if (result.recordset.length > 0) {
      const user = result.recordset[0];

      // Compare the provided password with the stored hashed password
      const isMatch = await bcrypt.compare(password, user.Password);
      if (isMatch) {
        return res.status(200).json({ message: 'Login successful!' });
      }
    }
    res.status(401).json({ message: 'Invalid credentials' });
  } catch (error) {
    res.status(500).send('Error validating credentials');
  }
});

// New Sign-Up Route
app.post('/signup', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    await sql.connect(config);

    // Check if the user already exists
    const existingUser = await sql.query`SELECT * FROM Users WHERE Email = ${email}`;
    if (existingUser.recordset.length > 0) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password before saving it to the database
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert the new user
    await sql.query`INSERT INTO Users (Username, Email, Password) VALUES (${username}, ${email}, ${hashedPassword})`;
    res.status(201).json({ message: 'Sign-up successful!' });
  } catch (error) {
    res.status(500).send('Error registering user');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

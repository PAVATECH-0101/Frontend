// server.js
const express = require('express');
const sql = require('mssql');

const app = express();
app.use(express.json());

// Endpoint to store user preferences
app.post('/api/preferences', async (req, res) => {
    const { userId, startWaypoint, endWaypoint } = req.body;

    try {
        const pool = await sql.connect('YourAzureSQLConnectionString'); // Replace with your actual connection string
        await pool.request()
            .input('UserId', sql.Int, userId)
            .input('StartWaypoint', sql.NVarChar, JSON.stringify(startWaypoint))
            .input('EndWaypoint', sql.NVarChar, JSON.stringify(endWaypoint))
            .execute('INSERT INTO UserPreferences (UserId, StartWaypoint, EndWaypoint) VALUES (@UserId, @StartWaypoint, @EndWaypoint)');
        
        res.status(200).send('Preferences saved successfully');
    } catch (err) {
        res.status(500).send('Error saving preferences: ' + err.message);
    }
});

// Endpoint to retrieve user preferences
app.get('/api/preferences/:userId', async (req, res) => {
    const { userId } = req.params;

    try {
        const pool = await sql.connect('YourAzureSQLConnectionString'); // Replace with your actual connection string
        const result = await pool.request()
            .input('UserId', sql.Int, userId)
            .query('SELECT * FROM UserPreferences WHERE UserId = @UserId');

        res.status(200).json(result.recordset[0]);
    } catch (err) {
        res.status(500).send('Error retrieving preferences: ' + err.message);
    }
});

// Start your server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const fs = require('fs');

// Load GeoJSON data
fs.readFile('data/buildings.geojson', 'utf8', (err, data) => {
    if (err) {
        console.error("Error reading GeoJSON file:", err);
        return;
    }

    try {
        const geoJsonData = JSON.parse(data);
        console.log("Parsed GeoJSON data:", geoJsonData);

        geoJsonData.features.forEach((feature) => {
            console.log("Feature:", JSON.stringify(feature, null, 2));
        });
    } catch (parseError) {
        console.error("Error parsing GeoJSON data:", parseError);
    }
});

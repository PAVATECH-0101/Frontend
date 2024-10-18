import requests
import json

# Define the Overpass API endpoint
OVERPASS_URL = "http://overpass-api.de/api/interpreter"

# Define the coordinates and radius for the query
COORDINATES = (-1.2921, 36.8219)  # Replace with desired coordinates
RADIUS = 5000  # Adjust radius as needed

# Create the Overpass query
overpass_query = f"""
[out:json];
(
  way["building"](around:{RADIUS},{COORDINATES[0]},{COORDINATES[1]});
  way["ramp"](around:{RADIUS},{COORDINATES[0]},{COORDINATES[1]});
  way["entrance"](around:{RADIUS},{COORDINATES[0]},{COORDINATES[1]});
  way["sidewalk"](around:{RADIUS},{COORDINATES[0]},{COORDINATES[1]});
  way["parking:access"](around:{RADIUS},{COORDINATES[0]},{COORDINATES[1]});
);
out body;
"""

# Make the request to the Overpass API
response = requests.post(OVERPASS_URL, data=overpass_query)

# Check if the request was successful
if response.status_code == 200:
    # Save the result to a GeoJSON file
    with open('data/accessibility_features.geojson', 'w') as geojson_file:
        json.dump(response.json(), geojson_file)
    print("Accessibility features data has been saved to data/accessibility_features.geojson")
else:
    print(f"Error fetching data: {response.status_code} - {response.text}")

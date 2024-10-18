import requests
import json
import os
import time

# Get the directory of the current script
base_path = os.path.dirname(os.path.abspath(__file__))
print(f"Base path of the script: {base_path}")

# Construct the path to the coordinates.json file
coordinates_path = os.path.join(base_path, '..', 'data', 'coordinates.json')

# Load coordinates from the JSON file
try:
    with open(coordinates_path, 'r') as coord_file:
        coordinates = json.load(coord_file)
except FileNotFoundError:
    print(f"Error: The file {coordinates_path} does not exist.")
    exit(1)  # Exit if the file doesn't exist
except json.JSONDecodeError as e:
    print(f"Error decoding JSON: {e}")
    exit(1)  # Exit if there's a JSON decoding error

# Ensure coordinates are not empty
if not coordinates:
    print("No coordinates found in the JSON file.")
    exit(1)  # Exit if there are no coordinates

# Define the Overpass API endpoint
OVERPASS_URL = "http://overpass-api.de/api/interpreter"

# Function to fetch data for each coordinate
def fetch_data_for_coordinate(coord):
    # Validate coordinate structure
    if 'lat' not in coord or 'lon' not in coord:
        print(f"Invalid coordinate structure: {coord}")
        return

    # Create the Overpass query dynamically
    overpass_query = f"""
    [out:json];
    (
      way["building"](around:5000,{coord['lat']},{coord['lon']});
      way["highway"~"footway|sidewalk"];
      way["ramp"];
    );
    out body;
    """
    
    # Make the request to the Overpass API
    try:
        response = requests.post(OVERPASS_URL, data=overpass_query, timeout=20)
        response.raise_for_status()  # Raises an error for bad responses
    except requests.RequestException as e:
        print(f"Error fetching data for {coord}: {e}")
        return  # Skip to the next coordinate on error

    # Save the result to a GeoJSON file
    filename = f"data/accessibility_{coord['lat']}_{coord['lon']}.geojson"
    with open(filename, 'w') as geojson_file:
        json.dump(response.json(), geojson_file)
    print(f"Accessibility data (buildings, sidewalks, ramps) saved to {filename}")

# Loop through each coordinate and fetch data with a delay to prevent rate-limiting
for coord in coordinates:
    fetch_data_for_coordinate(coord)
    # Adding a delay between requests to avoid hitting rate limits
    time.sleep(5)

# Load and clean the fetched GeoJSON data
def clean_geojson_data(file_path):
    # Load GeoJSON data
    with open(file_path, 'r') as file:
        geojson_data = json.load(file)

    # Validate GeoJSON Structure
    if geojson_data.get('type') != 'FeatureCollection':
        raise ValueError("Invalid GeoJSON: Top-level type must be 'FeatureCollection'")

    valid_features = []

    # Check Geometry Types and Coordinates
    for feature in geojson_data['features']:
        geom_type = feature['geometry']['type']
        # Check for valid geometry types
        if geom_type in ['Point', 'LineString', 'Polygon']:
            coordinates = feature['geometry']['coordinates']
            # Check coordinate validity
            if isinstance(coordinates[0], list):  # MultiPolygon or LineString
                if all(-180 <= coord[0] <= 180 and -90 <= coord[1] <= 90 for coord in coordinates):
                    valid_features.append(feature)
            else:  # Point or single Polygon
                if -180 <= coordinates[0] <= 180 and -90 <= coordinates[1] <= 90:
                    valid_features.append(feature)

    # Replace features in GeoJSON data with valid ones
    geojson_data['features'] = valid_features

    # Save cleaned GeoJSON
    cleaned_geojson_file_path = file_path.replace('.geojson', '_cleaned.geojson')
    with open(cleaned_geojson_file_path, 'w') as outfile:
        json.dump(geojson_data, outfile, indent=2)

    print(f"Cleaned GeoJSON data saved to {cleaned_geojson_file_path}")

# After fetching all coordinates, clean the GeoJSON files
for coord in coordinates:
    geojson_file_path = f"data/accessibility_{coord['lat']}_{coord['lon']}.geojson"
    clean_geojson_data(geojson_file_path)

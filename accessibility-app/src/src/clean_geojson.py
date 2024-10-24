import json
import os

# Path to your GeoJSON files
geojson_folder = '../data'  # Adjust path if necessary

# Function to clean GeoJSON data
def clean_geojson_data(file_path):
    """Clean GeoJSON file by removing invalid features."""
    # Load GeoJSON data
    with open(file_path, 'r') as file:
        geojson_data = json.load(file)

    # Validate GeoJSON structure
    if geojson_data.get('type') != 'FeatureCollection':
        print(f"GeoJSON content: {geojson_data}")  # Debugging: Print the structure
        raise ValueError(f"Invalid GeoJSON structure in {file_path}")

    # Extract and validate features
    valid_features = []
    for feature in geojson_data['features']:
        geometry = feature.get('geometry')
        properties = feature.get('properties')

        # Validate geometry and coordinates
        if geometry and 'coordinates' in geometry:
            coordinates = geometry['coordinates']

            # Check if the coordinates are valid (assuming Point geometry for this example)
            if isinstance(coordinates, list):
                if len(coordinates) == 2 and all(isinstance(coord, (int, float)) for coord in coordinates):
                    if -180 <= coordinates[0] <= 180 and -90 <= coordinates[1] <= 90:
                        valid_features.append(feature)

    # Create cleaned GeoJSON data
    cleaned_geojson_data = {
        "type": "FeatureCollection",
        "features": valid_features
    }

    # Save cleaned GeoJSON data
    output_file_path = os.path.join(geojson_folder, 'cleaned_' + os.path.basename(file_path))
    with open(output_file_path, 'w') as cleaned_file:
        json.dump(cleaned_geojson_data, cleaned_file, indent=2)

    print(f"Cleaned GeoJSON saved to {output_file_path}")

# Loop through all GeoJSON files in the specified folder
for filename in os.listdir(geojson_folder):
    if filename.endswith('.geojson'):
        geojson_file_path = os.path.join(geojson_folder, filename)
        try:
            clean_geojson_data(geojson_file_path)
        except ValueError as e:
            print(e)
        except Exception as e:
            print(f"An error occurred while processing {geojson_file_path}: {e}")

import json
import os

# Path to the combined dataset (JSON file)
combined_data_path = '../data/combined_dataset.json'  # Adjust path relative to this file

# Load the combined dataset
if not os.path.exists(combined_data_path):
    print(f"Error: The file {combined_data_path} does not exist.")
    exit(1)

try:
    with open(combined_data_path, 'r') as combined_file:
        combined_data = json.load(combined_file)
except json.JSONDecodeError as e:
    print(f"Error decoding JSON: {e}")
    exit(1)

# Print some basic information about the dataset
print("Total number of entries in combined dataset:", len(combined_data))
print("Sample entries:")
for entry in combined_data[:5]:  # Show the first 5 entries
    print(entry)

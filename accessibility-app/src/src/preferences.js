// preferences.js

// Function to save user waypoints to local storage
function saveWaypoints(latStart, lngStart, latEnd, lngEnd) {
    localStorage.setItem('startWaypoint', JSON.stringify({ lat: latStart, lng: lngStart }));
    localStorage.setItem('endWaypoint', JSON.stringify({ lat: latEnd, lng: lngEnd }));
}

// Event listeners for map clicks (assuming you have a Leaflet map instance)
const map = L.map('mapId').setView([-1.286389, 36.817223], 13); // Initialize map

let startLatLng;
let endLatLng;

// On map click, capture the coordinates
map.on('click', function(e) {
    if (!startLatLng) {
        // Set start waypoint
        startLatLng = e.latlng;
        L.marker(startLatLng).addTo(map).bindPopup('Start Waypoint').openPopup();
    } else if (!endLatLng) {
        // Set end waypoint
        endLatLng = e.latlng;
        L.marker(endLatLng).addTo(map).bindPopup('End Waypoint').openPopup();
        
        // Save the waypoints
        saveWaypoints(startLatLng.lat, startLatLng.lng, endLatLng.lat, endLatLng.lng);
        console.log('Waypoints saved:', { startLatLng, endLatLng });
    }
});

// Function to retrieve user waypoints from local storage
function loadWaypoints() {
    const startWaypoint = JSON.parse(localStorage.getItem('startWaypoint'));
    const endWaypoint = JSON.parse(localStorage.getItem('endWaypoint'));
    return { startWaypoint, endWaypoint };
}

// Example usage: Retrieve waypoints and log to console
const waypoints = loadWaypoints();
console.log(waypoints);

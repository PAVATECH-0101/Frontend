import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Polyline, Popup, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import geojsonData from '../data/cleaned_data.geojson'; // Adjust the path based on your folder structure
import startIconUrl from '../assets/start-icon.png'; // Path to start icon image
import endIconUrl from '../assets/end-icon.png'; // Path to end icon image

// Define custom icons for start and end points
const startIcon = new L.Icon({
    iconUrl: startIconUrl,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

const endIcon = new L.Icon({
    iconUrl: endIconUrl,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

const MyMap = ({ startWaypoint, endWaypoint }) => {
    const [mapCenter, setMapCenter] = useState([-1.286389, 36.817223]); // Default center (Nairobi)
    const route = [
        [startWaypoint.lat, startWaypoint.lng],
        [endWaypoint.lat, endWaypoint.lng],
    ].filter(point => point[0] !== null && point[1] !== null); // Filter out null waypoints

    useEffect(() => {
        if (route.length === 2) {
            // If both waypoints are valid, center the map between them
            const latCenter = (startWaypoint.lat + endWaypoint.lat) / 2;
            const lngCenter = (startWaypoint.lng + endWaypoint.lng) / 2;
            setMapCenter([latCenter, lngCenter]);
        }
    }, [startWaypoint, endWaypoint]);

    return (
        <MapContainer
            center={mapCenter}
            zoom={12}
            style={{ height: '100vh', width: '100%' }}
            className="rounded-lg shadow-md"
        >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            
            {/* Add GeoJSON data */}
            {geojsonData && <GeoJSON data={geojsonData} />}

            {/* Display markers for start and end waypoints */}
            {startWaypoint.lat && startWaypoint.lng && (
                <Marker position={[startWaypoint.lat, startWaypoint.lng]} icon={startIcon}>
                    <Popup>Start</Popup>
                </Marker>
            )}

            {endWaypoint.lat && endWaypoint.lng && (
                <Marker position={[endWaypoint.lat, endWaypoint.lng]} icon={endIcon}>
                    <Popup>End</Popup>
                </Marker>
            )}

            {/* Draw polyline if both start and end waypoints are valid */}
            {route.length === 2 && <Polyline positions={route} color="blue" />}
        </MapContainer>
    );
};

export default MyMap;

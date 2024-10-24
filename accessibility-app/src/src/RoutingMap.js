import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet-routing-machine';
import 'leaflet/dist/leaflet.css';
import geojsonData from './data/cleaned_data.geojson'; // Adjust the path accordingly

const RoutingMap = () => {
    const mapRef = useRef();
    const [waypoints, setWaypoints] = useState([
        { lat: -1.2921, lng: 36.8219 }, // Default starting point
        { lat: -1.286389, lng: 36.817223 } // Default destination point
    ]);

    useEffect(() => {
        const map = L.map(mapRef.current).setView([waypoints[0].lat, waypoints[0].lng], 12);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
        L.geoJSON(geojsonData).addTo(map);

        // Create routing control
        const control = L.Routing.control({
            waypoints: waypoints.map(point => L.latLng(point.lat, point.lng)),
            routeWhileDragging: true,
            geocoder: L.Control.Geocoder.nominatim() // Optional: For address search
        }).addTo(map);

        return () => {
            map.remove(); // Clean up on unmount
        };
    }, [waypoints]);

    const handleWaypointChange = (index, latLng) => {
        const updatedWaypoints = [...waypoints];
        updatedWaypoints[index] = latLng;
        setWaypoints(updatedWaypoints);
    };

    return (
        <div>
            <div>
                <label>
                    Start Point:
                    <input
                        type="text"
                        placeholder="Enter starting latitude,longitude"
                        onBlur={(e) => {
                            const [lat, lng] = e.target.value.split(',').map(Number);
                            handleWaypointChange(0, { lat, lng });
                        }}
                    />
                </label>
                <label>
                    End Point:
                    <input
                        type="text"
                        placeholder="Enter destination latitude,longitude"
                        onBlur={(e) => {
                            const [lat, lng] = e.target.value.split(',').map(Number);
                            handleWaypointChange(1, { lat, lng });
                        }}
                    />
                </label>
            </div>
            <div ref={mapRef} style={{ height: '100vh', width: '100%' }} />
        </div>
    );
};

export default RoutingMap;

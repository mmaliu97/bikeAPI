import React, { useState, useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { useNavigate } from 'react-router-dom';
import api from "../api";
import 'leaflet/dist/leaflet.css';
import "../styles/Home.css";

// Fix for the default marker icon issue with Webpack
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: markerIcon,
    shadowUrl: markerShadow
});
L.Marker.prototype.options.icon = DefaultIcon;

// Component to handle map centering
const SetViewOnChange = ({ coords }) => {
    const map = useMap();
    const firstRenderRef = useRef(true);

    useEffect(() => {
        if (firstRenderRef.current && coords) {
            map.setView(coords, 13); // Adjust zoom level as needed
            firstRenderRef.current = false;
        }
    }, [coords, map]);

    return null;
};

function Home({ user }) {
    const [bikestops, setBikestops] = useState([]);
    const [selectedBikestop, setSelectedBikestop] = useState(null);
    const [userCoordinates, setUserCoordinates] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        getBikestops();
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setUserCoordinates([latitude, longitude]);
                    localStorage.setItem("userLatitude", latitude);
                    localStorage.setItem("userLongitude", longitude);
                    console.log(`User's location: Latitude ${latitude}, Longitude ${longitude}`);
                },
                (error) => {
                    console.error("Error obtaining geolocation: ", error);
                }
            );
        } else {
            alert("Geolocation is not supported by this browser.");
        }
    }, []);

    useEffect(() => {
        console.log('User state:', user);
    }, [user]);

    const getBikestops = () => {
        api
            .get("/api/bikestops/")
            .then((res) => res.data)
            .then((data) => {
                setBikestops(data);
                console.log(data);
            })
            .catch((err) => alert(err));
    };

    const handleCreate = () => {
        navigate('/create');
    };

    const handleUpdate = (id) => {
        navigate(`/update/${id}`);
    };

    const handleLogout = () => {
        navigate('/logout'); // Navigate to the main page
    };

    const deleteNote = (id) => {
        api
            .delete(`/api/bikestops/delete/${id}/`)
            .then((res) => {
                if (res.status === 204) {
                    alert("Note deleted!");
                    window.location.reload();
                } else {
                    alert("Failed to delete note.");
                }
            })
            .catch((error) => alert(error));
    };

    return (
        <div>
            <h2>Bike Parking Locations</h2>
            <button className="main-button" onClick={handleCreate}>
                Create Bikestop
            </button>
            <MapContainer center={userCoordinates || [30.26666, -97.7333]} zoom={13} style={{ height: "600px", width: "100%" }}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                {userCoordinates && <SetViewOnChange coords={userCoordinates} />}
                {bikestops.map((bikestop) => (
                    <Marker
                        key={bikestop.id}
                        position={[bikestop.latitude, bikestop.longitude]}
                        eventHandlers={{
                            click: () => {
                                setSelectedBikestop(bikestop);
                            },
                        }}
                    >
                        {selectedBikestop && selectedBikestop.id === bikestop.id && (
                            <Popup
                                position={[bikestop.latitude, bikestop.longitude]}
                                onClose={() => setSelectedBikestop(null)}
                            >
                                <div>
                                    <h3>{bikestop.landmark}</h3>
                                    <p>Parking Type: {bikestop.parking_type}</p>
                                    <p>Capacity: {bikestop.capacity}</p>
                                    <p>City: {bikestop.city_name}</p>
                                    <p>Latitude: {bikestop.latitude}</p>
                                    <p>Longitude: {bikestop.longitude}</p>
                                    <p>Created by: {bikestop.author.username}</p>
                                </div>
                                { (
                                    <>
                                        {console.log('User ID:', user.id, 'Bikestop Author ID:', bikestop.author.id)}
                                        {user.id === bikestop.author.id && (
                                            <>
                                                <button className="bikestop" onClick={() => deleteNote(bikestop.id)}>
                                                    Delete
                                                </button>
                                                <button className="bikestop" onClick={() => handleUpdate(bikestop.id)}>
                                                    Update
                                                </button>
                                            </>
                                        )}
                                    </>
                                )}
                            </Popup>
                        )}
                    </Marker>
                ))}
            </MapContainer>
            <button className="logout-button" onClick={() => handleLogout()}>
                Main Page
            </button>
        </div>
    );
}

export default Home;

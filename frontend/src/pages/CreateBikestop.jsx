import React, { useState, useEffect } from "react";
import api from "../api";
import "../styles/Home.css"
import { useNavigate } from 'react-router-dom';
import bollard from '../static/img/bollard.jpg';
import decorative from '../static/img/decorative.jpg';
import garage from '../static/img/garage.jpg';
import grid from '../static/img/grid.jpg';
import hangers from '../static/img/hangers.jpg';
import locker from '../static/img/locker.jpg';

function CreateBikestop() {
    const [capacity, setCapacity] = useState("");
    const [parking_type, setParking] = useState("");
    const [landmark, setLandmark] = useState("");
    const [latitude, setLatitude] = useState("");
    const [longitude, setLongitude] = useState("");
    const [city_name, setCity] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        const storedLatitude = localStorage.getItem("userLatitude");
        const storedLongitude = localStorage.getItem("userLongitude");

        if (storedLatitude && storedLongitude) {
            setLatitude(storedLatitude);
            setLongitude(storedLongitude);
        }
    }, []);

    const handleHome = () => {
        navigate('/'); // Navigate to the main page
    };

    const createBikestops = (e) => {
        e.preventDefault();

        // Convert values
        const latitudeValue = parseFloat(latitude);
        const longitudeValue = parseFloat(longitude);
        const capacityValue = parseInt(capacity, 10);

        // Validation
        if (isNaN(latitudeValue)) {
            alert("Please enter a valid float number for latitude.");
            return;
        }

        if (isNaN(longitudeValue)) {
            alert("Please enter a valid float number for longitude.");
            return;
        }

        if (isNaN(capacityValue)) {
            alert("Please enter a valid integer number for capacity.");
            return;
        }

        api
            .post("/api/bikestops/", { capacity, parking_type, landmark, latitude, longitude, city_name })
            .then((res) => {
                if (res.status === 201) alert("Bikestop created!");
                else alert("Failed to make Bikestop.");
            })
            .catch((err) => alert(err));
    };

    return (
        <div>
            <h2 className="header-container" >Create Bike Parking</h2>
            <form onSubmit={createBikestops}>
                <label htmlFor="title">Parking Type:</label>
                <br />
                    <div className="image-grid">
                        <div className="image-item">
                        <div className="text-above-image">Bollard</div>
                            <img src={bollard} alt="Image 1" />
                        </div>
                        <div className="image-item">
                        <div className="text-above-image">Decorative</div>
                            <img src={decorative} alt="Image 2" />
                        </div>
                        <div className="image-item">
                        <div className="text-above-image">Garage</div>
                            <img src={garage} alt="Image 3" />
                        </div>
                        <div className="image-item">
                        <div className="text-above-image">Grid</div>
                            <img src={grid} alt="Image 4" />
                        </div>
                        <div className="image-item">
                        <div className="text-above-image">Hangers</div>
                            <img src={hangers} alt="Image 5" />
                        </div>
                        <div className="image-item">
                        <div className="text-above-image">Locker</div>
                            <img src={locker} alt="Image 6" />
                        </div>
                    </div>
                <select
                    id="parking_type"
                    name="parking_type"
                    value={parking_type}
                    onChange={(e) => setParking(e.target.value)}
                    required
                    className="custom-dropdown" // Apply custom CSS class

                >   
                    <option value="">Select Parking Type</option>
                    <option value="Bollard">Bollard</option>
                    <option value="Decorative">Decorative </option>
                    <option value="Garage">Garage</option>
                    <option value="Grid">Grid style racks</option>
                    <option value="Hangers">Hangers </option>
                    <option value="Locker">Locker </option>
                </select>
                <br />
                <label htmlFor="content">Capacity:</label>
                <br />
                <textarea
                    type="text"
                    id="capacity"
                    name="capacity"
                    required
                    value={capacity}
                    onChange={(e) => setCapacity(e.target.value)}
                ></textarea>
                <br />
                <label htmlFor="content">Landmark:</label>
                <br />
                <textarea
                    type="text"
                    id="landmark"
                    name="landmark"
                    required
                    value={landmark}
                    onChange={(e) => setLandmark(e.target.value)}
                ></textarea>
                <br />
                <label htmlFor="content">Latitude:</label>
                <br />
                <textarea
                    type="text"
                    id="latitude"
                    name="latitude"
                    required
                    value={latitude}
                    onChange={(e) => setLatitude(e.target.value)}
                ></textarea>
                <br />
                <label htmlFor="content">Longitude:</label>
                <br />
                <textarea
                    type="text"
                    id="longitude"
                    name="longitude"
                    required
                    value={longitude}
                    onChange={(e) => setLongitude(e.target.value)}
                ></textarea>
                <br />
                <label htmlFor="content">City Name:</label>
                <br />
                <textarea
                    type="text"
                    id="city"
                    name="city"
                    required
                    value={city_name}
                    onChange={(e) => setCity(e.target.value)}
                ></textarea>
                <br />
                
                <input type="submit" value="Submit"></input>

                
            </form>
            <button className="main-button" onClick={() => handleHome()}>
                Main Page
            </button>
        </div>
    );
}

export default CreateBikestop;

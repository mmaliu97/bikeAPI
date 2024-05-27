import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api';
import '../styles/Home.css';
import bollard from '../static/img/bollard.jpg';
import decorative from '../static/img/decorative.jpg';
import garage from '../static/img/garage.jpg';
import grid from '../static/img/grid.jpg';
import hangers from '../static/img/hangers.jpg';
import locker from '../static/img/locker.jpg';
function UpdateBikestop() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [bikestop, setBikestop] = useState(null);

    useEffect(() => {
        api.get(`/api/bikestops/${id}/`)
            .then((res) => setBikestop(res.data))
            .catch((err) => alert(err));
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Convert values
        const latitudeValue = parseFloat(bikestop.latitude);
        const longitudeValue = parseFloat(bikestop.longitude);
        const capacityValue = parseInt(bikestop.capacity, 10);

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
        api.put(`/api/bikestops/update/${id}/`, bikestop)
            .then((res) => {
                if (res.status === 200) {
                    alert("Bikestop updated successfully!");
                    navigate('/');
                } else {
                    alert("Failed to update bikestop.");
                }
            })
            .catch((err) => alert(err.message));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBikestop((prevBikestop) => ({ ...prevBikestop, [name]: value }));
    };

    if (!bikestop) return <div>Loading...</div>;

    return (
        <div>
            <h2>Update Bikestop</h2>
            <form onSubmit={handleSubmit}>

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
                value={bikestop.parking_type}
                onChange={handleChange}
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
                <label htmlFor="capacity">Capacity:</label>
                <input type="text" id="capacity" name="capacity" value={bikestop.capacity} onChange={handleChange} required />
                
                <label htmlFor="landmark">Landmark:</label>
                <input type="text" id="landmark" name="landmark" value={bikestop.landmark} onChange={handleChange} required />
                
                <label htmlFor="latitude">Latitude:</label>
                <input type="text" id="latitude" name="latitude" value={bikestop.latitude} onChange={handleChange} required />

                <label htmlFor="longitude">Longitude:</label>
                <input type="text" id="longitude" name="longitude" value={bikestop.longitude} onChange={handleChange} required />
                
                <label htmlFor="city_name">City Name:</label>
                <input type="text" id="city_name" name="city_name" value={bikestop.city_name} onChange={handleChange} required />

                <button type="submit">Update</button>
            </form>
        </div>
    );
}

export default UpdateBikestop;

import React from "react";
import { useNavigate } from 'react-router-dom';
import "../styles/Bikestop.css"

function Bikestop({ bikestop, onDelete }) {
    const formattedDate = new Date(bikestop.created_at).toLocaleDateString("en-US") // make date look nicer
    const navigate = useNavigate();

    const handleUpdate = (id) => {
        navigate(`/update/${id}`);
    };
    return (
        <div className="bikestop-container">
        <p className="bikestop-title">City: {bikestop.city_name}</p>
            <p className="bikestop-content">Capacity: {bikestop.capacity}</p>
            <p className="bikestop-content">Parking Type: {bikestop.parking_type}</p>
            <p className="bikestop-content">Landmark: {bikestop.landmark}</p>
            <p className="bikestop-content">Latitude: {bikestop.latitude}</p>
            <p className="bikestop-content">Longitude: {bikestop.longitude}</p>

            <p className="bikestop-date">{formattedDate}</p>
            <button className="delete-button" onClick={() => onDelete(bikestop.id)}>
                Delete
            </button>
            <button className="update-button" onClick={() => handleUpdate(bikestop.id)}>
                Update
            </button>
        </div>
    );
}

// function BikestopUpdate({ bikestop, onDelete }) {
//     const formattedDate = new Date(bikestop.created_at).toLocaleDateString("en-US") // make date look nicer
//     const navigate = useNavigate();

//     const handleUpdate = (id) => {
//         navigate(`/update/${id}`);
//     };
//     return (
//         <div className="bikestop-container">
//             <p className="bikestop-title">{bikestop.city_name}</p>
//             <p className="bikestop-content">{bikestop.capacity}</p>
//             <p className="bikestop-content">{bikestop.parking_type}</p>
//             <p className="bikestop-content">{bikestop.landmark}</p>
//             <p className="bikestop-content">{bikestop.latitude}</p>
//             <p className="bikestop-content">{bikestop.longitude}</p>

//             <p className="bikestop-date">{formattedDate}</p>
//             <button className="delete-button" onClick={() => onDelete(bikestop.id)}>
//                 Delete
//             </button>
//             <button className="update-button" onClick={() => handleUpdate(bikestop.id)}>
//                 Update
//             </button>
//         </div>
//     );
// }
// add in function for update
export default Bikestop ;

import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import "../styles/Form.css"
import LoadingIndicator from "./LoadingIndicator";

function Form({ route, method }) {
    
    // form works for both login and registration
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // either login or register
    const name = method === "login" ? "Login" : "Register";

    const handleSubmit = async (e) => {

        setLoading(true);
        e.preventDefault();
        
        // attempt to send a request
        try {
            const res = await api.post(route, { username, password })
            if (method === "login") {
                // get and set access and refresh token
                localStorage.setItem(ACCESS_TOKEN, res.data.access);
                localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
                navigate("/")
            } else {
                // if register, user will register then login and get the tokens
                navigate("/login")
            }
        } catch (error) {
            console.error('Error:', error.response ? error.response.data : error.message);
            if (error.response && error.response.status === 400) {
                // Check if the error message indicates that the username already exists
                if (error.response.data && error.response.data.username) {
                    alert(`Username ${error.response.data.username[0]}`);
                } else {
                    alert("An error occurred during registration.");
                }
            } else {
                alert("An error occurred. Please try again later.");
            }
        } finally {
            setLoading(false)
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit} className="form-container">
                <h1>{name}</h1>
                <input
                    className="form-input"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username"
                />
                <input
                    className="form-input"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                />
                {loading && <LoadingIndicator />}
                <button className="form-button" type="submit">
                    {name}
                </button>
                
            </form>
            
        </div>
    );
}

export default Form
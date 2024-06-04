import React, { useEffect } from "react";
import Form from "../components/Form";
import { useNavigate } from "react-router-dom";
import "../styles/Form.css";

function Login() {
    const navigate = useNavigate();

    useEffect(() => {
        document.title = "Login"; // Set the tab title to "Login"
    }, []); // Empty dependency array means this effect runs once on mount

    return (
        <div>
            <Form route="/api/token/" method="login" />
            
            <div className="centered-text">
            <p>Just browsing? Feel free to use the default user credentials </p>
            <p>Username: defaultuser </p>
            <p>Password: password</p>
            </div>

            <div className="button-container"> {/* Add button container */}
                <button onClick={() => navigate("/register")}>
                No account? Click here to register
                </button>
            </div>
                
      
        </div>
    );
}

export default Login;

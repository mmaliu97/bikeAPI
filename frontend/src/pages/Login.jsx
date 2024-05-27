import Form from "../components/Form";
import { useNavigate } from "react-router-dom";
import "../styles/Form.css";

function Login() {
    const navigate = useNavigate();

    return (
        <div>
            <Form route="/api/token/" method="login" />
            <div className="button-container"> {/* Add button container */}
                <button onClick={() => navigate("/register")}>
                    No account? Click here to register
                </button>
            </div>
        </div>
    );
}

export default Login;

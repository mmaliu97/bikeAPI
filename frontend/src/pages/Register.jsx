import React, { useEffect } from "react";
import Form from "../components/Form";

function Register() {
    useEffect(() => {
        document.title = "Register"; // Set the tab title to "Register"
    }, []); // Empty dependency array means this effect runs once on mount

    return <Form route="/api/user/register/" method="register" />;
}

export default Register;

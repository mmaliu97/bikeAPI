import Form from "../components/Form"

function Register() {
    // using the register method and register route
    return <Form route="/api/user/register/" method="register" />
}

export default Register
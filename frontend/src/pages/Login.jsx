import Form from "../components/Form"

function Login() {
    // using the login method and login route
    return <Form route="/api/token/" method="login" />
}

export default Login
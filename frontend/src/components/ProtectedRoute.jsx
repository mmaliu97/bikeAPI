import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import api from "../api";
import { REFRESH_TOKEN, ACCESS_TOKEN } from "../constants";
import React, { useState, useEffect } from "react";


function ProtectedRoute({ children }) {
    const [isAuthorized, setIsAuthorized] = useState(null);
    const [user, setUser] = useState(null);

    useEffect(() => {
        auth().catch(() => setIsAuthorized(false))
    }, [])


    // calling the tokens
    const refreshToken = async () => {
        // getting refresh token
        const refreshToken = localStorage.getItem(REFRESH_TOKEN);
        try {
            // send a request to backend, with refresh token to get new token
            const res = await api.post("/api/token/refresh/", {
                // setting token to new token
                refresh: refreshToken,
            });
            if (res.status === 200) {
                // try and get response, if successful (ie 200), set the refresh token to access token
                localStorage.setItem(ACCESS_TOKEN, res.data.access)
                setIsAuthorized(true)
                await fetchUserData(res.data.access);

            } else {
                setIsAuthorized(false)
            }
        } catch (error) {
            console.log(error);
            setIsAuthorized(false);
        }
    };


    const fetchUserData = async (token) => {
        try {
            const res = await api.get("/api/user/", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setUser(res.data);
            console.log(res.data)
        } catch (error) {
            console.log(error);
            setIsAuthorized(false);
        }
    };
    const auth = async () => {

        // check if user has access token
        const token = localStorage.getItem(ACCESS_TOKEN);
        if (!token) {
            // if no token, set authorizaiton to false
            setIsAuthorized(false);
            return;
        }

        // if token exists, get token and set expiration date
        const decoded = jwtDecode(token);
        const tokenExpiration = decoded.exp;

        // get date in seconds
        const now = Date.now() / 1000;


        // if token is expired refresh
        if (tokenExpiration < now) {
            await refreshToken();
        } else {
            // if token is not, then authorization is true
            setIsAuthorized(true);
            await fetchUserData(token);

        }
    };

    if (isAuthorized === null) {
        return <div>Loading...</div>;
    }

    // if authorized return children route, if not send user to the login
    return isAuthorized ? React.cloneElement(children, { user }) : <Navigate to="/login" />;
}

export default ProtectedRoute;
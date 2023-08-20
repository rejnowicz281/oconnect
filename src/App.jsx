import { useEffect, useState } from "react";
import { HashRouter, Navigate, Route, Routes } from "react-router-dom";
import { apiAuth, apiRefreshToken } from "../helpers/API";
import Login from "./Auth/Login";
import Register from "./Auth/Register";
import { useAuthStore } from "./store";

function App() {
    const currentUser = useAuthStore((state) => state.currentUser);
    const logout = useAuthStore((state) => state.logout);
    const token = useAuthStore((state) => state.token);
    const login = useAuthStore((state) => state.login);

    const [mounted, setMounted] = useState(false);

    // Set up axios bearer token interceptor
    useEffect(() => {
        apiAuth.interceptors.request.use(
            (config) => {
                if (token) config.headers["Authorization"] = "Bearer " + token;

                return config;
            },
            (error) => {
                Promise.reject(error);
            }
        );
    }, [token]);

    // on component mount, request new access token - if successful, log in with said token
    useEffect(() => {
        async function refreshToken() {
            const response = await apiRefreshToken();

            if (response.status === 200) await login(response.data.access_token);

            setMounted(true);
        }

        refreshToken();
    }, []);

    // on component unmount, set mounted to false
    useEffect(() => {
        return () => setMounted(false);
    }, []);

    if (!mounted) return null;

    return (
        <HashRouter>
            <Routes>
                {currentUser && token ? (
                    <Route path="/*" element={<button onClick={logout}>Logout</button>} />
                ) : (
                    <>
                        <Route path="/*" element={<Navigate to="/login" />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                    </>
                )}
            </Routes>
        </HashRouter>
    );
}

export default App;

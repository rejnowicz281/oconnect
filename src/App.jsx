import { useEffect } from "react";
import { HashRouter, Navigate, Route, Routes } from "react-router-dom";
import { apiAuth, apiRefreshToken } from "../helpers/API";
import Login from "./Auth/Login";
import PersistLogin from "./Auth/PersistLogin";
import Register from "./Auth/Register";
import Friends from "./Friends/Friends";
import Received from "./Invites/Received";
import Sent from "./Invites/Sent";
import MainLayout from "./Layout/MainLayout";
import Users from "./Users/Users";
import { useAuthStore } from "./store";

function App() {
    const currentUser = useAuthStore((state) => state.currentUser);
    const token = useAuthStore((state) => state.token);
    const login = useAuthStore((state) => state.login);

    // Set up axios interceptors
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

        apiAuth.interceptors.response.use(
            (response) => response,
            async (error) => {
                const prevRequest = error?.config;
                if (error?.response?.status === 403 && !prevRequest?.sent) {
                    prevRequest.sent = true;
                    const response = await apiRefreshToken();
                    if (response.status === 200) {
                        prevRequest.headers["Authorization"] = "Bearer " + response.data.access_token;
                        await login(response.data.access_token);
                        return apiAuth(prevRequest);
                    }
                }
                return Promise.reject(error);
            }
        );

        return () => {
            apiAuth.interceptors.request.eject();
            apiAuth.interceptors.response.eject();
        };
    }, [token]);

    return (
        <HashRouter>
            <Routes>
                {currentUser && token ? (
                    <Route element={<MainLayout />}>
                        <Route path="/*" element={<Navigate to="/friends" />} />
                        <Route path="/friends" element={<Friends />} />
                        <Route path="/users" element={<Users />} />
                        <Route path="/invites/received" element={<Received />} />
                        <Route path="/invites/sent" element={<Sent />} />
                    </Route>
                ) : (
                    <Route element={<PersistLogin />}>
                        <Route path="/*" element={<Navigate to="/login" />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                    </Route>
                )}
            </Routes>
        </HashRouter>
    );
}

export default App;

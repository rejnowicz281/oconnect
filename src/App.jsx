import { useEffect } from "react";
import { HashRouter, Navigate, Route, Routes } from "react-router-dom";
import { apiAuth, apiRefreshToken } from "../helpers/API";
import Login from "./Auth/Login";
import PersistLogin from "./Auth/PersistLogin";
import Register from "./Auth/Register";
import Chat from "./Chat/Chat";
import Friends from "./Friends/Friends";
import Received from "./Invites/Received";
import MainLayout from "./Layout/MainLayout";
import Posts from "./Posts/Posts";
import Users from "./Users/Users";
import { useAuthStore } from "./store";

function App() {
    const currentUser = useAuthStore((state) => state.currentUser);
    const token = useAuthStore((state) => state.token);
    const login = useAuthStore((state) => state.login);
    const logout = useAuthStore((state) => state.logout);

    // Set up axios interceptors
    useEffect(() => {
        const requestInterceptor = apiAuth.interceptors.request.use(
            (config) => {
                if (token) config.headers["Authorization"] = "Bearer " + token;

                return config;
            },
            (error) => {
                Promise.reject(error);
            }
        );

        const responseInterceptor = apiAuth.interceptors.response.use(
            (response) => response,
            async (error) => {
                const prevRequest = error?.config;
                if ((error?.response?.status === 403 || error?.response?.status === 401) && !prevRequest?.sent) {
                    prevRequest.sent = true;
                    const response = await apiRefreshToken();
                    if (response.status === 200) {
                        // refresh token is still valid, retry the request with the new access token
                        prevRequest.headers["Authorization"] = "Bearer " + response.data.access_token;
                        await login(response.data.access_token);
                        return apiAuth(prevRequest);
                    } else {
                        // refresh token is invalid, log out
                        logout();
                    }
                }
                return Promise.reject(error);
            }
        );

        return () => {
            apiAuth.interceptors.request.eject(requestInterceptor);
            apiAuth.interceptors.response.eject(responseInterceptor);
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
                        <Route path="/chat/:id" element={<Chat />} />
                        <Route path="/posts" element={<Posts />} />
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

import axios from "axios";
import { API_URL } from "../helpers/config";

export const api = axios.create({
    baseURL: API_URL,
    withCredentials: true,
});

// used for authentication - bearer authorization interceptor set in App.js
export const apiAuth = axios.create({
    baseURL: API_URL,
    withCredentials: true,
});

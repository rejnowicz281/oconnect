import axios from "axios";

const API_URL = "http://localhost:3000/";

export const api = axios.create({
    baseURL: API_URL,
    withCredentials: true,
});

// used for authentication - bearer authorization interceptor set in App.js
export const apiAuth = axios.create({
    baseURL: API_URL,
    withCredentials: true,
});

export async function apiLogin(email, password) {
    try {
        const response = await api.post("login", {
            email,
            password,
        });

        return response;
    } catch (error) {
        return error.response;
    }
}

export async function apiRegister(email, first_name, last_name, password, password_confirm, avatar) {
    try {
        const formData = new FormData();
        formData.append("email", email);
        formData.append("first_name", first_name);
        formData.append("last_name", last_name);
        formData.append("password", password);
        formData.append("password_confirm", password_confirm);
        formData.append("avatar", avatar);

        const response = await api.post("register", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });

        return response;
    } catch (error) {
        return error.response;
    }
}

export async function apiLogout() {
    try {
        const response = await apiAuth.post("logout");

        return response;
    } catch (error) {
        return error.response;
    }
}

export async function apiRefreshToken() {
    try {
        const response = await api.post("refresh");

        return response;
    } catch (error) {
        return error.response;
    }
}

import { apiAuth } from ".";

export async function apiFetchUsers() {
    try {
        const response = await apiAuth.get("users");

        return response;
    } catch (error) {
        return error.response;
    }
}

export async function apiFetchUser(id) {
    try {
        const response = await apiAuth.get(`users/${id}`);

        return response;
    } catch (error) {
        return error.response;
    }
}

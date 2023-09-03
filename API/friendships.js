import { apiAuth } from ".";

export async function apiFetchFriends() {
    try {
        const response = await apiAuth.get("friendships");

        return response;
    } catch (error) {
        return error.response;
    }
}

export async function apiCreateFriendship(invite_id) {
    try {
        const response = await apiAuth.post("friendships", {
            invite_id,
        });

        return response;
    } catch (error) {
        return error.response;
    }
}

export async function apiDeleteFriendship(friendship_id) {
    try {
        const response = await apiAuth.delete(`friendships/${friendship_id}`);

        return response;
    } catch (error) {
        return error.response;
    }
}

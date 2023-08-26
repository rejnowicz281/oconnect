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

export async function apiDemoLogin() {
    try {
        const response = await api.post("demo");

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

export async function apiFetchFriends() {
    try {
        const response = await apiAuth.get("friendships");

        return response;
    } catch (error) {
        return error.response;
    }
}

export async function apiCreateInvite(user_id) {
    try {
        const response = await apiAuth.post("invites", {
            invitee_id: user_id,
        });

        return response;
    } catch (error) {
        return error.response;
    }
}

export async function apiDeleteInvite(invite_id) {
    try {
        const response = await apiAuth.delete(`invites/${invite_id}`);

        return response;
    } catch (error) {
        return error.response;
    }
}

export async function apiFetchInvitesReceived() {
    try {
        const response = await apiAuth.get("invites/received");

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

export async function apiFetchChat(chat_id) {
    try {
        const response = await apiAuth.get(`chats/${chat_id}`);

        return response;
    } catch (error) {
        return error.response;
    }
}

export async function apiCreateMessage(chat_id, text) {
    try {
        const response = await apiAuth.post(`chats/${chat_id}/messages`, {
            text,
        });

        return response;
    } catch (error) {
        return error.response;
    }
}

export async function apiDeleteMessage(chat_id, message_id) {
    try {
        const response = await apiAuth.delete(`chats/${chat_id}/messages/${message_id}`);

        return response;
    } catch (error) {
        return error.response;
    }
}

export async function apiFetchPosts() {
    try {
        const response = await apiAuth.get("posts");

        return response;
    } catch (error) {
        return error.response;
    }
}

export async function apiCreatePost(text, photo) {
    try {
        const formData = new FormData();
        formData.append("text", text);
        formData.append("photo", photo);

        const response = await apiAuth.post("posts", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });

        return response;
    } catch (error) {
        return error.response;
    }
}

export async function apiLikePost(post_id) {
    try {
        const response = await apiAuth.patch(`posts/${post_id}/like`);

        return response;
    } catch (error) {
        return error.response;
    }
}

import { apiAuth } from ".";

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

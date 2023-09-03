import { apiAuth } from ".";

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

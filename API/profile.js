import { apiAuth } from ".";

export async function apiUpdateAvatar(avatar) {
    try {
        const formData = new FormData();
        formData.append("avatar", avatar);

        const response = await apiAuth.patch("avatar", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });

        return response;
    } catch (error) {
        return error.response;
    }
}

export async function apiResetAvatar() {
    try {
        const response = await apiAuth.patch("avatar/reset");

        return response;
    } catch (error) {
        return error.response;
    }
}

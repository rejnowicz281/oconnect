import { apiAuth } from ".";

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

export async function apiUpdatePost(post_id, text, photo) {
    try {
        const formData = new FormData();
        formData.append("text", text);
        formData.append("photo", photo);

        const response = await apiAuth.put(`posts/${post_id}`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });

        return response;
    } catch (error) {
        return error.response;
    }
}

export async function apiDeletePost(post_id) {
    try {
        const response = await apiAuth.delete(`posts/${post_id}`);

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

export async function apiFetchPostComments(post_id) {
    try {
        const response = await apiAuth.get(`posts/${post_id}/comments`);

        return response;
    } catch (error) {
        return error.response;
    }
}

export async function apiCreatePostComment(post_id, text) {
    try {
        const response = await apiAuth.post(`posts/${post_id}/comments`, {
            text,
        });

        return response;
    } catch (error) {
        return error.response;
    }
}

export async function apiDeletePostComment(post_id, comment_id) {
    try {
        const response = await apiAuth.delete(`posts/${post_id}/comments/${comment_id}`);

        return response;
    } catch (error) {
        return error.response;
    }
}

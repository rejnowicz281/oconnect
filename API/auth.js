import { api, apiAuth } from ".";

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

export async function apiFacebookLogin(access_token) {
    try {
        const response = await api.post("facebook", {
            access_token,
        });

        return response;
    } catch (error) {
        return error.response;
    }
}

export async function apiGithubLogin(access_token) {
    try {
        const response = await api.post("github/login?access_token=" + access_token);

        return response;
    } catch (error) {
        return error.response;
    }
}

export async function apiGetGithubToken(code) {
    try {
        const response = await api.post("github/token", {
            code,
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

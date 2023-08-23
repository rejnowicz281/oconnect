import jwt_decode from "jwt-decode";
import { create } from "zustand";
import { apiLogout } from "../helpers/API";

export const useAuthStore = create((set) => ({
    token: null,

    currentUser: null,

    login: async (token) => {
        const decodedToken = await jwt_decode(token);

        const currentUser = {
            _id: decodedToken.sub,
            first_name: decodedToken.first_name,
            last_name: decodedToken.last_name,
            avatar: decodedToken.avatar,
        };

        set({ token, currentUser });
    },

    logout: async () => {
        await apiLogout();
        set({ token: null, currentUser: null });
    },
}));

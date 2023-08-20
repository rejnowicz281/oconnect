import jwt_decode from "jwt-decode";
import { create } from "zustand";
import { apiLogout } from "../helpers/API";

export const useAuthStore = create((set) => ({
    token: null,

    currentUser: null,

    login: async (token) => {
        const decodedUser = await jwt_decode(token);

        set({ token, currentUser: decodedUser });
    },

    logout: async () => {
        await apiLogout();
        set({ token: null, currentUser: null });
    },
}));

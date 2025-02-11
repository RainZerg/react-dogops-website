import {create} from 'zustand';
import {persist} from 'zustand/middleware';

type AuthState = {
    token: string | null;
    setToken: (token: string | null) => void;
    clearToken: () => void;
};

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            token: null,
            profilePicture: null,
            setToken: (token) => set({token}),
            clearToken: () => set({token: null, profilePicture: null}),
            setProfilePicture: (url) => set({profilePicture: url}),
        }),
        {
            name: 'auth-storage',
        }
    )
);

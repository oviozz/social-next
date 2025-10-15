'use client';

import { create } from 'zustand';
import type { UserResponseType } from '@/schemas/user';

export type StateType = 'idle' | 'loading' | 'completed' | 'failed';
type AuthStoreType = {
    user: UserResponseType | null;
    isAuth: boolean;
    state: StateType;
    profileExists: boolean | null;
    count: number;

    setUser: (user: UserResponseType) => void;
    setState: (state: StateType) => void;
    setProfileExists: (state: boolean) => void;
    refreshUser: () => void;
};

export const useAuth = create<AuthStoreType>((set) => ({
    user: null,
    isAuth: false,
    state: 'idle',
    profileExists: null,
    count: 0,

    setUser: (user: UserResponseType) => set({ user, isAuth: true }),
    setState: (state: StateType) => set({ state }),
    setProfileExists: (state: boolean) => set({ profileExists: state }),
    refreshUser: () => set((state) => ({ count: state.count + 1 })),
}));

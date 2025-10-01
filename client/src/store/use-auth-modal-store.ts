"use client";
import { create } from 'zustand'

export type AuthFormType = "SIGN_IN" | "SIGN_UP";

type AuthModalType = {
    open: boolean,
    form_type: AuthFormType;
    openAuthModal: (type: AuthFormType) => void;
    closeAuthModal: () => void;
}

export const useAuthModalStore = create<AuthModalType>((set) => ({
    open: false,
    form_type: "SIGN_IN",

    openAuthModal: (form_type: AuthFormType) => set({ open: true, form_type }),
    closeAuthModal: () => set({ open: false })
}));
'use client';

import React, { useEffect } from 'react';
import { useAuth } from '@/store/use-auth';
import { api } from '@/lib/server/api';
import ProfileDialog from '@/components/profile/profile-dialog';

type AuthProviderProps = {
    children: React.ReactNode;
};

export default function AuthProvider({ children }: AuthProviderProps) {
    const { setUser, setState, setProfileExists, count } = useAuth();

    useEffect(() => {
        let cancelled = false;

        const fetchUser = async () => {
            setState('loading');
            try {
                const result = await api.user.getUser();
                if (cancelled) return;

                if (result?.user) {
                    setUser(result.user);
                    setProfileExists(result.profileExists);

                    return;
                }
            } catch (error) {
                setState('failed');
                return;
            } finally {
                setState('completed');
            }
        };

        fetchUser();

        return () => {
            cancelled = true;
        };
    }, [count]);

    return (
        <>
            {children}
            <ProfileDialog />
        </>
    );
}

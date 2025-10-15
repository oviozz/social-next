'use server';

import { cookies } from 'next/headers';
import { cache } from 'react';

export const getAuthCookieToken = cache(async (): Promise<string | null> => {
    const authPayload = await cookies();
    const userToken = authPayload.get('auth-token')?.value;

    if (!userToken) {
        return null;
    }

    return `auth-token=${userToken}`;
});

export const isAuth = async () => {
    const token = await getAuthCookieToken();
    return !!token;
};

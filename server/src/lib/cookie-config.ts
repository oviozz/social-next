import type { Context } from 'hono';
import { deleteCookie, getCookie, setCookie } from 'hono/cookie';
import { env } from '../config/env.ts';
import { sign, verify } from 'hono/jwt';
import type { UserType } from '../schemas/user-schema.ts';

export type AuthCookieType = {
    userID: string;
    email: string;
    exp: number;
};

export const setAuthCookie = async (c: Context, user: UserType) => {
    const token = await sign(
        {
            userID: user._id,
            email: user.email,
            exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7,
        } as AuthCookieType,
        env.JWT_SECRET,
    );

    setCookie(c, 'auth-token', token, {
        httpOnly: true,
        secure: env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7,
        path: '/',
    });
};

export const verifyAuthCookie = async (c: Context): Promise<AuthCookieType | null> => {
    const token = getCookie(c, 'auth-token');

    if (!token) {
        return null;
    }

    return (await verify(token, env.JWT_SECRET)) as AuthCookieType;
};

export const deleteAuthCookie = (c: Context) => {
    return deleteCookie(c, 'auth-token', {
        path: '/',
        secure: true,
        sameSite: 'strict',
    });
};

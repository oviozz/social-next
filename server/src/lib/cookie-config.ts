import {Context} from "hono";
import {deleteCookie, getCookie, setCookie} from "hono/cookie";
import {env} from "../config/env.ts";
import {sign} from "hono/jwt";
import {UserType} from "../schemas/user-schema.ts";

export const setAuthCookie = async (c: Context, user: UserType) => {
    const token = await sign(
        {
            userID: user._id,
            email: user.email,
            exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 7),
        },
        env.JWT_SECRET
    );

    setCookie(c, "auth-token", token, {
        httpOnly: true,
        secure: env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 60 * 60 * 24 * 7,
        path: "/"
    });
}

export const getAuthCookie = (c: Context) => {
    return getCookie(c);
}

export const deleteAuthCookie = (c: Context) => {
    return deleteCookie(c, "auth-token", {
        path: "/",
        secure: true,
        sameSite: "strict"
    });
}
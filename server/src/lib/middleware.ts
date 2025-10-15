import { ZodError, type ZodType } from 'zod';
import type { Context, Next, MiddlewareHandler } from 'hono';
import { HTTP_STATUS } from '../config/http-status.ts';
import { verifyAuthCookie } from './cookie-config.ts';

export function createValidatorSchema<T extends ZodType>(schema: T): MiddlewareHandler {
    return async function validate(c: Context, next: Next) {
        try {
            const body = await c.req.json();
            const { success, error } = schema.safeParse(body);

            if (!success) {
                const msg = error?.issues[0]?.message;
                return c.json({ success: false, message: msg }, HTTP_STATUS.BadRequest);
            }

            return await next();
        } catch (error) {
            console.log(error);
            if (error instanceof ZodError) {
                const msg = error.message;
                return c.json({ success: false, message: msg }, HTTP_STATUS.BadRequest);
            }

            return c.json(
                { success: false, message: 'Something went wrong' },
                HTTP_STATUS.InternalServerError,
            );
        }
    };
}

export const checkAuth: MiddlewareHandler = async (c: Context, next: Next) => {
    try {
        const payload = await verifyAuthCookie(c);

        if (!payload?.userID) {
            return c.json({ success: false, message: 'Unauthorized' }, HTTP_STATUS.Unauthorized);
        }

        c.set('user', payload);

        return await next();
    } catch (error) {
        const msg = error instanceof Error ? error.message : 'Something went wrong';
        return c.json({ success: false, message: msg }, HTTP_STATUS.InternalServerError);
    }
};

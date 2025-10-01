import {ZodError, type ZodType} from "zod";
import type {Context, Next, MiddlewareHandler} from "hono";

export function createValidatorSchema<T extends ZodType>(schema: T): MiddlewareHandler {
    return async function validate(c: Context, next: Next) {
        try {
            const body = await c.req.json();
            const {
                success,
                error,
            } = schema.safeParse(body);

            if (!success) {
                const msg = error?.issues[0]?.message;
                return c.json({ success: false, message: msg }, 400);
            }

            return next();
        } catch (error) {
            console.log(error);
            if (error instanceof ZodError) {
                const msg = error.message;
                return c.json({ success: false, message: msg }, 400);
            }

            return c.json({ success: false, message: "Something went wrong" }, 500);
        }
    }
}
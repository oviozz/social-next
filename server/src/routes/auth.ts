import { Hono } from 'hono';
import { createValidatorSchema } from '../lib/middleware.ts';
import { User } from '../models/user.ts';
import {
    signupSchema,
    loginSchema,
    type SignupType,
    type LoginType,
} from '../schemas/auth-schema.ts';
import { HTTP_STATUS } from '../config/http-status.ts';
import { userSchema, type UserType } from '../schemas/user-schema.ts';
import bcrypt from 'bcrypt';
import { setAuthCookie } from '../lib/cookie-config.ts';

const authRoutes = new Hono();

authRoutes.post(
    '/check-username',
    createValidatorSchema(userSchema.pick({ username: true })),
    async (c) => {
        try {
            const body: { username: string } = await c.req.json();

            const findUser = await User.exists({
                username: body.username,
            });

            if (findUser) {
                return c.json({ success: false, message: 'Username is taken' }, HTTP_STATUS.OK);
            }

            return c.json({ success: true, message: 'Username is valid' }, HTTP_STATUS.OK);
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Something went wrong!';
            return c.json({ success: false, message }, HTTP_STATUS.BadRequest);
        }
    },
);

authRoutes.post('/signup', createValidatorSchema(signupSchema), async (c) => {
    try {
        const { confirmPassword, ...user }: SignupType = await c.req.json();

        const findUser = await User.exists({ username: user.username });

        if (findUser) {
            return c.json({ success: false, message: 'Username is taken' }, HTTP_STATUS.Conflict);
        }

        const hashPassword = await bcrypt.hash(user.password, 10);

        const newUser = new User({
            ...user,
            password: hashPassword,
        });

        const savedUser = (await newUser.save()) as unknown as UserType;

        await setAuthCookie(c, savedUser);

        return c.json({ success: true, user: newUser }, HTTP_STATUS.OK);
    } catch (error) {
        return c.json({ success: false, message: 'Something went wrong' }, HTTP_STATUS.BadGateway);
    }
});

authRoutes.post('/login', createValidatorSchema(loginSchema), async (c) => {
    try {
        const body: LoginType = await c.req.json();

        const user = await User.findOne({ username: body.username })
            .select({ _id: 1, email: 1, password: 1 })
            .lean();

        if (!user?._id) {
            return c.json({ success: false, message: 'User not found' }, HTTP_STATUS.NotFound);
        }

        const comparePassword = await bcrypt.compare(body.password, user.password);

        if (!comparePassword) {
            return c.json({ success: false, message: 'Invalid Password' }, HTTP_STATUS.Forbidden);
        }

        await setAuthCookie(c, user as unknown as UserType);

        return c.json({ success: true, message: 'Logged in successfully' });
    } catch (error) {
        const msg = error instanceof Error ? error.message : 'Something went wrong';
        return c.json({ success: false, message: msg }, HTTP_STATUS.BadGateway);
    }
});

export default authRoutes;

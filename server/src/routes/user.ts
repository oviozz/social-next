import { Hono } from 'hono';
import { User } from '../models/user.ts';
import { HTTP_STATUS } from '../config/http-status.ts';
import { checkAuth } from '../lib/middleware.ts';
import { Profile } from '../models/profile.ts';

const userRoutes = new Hono();

userRoutes.get('/me', checkAuth, async (c) => {
    const authPayload = c.get('user');

    if (!authPayload) {
        return c.json({ success: false, message: 'Unauthorized' }, HTTP_STATUS.Unauthorized);
    }

    const user = await User.findOne({ _id: authPayload.userID })
        .select({
            __v: 0,
            password: 0,
        })
        .lean();

    if (!user) {
        return c.json({ success: false, user: null }, HTTP_STATUS.NotFound);
    }

    const profile = await Profile.exists({ userID: user._id });

    const { _id, ...userData } = user;

    return c.json(
        {
            success: true,
            user: userData,
            profileExists: !!profile?._id,
        },
        HTTP_STATUS.OK,
    );
});

export default userRoutes;

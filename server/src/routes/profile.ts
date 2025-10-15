import { Hono } from 'hono';
import { checkAuth, createValidatorSchema } from '../lib/middleware.ts';
import { Profile } from '../models/profile.ts';
import { HTTP_STATUS } from '../config/http-status.ts';
import { createProfileSchema } from '../schemas/profile-schema.ts';
import { User } from '../models/user.ts';
import mongoose from 'mongoose';

const profileRoutes = new Hono();

const getUserProfile = async (userID: string) => {
    const [userData, profileData] = await Promise.all([
        User.findOne({ _id: userID }).select({ _id: 0, password: 0 }).lean(),
        Profile.findOne({ userID: userID }).select({ userID: 0 }).lean(),
    ]);
    return { userData, profileData };
};

profileRoutes.get('/', checkAuth, async (c) => {
    const user = c.get('user');

    if (!user?.userID) {
        return c.json({ success: false, message: 'Unauthorized' }, HTTP_STATUS.Unauthorized);
    }

    const { userData, profileData } = await getUserProfile(user.userID);

    return c.json(
        {
            success: true,
            user: userData,
            profile: profileData,
        },
        HTTP_STATUS.OK,
    );
});

profileRoutes.get('/:userID', async (c) => {
    const userID = c.req.param('userID');

    if (!userID || !mongoose.isValidObjectId(userID)) {
        return c.json({ success: false, user: null, profile: null }, HTTP_STATUS.OK);
    }

    const { userData, profileData } = await getUserProfile(userID);

    console.log(userData, profileData);

    return c.json(
        {
            success: true,
            user: userData,
            profile: profileData,
        },
        HTTP_STATUS.OK,
    );
});

profileRoutes.post('/', checkAuth, createValidatorSchema(createProfileSchema), async (c) => {
    const user = c.get('user');
    const body = await c.req.json();

    if (!user) {
        return c.json({ success: false, message: 'Unauthorized' }, HTTP_STATUS.Unauthorized);
    }

    const hasProfile = await Profile.exists({ userID: user.userID });

    if (hasProfile?._id) {
        return c.json({ success: false, message: 'Profile already created' }, HTTP_STATUS.Conflict);
    }

    const new_profile = new Profile({ ...body, userID: user.userID });
    await new_profile.save();

    return c.json({ success: true, message: 'Profile created successfully' }, HTTP_STATUS.Created);
});

export default profileRoutes;

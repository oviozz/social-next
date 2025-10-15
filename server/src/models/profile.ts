import mongoose from 'mongoose';
import type { InferSchemaType, Model } from 'mongoose';

const { Schema } = mongoose;

const profileSchema = new Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        index: true,
    },
    bio: {
        type: String,
        minLength: [10, 'write more about yourself'],
    },
    gender: {
        type: String,
        enum: ['male', 'female', "I don't know"],
        required: true,
    },
    avatarUrl: {
        type: String,
        required: false,
    },
    bannerUrl: {
        type: String,
        required: false,
    },
});

type ProfileDoc = InferSchemaType<typeof profileSchema>;

export const Profile: Model<ProfileDoc> =
    mongoose.models.Profile || mongoose.model<ProfileDoc>('profile', profileSchema);

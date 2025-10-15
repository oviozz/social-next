import mongoose from "mongoose";
import type { InferSchemaType, Model } from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema(
    {
        username: { type: String, required: true, unique: true, index: true, trim: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
    },
    { timestamps: true }
);

type UserDoc = InferSchemaType<typeof userSchema>;

export const User: Model<UserDoc> =
    mongoose.models.User || mongoose.model<UserDoc>("User", userSchema);

import mongoose from 'mongoose';
import type { Model, InferSchemaType } from 'mongoose';

const { Schema } = mongoose;

const postSchema = new Schema(
    {
        userID: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
            index: true,
        },
        type: {
            type: 'String',
            enum: ['text', 'image', 'audio'],
            required: true,
            index: true,
        },
        content: {
            type: String,
            required: true,
            minLength: [10, 'Min text value is 10 characters'],
        },
        status: {
            type: String,
            enum: ['draft', 'published'],
            default: 'published',
            index: true,
        },
    },
    { timestamps: true },
);

postSchema.index({ status: 1, type: 1, createdAt: -1 });

type PostDoc = InferSchemaType<typeof postSchema>;

export const Post: Model<PostDoc> =
    mongoose.models.Post || mongoose.model<PostDoc>('Post', postSchema);

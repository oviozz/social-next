import mongoose from 'mongoose';
import type { Model, InferSchemaType } from 'mongoose';

const { Schema } = mongoose;

const postMediaSchema = new Schema(
    {
        postID: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Post',
            required: true,
            index: true,
        },
        mediaType: {
            type: String,
            enum: ['image', 'audio'],
            required: true,
        },
        fileName: {
            type: String,
            required: true,
        },
        fileSize: Number,
        fileUrl: {
            type: String,
            required: true,
        },
        duration: {
            type: Number,
            required: false,
        },
    },
    { timestamps: true },
);

type PostMediaDoc = InferSchemaType<typeof postMediaSchema>;

export const PostMedia: Model<PostMediaDoc> =
    mongoose.models.PostMedia || mongoose.model('PostMedia', postMediaSchema, 'post-medias');

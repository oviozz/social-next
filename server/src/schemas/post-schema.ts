import { z } from 'zod';

export const postSchema = z.object({
    _id: z.string().optional(),
    userID: z.string().min(5, 'userID is required'),
    type: z.enum(['text', 'image', 'audio']),
    content: z.string().min(5, 'text is too short'),
    status: z.enum(['draft', 'published']),
    createdAt: z.string().optional(),
    updatedAt: z.string().optional(),
});

export const postMediaSchema = z.object({
    postID: z.string().min(1, 'postID is required'),
    mediaType: z.enum(['image', 'audio']),
    fileName: z.string().min(1, 'fileName is required'),
    fileSize: z.number().min(1),
    fileUrl: z.url().min(1),
    duration: z.number().optional(),
    createdAt: z.string().optional(),
    updatedAt: z.string().optional(),
});

export const createPostSchema = z.object({
    post: postSchema.omit({ userID: true }),
    medias: z.array(postMediaSchema.omit({ postID: true })),
});

export type PostType = z.infer<typeof postSchema>;
export type PostMediaType = z.infer<typeof postMediaSchema>;

// Create Post
export type CreatePostType = z.infer<typeof createPostSchema>;

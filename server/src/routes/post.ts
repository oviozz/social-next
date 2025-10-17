import { Hono } from 'hono';
import mongoose from 'mongoose';
import type { Document } from 'mongoose';
import { Post } from '../models/post/post.ts';
import { PostMedia } from '../models/post/post-media.ts';
import { checkAuth, createValidatorSchema } from '../lib/middleware.ts';
import type { CreatePostType } from '../schemas/post-schema.ts';
import { createPostSchema } from '../schemas/post-schema.ts';
import { HTTP_STATUS } from '../config/http-status.ts';

const postRoutes = new Hono();

const getPosts = async (query: any, limitNumber?: number) => {
    return await Post.aggregate([
        { $match: query },
        { $sort: { createdAt: -1 } }, // newest -> older,
        ...(limitNumber ? [{ $limit: limitNumber }] : []),
        {
            $lookup: {
                from: 'post-medias',
                localField: '_id', // from here
                foreignField: 'postID', // post-media what to look,
                as: 'medias',
            },
        },
        {
            $project: {
                _id: 1,
                type: 1,
                content: 1,
                createdAt: 1,
                updatedAt: 1,
                medias: {
                    $map: {
                        input: '$medias',
                        as: 'm',
                        in: {
                            fileUrl: '$$m.fileUrl',
                            fileName: '$$m.fileName',
                            mediaType: '$$m.mediaType',
                            duration: '$$m.duration',
                        },
                    },
                },
            },
        },
    ]);
};

type GetPostsType = { type?: string; cursor?: string; limit?: string };
postRoutes.get('/', async (c) => {
    const { type, cursor, limit = '10' } = c.req.query() as GetPostsType;
    const limitNumber = parseInt(limit, 10);

    const query: any = { status: 'published' };
    if (type) query.type = type;
    if (cursor) query.createdAt = { $lt: new Date(cursor) }; // getting the last post createdAt to old post than that date

    const posts = await getPosts(query, limitNumber);

    const nextCursor = posts.length > 0 ? posts[posts.length - 1].createdAt : null;

    return c.json({ success: true, nextCursor, posts }, HTTP_STATUS.OK);
});

postRoutes.get('/:userID', checkAuth, async (c) => {
    const user = c.get('user');

    if (!user) {
        return c.json({ success: false, message: 'Unauthorized' }, HTTP_STATUS.Unauthorized);
    }

    const posts = await getPosts({ userID: user.userID });

    return c.json({ success: true, posts }, HTTP_STATUS.OK);
});

postRoutes.post('/', checkAuth, createValidatorSchema(createPostSchema), async (c) => {
    const user = c.get('user');
    const body = (await c.req.json()) as CreatePostType;
    const session = await mongoose.startSession();
    let result;

    try {
        if (!user?.userID) {
            return c.json({ success: false, message: 'Unauthorized' }, HTTP_STATUS.Unauthorized);
        }

        await session.withTransaction(async () => {
            const new_post = new Post({ ...body.post, userID: user.userID });
            const save_post = await new_post.save({ session });

            if (!save_post?._id) {
                throw new Error('Post not saved successfully');
            }

            let postMediaPromiseResult: Document[] = [];

            if (body.medias && body.medias.length > 0) {
                postMediaPromiseResult = await Promise.all(
                    body.medias.map((media) => {
                        const new_media = new PostMedia({ ...media, postID: save_post._id });
                        return new_media.save({ session });
                    }),
                );
            }

            result = {
                success: true,
                message: 'Post created successfully',
                post: {
                    ...save_post.toObject(),
                    ...(postMediaPromiseResult.length > 0 && {
                        media: postMediaPromiseResult.map((m) => m.toObject()),
                    }),
                },
            };
        });

        return c.json(result, HTTP_STATUS.OK);
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Something went wrong';
        console.error('Transaction failed:', message);
        return c.json({ success: false, message });
    } finally {
        await session.endSession();
    }
});

export default postRoutes;

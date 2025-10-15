import { Hono } from 'hono';
import { serve } from '@hono/node-server';
import { logger } from 'hono/logger';
import { cors } from 'hono/cors';
import { dbConnect } from './lib/db-connect.ts';
import { env } from './config/env.ts';
import { HTTP_STATUS } from './config/http-status.ts';
import type { AuthCookieType } from './lib/cookie-config.ts';

import userRoutes from './routes/user.ts';
import authRoutes from './routes/auth.ts';
import postRoutes from './routes/post.ts';
import profileRoutes from './routes/profile.ts';

declare module 'hono' {
    interface ContextVariableMap {
        user?: AuthCookieType;
    }
}

const app = new Hono();
app.use(logger());
app.use(
    '*',
    cors({
        origin: env.FRONTEND_URL,
        allowHeaders: ['Set-Cookie', 'Content-Type'],
        exposeHeaders: ['Set-Cookie'],
        credentials: true,
    }),
);

app.onError((error, c) => {
    console.log('Error', error);
    const message = error.message ?? 'Something went wrong';
    return c.json({ success: false, message }, HTTP_STATUS.BadRequest);
});

app.get('/', (c) => {
    return c.json({ message: 'Welcome to social next' });
});

app.get('/health', (c) => {
    return c.json({ success: true });
});

// Routes
app.route('/user', userRoutes);
app.route('/profile', profileRoutes);
app.route('/auth', authRoutes);
app.route('/post', postRoutes);

dbConnect().then(() => {
    console.info(`Server running on http://localhost:${env.PORT}`);
    serve({
        fetch: app.fetch,
        port: Number(env.PORT),
    });
});

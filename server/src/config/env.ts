import 'dotenv/config';
import { z } from 'zod';

const envSchema = z.object({
    DB_URL: z.string().min(1, 'DB_URL is required'),
    PORT: z.string().default('4000'),
    JWT_SECRET: z.string().min(1, 'JWT_SECRET is required'),
    NODE_ENV: z.string().min(1, 'NODE_ENV is required'),
    FRONTEND_URL: z.string().min(1, 'FRONTEND_URL is required'),
});

export const env = envSchema.parse(process.env);

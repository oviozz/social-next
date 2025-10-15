import { z } from 'zod';

const envSchema = z.object({
    NEXT_PUBLIC_BACKEND_URL: z.string().min(1).default('http://localhost:4000'),
});

export const env = envSchema.parse(process.env);

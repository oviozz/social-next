import { z } from 'zod';
import { baseUserSchema } from '@/schemas/auth';

export const userSchema = baseUserSchema.extend({
    _id: z.string().optional(),
    username: z
        .string()
        .min(3, { message: 'Username must be at least 3 characters long.' })
        .max(30, { message: 'Username must be 30 characters or less.' }),
    email: z.email({ message: 'Invalid email address.' }),
    createdAt: z.string().optional(),
    updatedAt: z.string().optional(),
});

const userResponseSchema = userSchema.omit({ _id: true, password: true });

export type UserType = z.infer<typeof userSchema>;
export type UserResponseType = z.infer<typeof userResponseSchema>;

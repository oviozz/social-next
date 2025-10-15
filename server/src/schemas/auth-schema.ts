import { userSchema, type UserType } from './user-schema.ts';
import { z } from 'zod';

// Signing up schema
export const signupSchema = userSchema
    .pick({
        username: true,
        email: true,
        password: true,
    })
    .extend({
        confirmPassword: z.string(),
    })
    .refine(
        (data: UserType & { confirmPassword: string }) => {
            return data.password === data.confirmPassword;
        },
        { error: "Password doesn't match", path: ['password'] },
    );

export type SignupType = z.infer<typeof signupSchema>;

// Login Schema
export const loginSchema = userSchema.pick({
    username: true,
    password: true,
});

export type LoginType = z.infer<typeof loginSchema>;

import { z } from 'zod';

export const profileSchema = z.object({
    userID: z.string().optional(),
    bio: z
        .string()
        .min(10, 'Write more about yourself')
        .max(100, 'This is too long. Please make it shorter'),
    gender: z.enum(['male', 'female', 'idk']).nullable(),
    avatarUrl: z.url(),
    bannerUrl: z.url().optional(),
});

export const createProfileSchema = profileSchema
    .omit({
        userID: true,
        avatarUrl: true,
        bannerUrl: true,
    })
    .superRefine((data, ctx) => {
        if (!data.gender) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                path: ['gender'],
                message: 'Please select your gender',
            });
        }
    });

export type ProfileType = z.infer<typeof profileSchema>;
export type CreateProfileType = z.infer<typeof createProfileSchema>;

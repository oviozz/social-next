import { z } from 'zod';

export const profileSchema = z.object({
    userID: z.string().optional(),
    bio: z.string().min(10, 'Write more about yourself'),
    gender: z.enum(['male', 'female', 'idk']),
    avatarUrl: z.url().optional(),
    bannerUrl: z.url().optional(),
});

export const createProfileSchema = profileSchema.omit({ userID: true });

export type ProfileType = z.infer<typeof profileSchema>;
export type CreateProfileType = z.infer<typeof createProfileSchema>;

import { env } from '@/constants/env';
import { UserResponseType, UserType } from '@/schemas/user';
import { cache } from 'react';
import fetchClient from '@/lib/server/fetch-client';

export const userServices = {
    getUser: cache(
        async (): Promise<{ user: UserResponseType | null; profileExists: boolean } | null> => {
            try {
                const result = await fetchClient<{
                    success: boolean;
                    user: UserType | null;
                    profileExists: boolean;
                }>('/user/me');

                if (!result?.success) {
                    return null;
                }

                return { user: result.user, profileExists: result.profileExists };
            } catch (error) {
                console.log('getUser-error', error);
                return null;
            }
        },
    ),
};

import { CreateProfileType, ProfileType } from '@/schemas/profile';
import fetchClient from '@/lib/server/fetch-client';
import { UserType } from '@/schemas/user';

export const profileServices = {
    getProfile: async (userID?: string) => {
        try {
            const response = await fetchClient<{
                success: boolean;
                user: UserType;
                profile: ProfileType;
            }>(!!userID ? `/profile/${userID}` : '/profile');

            return { user: response?.user ?? {}, profile: response?.profile ?? {} };
        } catch (error) {
            console.log('GET_PROFILE_ERROR', error);
            throw error;
        }
    },

    createProfile: async (profile: CreateProfileType) => {
        try {
            const response = await fetchClient<{ success: boolean; message: string }>('/profile', {
                method: 'POST',
                body: JSON.stringify(profile),
            });

            return response;
        } catch (error) {
            console.log('CREATE_PROFILE_SERVICES', error);
            throw error;
        }
    },
};

import fetchClient from '@/lib/server/fetch-client';

export const postServices = {
    getUserPosts: async () => {
        try {
            const response = await fetchClient('/post');
        } catch (error) {
            console.log('GET_USER_POST_ERROR', error);
            throw error;
        }
    },
};

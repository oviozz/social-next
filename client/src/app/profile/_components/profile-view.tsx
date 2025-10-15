import { api } from '@/lib/server/api';
import ProfileHeader from '@/app/profile/_components/profile-header';
import getQueryClient from '@/lib/get-query-client';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

export default async function ProfileView({ userID }: { userID?: string }) {
    const queryClient = getQueryClient();

    await queryClient.prefetchQuery({
        queryKey: userID ? ['profile', userID] : ['profile'],
        queryFn: async () => {
            return api.profile.getProfile(userID);
        },
    });

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <ProfileHeader userID={userID} />
        </HydrationBoundary>
    );
}

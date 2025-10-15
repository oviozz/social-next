'use client';
import { Button } from '@/components/ui/button';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/server/api';
import PageLoader from '@/components/page-loader';
import { notFound, useRouter } from 'next/navigation';

export default function ProfileHeader({ userID }: { userID?: string }) {
    const router = useRouter();
    const { data, isPending, isError } = useQuery({
        queryKey: userID ? ['profile', userID] : ['profile'],
        queryFn: async () => {
            return await api.profile.getProfile(userID);
        },
    });

    if (isPending) {
        return <PageLoader />;
    }

    if (isError) {
        return <span>Error</span>;
    }

    const { user, profile } = data;

    if (!userID && !user) {
        router.push('/');
        return;
    }

    if (userID && Object.keys(user).length === 0) {
        notFound();
    }

    return (
        <div className={'flex flex-col gap-7 sm:gap-4'}>
            <div className="relative w-full h-52 bg-green-700 rounded-xl">
                <div className="absolute -bottom-14 left-1/2 -translate-x-1/2">
                    <div className="bg-green-800 rounded-full w-24 h-24 border-4 border-white" />
                </div>

                <Button
                    variant={'outline'}
                    className={'w-fit px-4 absolute bottom-2 right-2'}
                    size={'sm'}
                >
                    Follow
                </Button>
            </div>

            <div className="flex flex-col">
                <p className="font-semibold text-base sm:text-xl text-gray-900">{user.username}</p>
                {profile?.bio ? (
                    <span className="text-sm text-gray-600 max-w-md">{profile.bio}</span>
                ) : (
                    <span>No bio yet :(</span>
                )}
            </div>
        </div>
    );
}

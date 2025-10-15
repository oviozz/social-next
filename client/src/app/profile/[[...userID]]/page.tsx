import { Suspense } from 'react';
import ProfileView from '@/app/profile/_components/profile-view';
import PageLoader from '@/components/page-loader';
import { isAuth } from '@/lib/actions/auth-token-action';
import { redirect } from 'next/navigation';

type ProfilePageProps = {
    params: Promise<{
        userID?: string;
    }>;
};
export default async function ProfilePage({ params }: ProfilePageProps) {
    const { userID } = await params;
    const auth = await isAuth();

    if (!auth && !userID) {
        redirect('/');
    }

    return (
        <div>
            <Suspense fallback={<PageLoader />}>
                <ProfileView userID={userID} />
            </Suspense>
        </div>
    );
}

'use client';
import { useAuth } from '@/store/use-auth';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import dynamic from 'next/dynamic';
import { FaSpinner } from 'react-icons/fa6';

const ProfileFormLazy = dynamic(() => import('@/components/profile/create-profile-form'), {
    ssr: false,
    loading: () => (
        <div className={'grid place-items-center'}>
            <FaSpinner className={'size-6 animate-spin'} />
        </div>
    ),
});

export default function ProfileDialog() {
    const profileExists = useAuth((state) => state.profileExists);

    if (profileExists || profileExists === null) {
        return null;
    }

    return (
        <Dialog open={!profileExists}>
            <DialogContent showCloseButton={false} className={'sm:min-w-xl'}>
                <DialogHeader className={'gap-0'}>
                    <DialogTitle className={'leading-5'}>Let's setup your profile</DialogTitle>
                    <DialogDescription>Fill this out to continue.</DialogDescription>
                </DialogHeader>

                {!profileExists && <ProfileFormLazy />}
            </DialogContent>
        </Dialog>
    );
}

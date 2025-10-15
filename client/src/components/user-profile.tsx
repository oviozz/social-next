import { PiShootingStarFill } from 'react-icons/pi';
import { Button, buttonVariants } from '@/components/ui/button';
import { useAuthModalStore } from '@/store/use-auth-modal-store';
import Link from 'next/link';

type UserProfileProps = {
    isAuth: boolean;
};

export default function UserProfile({ isAuth }: UserProfileProps) {
    const openAuthModal = useAuthModalStore((state) => state.openAuthModal);

    return (
        <div className={'bg-white border rounded-xl'}>
            <div className={'px-4 py-5 flex justify-center items-center'}>
                {!isAuth ? (
                    <div className={'flex flex-col items-center gap-2'}>
                        <PiShootingStarFill className={'size-10'} />
                        <p className={'font-semibold tracking-wide sm:text-lg text-sm'}>
                            Get your account now
                        </p>

                        <Button size={'sm'} onClick={() => openAuthModal('SIGN_UP')}>
                            Signup now
                        </Button>
                    </div>
                ) : (
                    <div className={'flex flex-col gap-3'}>
                        <p className={'font-medium text-sm sm:text-lg'}>Find groups and friends.</p>
                        <Link
                            className={buttonVariants({ variant: 'secondary' })}
                            href={'/explore'}
                        >
                            Explore
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}

'use client';

import { useAuthModalStore } from '@/store/use-auth-modal-store';
import { Button, buttonVariants } from '@/components/ui/button';
import { BiSolidLeaf } from 'react-icons/bi';
import { FaPlus, FaSpinner } from 'react-icons/fa6';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { CgProfile } from 'react-icons/cg';
import React from 'react';
import { StateType } from '@/store/use-auth';

type AuthNavProps = {
    state: StateType;
    isAuth: boolean;
};

const AuthNav = ({ state, isAuth }: AuthNavProps) => {
    const openAuthModal = useAuthModalStore((state) => state.openAuthModal);

    if (state === 'loading' || state === 'idle') {
        return <div className={'w-full h-10 bg-neutral-100 animate-pulse rounded-xl'} />;
    }

    if (state === 'failed') {
        return (
            <div
                className={
                    'w-full h-10 bg-destructive/70 text-white rounded-xl grid place-items-center'
                }
            >
                Failed! Refresh your page
            </div>
        );
    }

    return (
        <div className={'flex items-center gap-3 w-full'}>
            {isAuth ? (
                <>
                    <Button className={'flex-1'} variant={'outline'}>
                        <FaPlus className={'size-5'} />
                        <span className={'hidden sm:block'}>Post</span>
                    </Button>

                    <Link
                        className={cn(
                            'flex-1',
                            buttonVariants({
                                variant: 'default',
                            }),
                        )}
                        href={'/profile'}
                    >
                        <CgProfile className={'size-5'} />
                        <span className={'hidden sm:block'}>Profile</span>
                    </Link>
                </>
            ) : (
                <>
                    <Button className={'flex-1'} onClick={() => openAuthModal('SIGN_UP')}>
                        <BiSolidLeaf className={'size-4'} />
                        Sign Up
                    </Button>

                    <Button
                        variant={'outline'}
                        className={'flex-1'}
                        onClick={() => openAuthModal('SIGN_IN')}
                    >
                        Login
                    </Button>
                </>
            )}
        </div>
    );
};

export default AuthNav;

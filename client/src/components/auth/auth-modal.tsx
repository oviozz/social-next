'use client';
import { AuthFormType, useAuthModalStore } from '@/store/use-auth-modal-store';
import React from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import RouteLink from '@/components/routes/route-link';
import dynamic from 'next/dynamic';
import { FaSpinner } from 'react-icons/fa6';

const Spinner = () => (
    <div className={'grid place-items-center'}>
        <FaSpinner className={'size-7 animate-spin'} />
    </div>
);

const SignupFomLazy = dynamic(() => import('@/components/auth/forms/signup-form'), {
    ssr: false,
    loading: () => <Spinner />,
});
const SigninFormLazy = dynamic(() => import('@/components/auth/forms/signin-form'), {
    ssr: false,
    loading: () => <Spinner />,
});

function AuthModal() {
    const { open, form_type, openAuthModal, closeAuthModal } = useAuthModalStore();
    const { title, description } = authInfo[form_type];

    return (
        <Dialog open={open} onOpenChange={(state) => !state && closeAuthModal()}>
            <DialogContent>
                <DialogHeader className={'gap-1'}>
                    <DialogTitle className={'leading-5'}>{title}</DialogTitle>
                    <DialogDescription>{description}</DialogDescription>
                </DialogHeader>

                {form_type === 'SIGN_IN' && <SigninFormLazy />}

                {form_type === 'SIGN_UP' && <SignupFomLazy />}

                {form_type && (
                    <div className={'flex justify-center items-center gap-2 font-light'}>
                        {form_type === 'SIGN_IN' ? (
                            <>
                                <p>{"Don't have account"}</p>
                                <RouteLink onClick={() => openAuthModal('SIGN_UP')}>
                                    Sign up
                                </RouteLink>
                            </>
                        ) : (
                            <>
                                <p>Already have account</p>
                                <RouteLink onClick={() => openAuthModal('SIGN_IN')}>
                                    Sign in
                                </RouteLink>
                            </>
                        )}
                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
}

export default React.memo(AuthModal);

const authInfo: Record<AuthFormType, { title: string; description: string }> = {
    SIGN_IN: {
        title: 'Login to SocialNext.',
        description: 'Connect with your info to access your account.',
    },
    SIGN_UP: {
        title: 'Signup to SocialNext.',
        description: 'Connect with your info to access your account.',
    },
};

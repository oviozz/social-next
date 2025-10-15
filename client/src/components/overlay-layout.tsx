'use client';
import React from 'react';
import SideContainer from '@/components/side-container';
import AuthNav from '@/components/auth/auth-nav';
import RouteNav from '@/components/routes/route-nav';
import { useAuth } from '@/store/use-auth';
import { cn } from '@/lib/utils';

type RootLayoutProps = {
    children: React.ReactNode;
    className?: string;
};

export default function OverlayLayout({ children, className }: RootLayoutProps) {
    const { state, isAuth } = useAuth();

    return (
        <div className={cn('h-screen overflow-hidden', className)}>
            <div className={'px-1 flex justify-center gap-7 h-full'}>
                <div className={'hidden sm:block'}>
                    <RouteNav isAuth={isAuth} />
                </div>

                <div className={'w-full flex flex-col gap-4'}>
                    <div className={'ml-auto lg:hidden'}>
                        <div className={'w-full md:w-fit'}>
                            <AuthNav state={state} isAuth={isAuth} />
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto scrollbar-hide">{children}</div>
                </div>

                <div className={'hidden lg:block max-w-md'}>
                    <SideContainer isAuth={isAuth} state={state} />
                </div>
            </div>
        </div>
    );
}

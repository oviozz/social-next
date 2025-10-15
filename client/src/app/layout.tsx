import type { Metadata } from 'next';
import '../styles/globals.css';
import { cn } from '@/lib/utils';
import React from 'react';
import { fredoka } from '@/styles/fonts';
import AuthModal from '@/components/auth/auth-modal';
import OverlayLayout from '@/components/overlay-layout';
import RouteMobile from '@/components/routes/route-mobile';
import AuthProvider from '@/components/auth-provider';
import TanStackProvider from '@/components/tanstack-provider';

export const metadata: Metadata = {
    title: 'Social Next',
    description: 'Reddit like app',
};

type RootLayoutProps = {
    readonly children: React.ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
    return (
        <html lang="en">
            <body className={cn('antialiased bg-white', fredoka.className)}>
                <TanStackProvider>
                    <AuthProvider>
                        <main className={'mx-auto max-w-screen-lg flex flex-col gap-4'}>
                            <OverlayLayout className={'p-2 sm:p-4'}>{children}</OverlayLayout>
                            <div className={'sm:hidden fixed bottom-0 overflow-hidden z-10 w-full'}>
                                <RouteMobile />
                            </div>
                            <AuthModal />
                        </main>
                    </AuthProvider>
                </TanStackProvider>
            </body>
        </html>
    );
}

'use client';
import React from 'react';
import { navRoutes } from '@/constants/nav-routes';
import Link from 'next/link';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { usePathname } from 'next/navigation';
import { useAuthModalStore } from '@/store/use-auth-modal-store';
import { CgProfile } from 'react-icons/cg';
import { IoMdSettings } from 'react-icons/io';

type RouteNavProps = {
    isAuth: boolean;
};

export default function RouteNav({ isAuth }: RouteNavProps) {
    const pathname = usePathname();
    const openAuthModal = useAuthModalStore((state) => state.openAuthModal);

    return (
        <nav className={'flex flex-col gap-4'}>
            {/*<Logo />*/}

            {navRoutes.map((route, index) => {
                const is_active = route.link === pathname;
                return (
                    <NavItem key={index} text={route.label}>
                        <Link
                            href={route.link}
                            className={is_active ? 'text-green-950' : 'text-black'}
                        >
                            <route.icon className={'size-7'} />
                        </Link>
                    </NavItem>
                );
            })}

            <NavItem text={isAuth ? 'Profile' : 'Login'}>
                <Link
                    href={isAuth ? '/profile' : '#'}
                    onClick={(event) => {
                        if (!isAuth) {
                            event.preventDefault();
                            openAuthModal('SIGN_IN');
                        }
                    }}
                >
                    <CgProfile className={'size-7'} />
                </Link>
            </NavItem>

            {isAuth && (
                <NavItem text={'Settings'}>
                    <Link href={'/setting'}>
                        <IoMdSettings className={'size-7'} />
                    </Link>
                </NavItem>
            )}
        </nav>
    );
}

function NavItem({ children, text }: { children: React.ReactNode; text: string }) {
    return (
        <Tooltip delayDuration={50}>
            <TooltipTrigger asChild>{children}</TooltipTrigger>
            <TooltipContent side={'right'}>
                <p>{text}</p>
            </TooltipContent>
        </Tooltip>
    );
}

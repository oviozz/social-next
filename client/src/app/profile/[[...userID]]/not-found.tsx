'use client';
import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';

export default function NotFoundProfile() {
    return (
        <div className={'flex flex-col justify-center items-center gap-4 h-full'}>
            <p className={'font-semibold text-lg sm:text-xl'}>No Profile Found :(</p>
            <Link
                className={buttonVariants({
                    variant: 'default',
                })}
                href={'/mango'}
            >
                Go Home
            </Link>
        </div>
    );
}

'use client';
import AuthNav from '@/components/auth/auth-nav';
import FindUsersInput from '@/components/find-users-input';
import UserProfile from '@/components/user-profile';
import { StateType } from '@/store/use-auth';

type SideContainerProps = {
    state: StateType;
    isAuth: boolean;
};

export default function SideContainer({ state, isAuth }: SideContainerProps) {
    return (
        <div className={'flex flex-col gap-4 md:w-[320px]'}>
            <AuthNav state={state} isAuth={isAuth} />
            <FindUsersInput />
            <UserProfile isAuth={isAuth} />
        </div>
    );
}

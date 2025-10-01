"use client";
import AuthNav from "@/components/auth/auth-nav";
import FindUsersInput from "@/components/find-users-input";
import UserProfile from "@/components/user-profile";

export default function SideContainer(){

    return (
        <div className={"flex flex-col gap-4"}>
            <AuthNav />
            <FindUsersInput />
            <UserProfile />
        </div>
    )

}
"use client";
import {routes} from "@/constants/routes";
import Link from "next/link";
import {useAuthModalStore} from "@/store/use-auth-modal-store";
import {CgProfile} from "react-icons/cg";
import React from "react";

export default function RouteMobile(){

    const isAuth = false;
    const openAuthModal = useAuthModalStore(state => state.openAuthModal);

    return (
        <nav className={"bg-neutral-50 w-full border-t border-neutral-100/80"}>
            <ul className={"flex justify-between items-center px-10 h-14"}>

                {routes.map((route, index) => {
                    return (
                        <Link
                            key={index}
                            className={"p-2"}
                            href={route.link}
                        >
                            <route.icon className={"size-7"} />
                        </Link>
                    )
                })}

                <Link
                    onClick={(event) => {
                        if (!isAuth){
                            event.preventDefault();
                            openAuthModal("SIGN_IN");
                        }
                    }}
                    href={"/profile"}
                >
                    <CgProfile className={"size-7"} />
                </Link>

            </ul>
        </nav>
    )

}
import Link from "next/link";
import React from "react";
import {cn} from "@/lib/utils";

type RouteLinkProps = {
    href?: string,
    onClick?: () => void;
    children: React.ReactNode;
    className?: string
}

export default function RouteLink({ children, href, onClick, className }: RouteLinkProps){

    return (
        <div
            onClick={onClick}
            className={cn("text-green-700 hover:underline hover:cursor-pointer", className)}
        >
            { href ? (
                <Link href={href}>
                    {children}
                </Link>
            ) : (
                <span>
                    {children}
                </span>
            )}
        </div>
    )

}
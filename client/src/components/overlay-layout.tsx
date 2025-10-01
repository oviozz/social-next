import React from "react";
import SideContainer from "@/components/side-container";
import AuthNav from "@/components/auth/auth-nav";
import RouteNav from "@/components/routes/route-nav";
import RouteMobile from "@/components/routes/route-mobile";

type RootLayoutProps = {
    children: React.ReactNode;
    className?: string
}

export default function OverlayLayout({ children, className }: RootLayoutProps){

    return (
        <div className={className}>
            {/* Mobile view only */}

            <div className={"flex justify-center gap-7"}>

                <div className={"hidden sm:block"}>
                    <RouteNav />
                </div>

                <div className={"w-full flex flex-col gap-4"}>
                    {/* Mobile Navigation */}
                    <div className={"ml-auto lg:hidden"}>
                        <div className={"w-full md:w-fit"}>
                            <AuthNav />
                        </div>
                    </div>
                    {children}
                </div>

                <div className={"hidden lg:block"}>
                    <SideContainer />
                </div>

            </div>

        </div>
    )

}
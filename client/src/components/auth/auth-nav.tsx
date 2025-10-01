"use client";

import {useAuthModalStore} from "@/store/use-auth-modal-store";
import {Button} from "@/components/ui/button";
import {BiSolidLeaf} from "react-icons/bi";

const AuthNav = () => {

    const openAuthModal = useAuthModalStore(state => state.openAuthModal);

    return (
        <div className={"flex items-center gap-3 w-full"}>
            <Button
                className={"flex-1"}
                onClick={() => openAuthModal("SIGN_UP")}
            >
                <BiSolidLeaf className={"size-4"} />
                Sign Up
            </Button>

            <Button
                variant={"outline"}
                className={"flex-1"}
                onClick={() => openAuthModal("SIGN_IN")}
            >
                Login
            </Button>
        </div>
    )


}

export default AuthNav;
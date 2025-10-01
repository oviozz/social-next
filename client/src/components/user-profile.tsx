import { PiShootingStarFill } from "react-icons/pi";
import {Button} from "@/components/ui/button";
import {useAuthModalStore} from "@/store/use-auth-modal-store";

export default function UserProfile(){

    const openAuthModal = useAuthModalStore(state => state.openAuthModal);
    const user = false;

    return (
        <div className={"bg-white border rounded-xl"}>
            <div className={"px-4 py-5 flex justify-center items-center"}>
                { !user ? (
                    <div className={"flex flex-col items-center gap-2"}>
                        <PiShootingStarFill className={"size-10"} />
                        <p className={"font-semibold tracking-wide sm:text-lg text-sm"}>Get your account now</p>

                        <Button
                            size={"sm"}
                            onClick={() => openAuthModal("SIGN_UP")}
                        >
                            Signup now
                        </Button>
                    </div>
                ) : (
                    <>
                        Your logged in
                    </>
                )}
            </div>
        </div>
    )

}
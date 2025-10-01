import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {useForm} from "react-hook-form";
import {signinSchema, SignInType} from "@/schemas/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import {Button} from "@/components/ui/button";
import AlertMessage from "@/components/alert-mesage";

export default function SigninForm(){

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<SignInType>({
        resolver: zodResolver(signinSchema),
        defaultValues: {
            username: "",
            password: ""
        }
    });

    const signInHandler = (data: SignInType) => {
        console.log(data);
    }

    return (
        <form onSubmit={handleSubmit(signInHandler)} className={"flex flex-col gap-4"}>
            <div className={"space-y-2"}>
                <Label>Username</Label>
                <Input {...register("username")} />
                <AlertMessage variant={"error"} message={errors.username?.message} />
            </div>

            <div className={"space-y-2"}>
                <Label>Password</Label>
                <Input type={"password"} {...register("password")} />
                <AlertMessage variant={"error"} message={errors.password?.message} />
            </div>

            <Button>
                Sign in to account
            </Button>
        </form>
    )

}
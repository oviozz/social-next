"use client";

import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {signupSchema, SignUpType} from "@/schemas/auth";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import AlertMessage from "@/components/alert-mesage";

export default function SignupForm(){

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<SignUpType>({
        resolver: zodResolver(signupSchema),
        defaultValues: {
            username: "",
            email: "",
            password: "",
            confirmPassword: ""
        }
    });

    const handleSignup = (data: SignUpType) => {
        console.log(data);
    }

    return (
        <form
            className={"flex flex-col gap-4"}
            onSubmit={handleSubmit(handleSignup)}
        >
            <div className={"space-y-2"}>
                <Label>Username</Label>
                <Input {...register("username")} />
                <AlertMessage variant={"error"} message={errors.username?.message} />
            </div>

            <div className={"space-y-2"}>
                <Label>Email</Label>
                <Input type={"email"} {...register("email")} />
                <AlertMessage variant={"error"} message={errors.email?.message} />
            </div>

            <div className={"space-y-2"}>
                <Label>Password</Label>
                <Input type={"password"} {...register("password")} />
                <AlertMessage variant={"error"} message={errors.password?.message} />
            </div>

            <div className={"space-y-2"}>
                <Label>Confirm Password</Label>
                <Input type={"password"} {...register("confirmPassword")} />
                <AlertMessage variant={"error"} message={errors.confirmPassword?.message} />
            </div>

            <Button>
                Create Account
            </Button>

        </form>
    )

}
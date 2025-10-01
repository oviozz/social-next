import { z } from "zod";

const baseSchema = z.object({
    username: z.string().min(1, "Username is required"),
    email: z.email("Email is not valid").min(1, "Email is required"),
    password: z.string().min(1, "Password is required")
});

export const signinSchema = baseSchema.pick({
    username: true,
    password: true
});

export const signupSchema = baseSchema.extend({
    confirmPassword: z.string()
}).refine((data) => {
    return data.password === data.confirmPassword
}, { error: "Password doesn't match", path: ["confirmPassword"] });


export type SignInType = z.infer<typeof signinSchema>;
export type SignUpType = z.infer<typeof signupSchema>;
import {z} from "zod";

export const userSchema = z.object({
    _id: z.string().optional(),
    username: z.string().min(3, { message: "Username must be at least 3 characters long." })
        .max(30, { message: "Username must be 30 characters or less." }),
    email: z.email({ message: "Invalid email address." }),
    password: z.string().min(8, { message: "Password must be at least 8 characters long." }),
    createdAt: z.string().optional(),
    updatedAt: z.string().optional()
});

export type UserType = z.infer<typeof userSchema>;

import { baseUserSchema, signinSchema, signupSchema, SignUpType } from '@/schemas/auth';
import { env } from '@/constants/env';

export const authServices = {
    checkUsername: async (username: string | null) => {
        if (!username) return null;

        try {
            const validateField = baseUserSchema.pick({ username: true }).safeParse({ username });
            if (!validateField.success) {
                const msg = validateField.error.issues[0].message ?? 'Something went wrong';
                throw new Error(msg);
            }

            const response = await fetch(env.NEXT_PUBLIC_BACKEND_URL + '/auth/check-username', {
                method: 'POST',
                body: JSON.stringify({ username }),
            });

            const result = (await response.json()) as { success: boolean; message: string };

            return { valid: result.success, message: result.message };
        } catch (error) {
            throw error;
        }
    },

    signup: async (user: SignUpType) => {
        try {
            const validate = signupSchema.safeParse(user);
            if (!validate.success) {
                const msg = validate.error.issues[0].message ?? 'Something went wrong';
                throw new Error(msg);
            }

            const response = await fetch(env.NEXT_PUBLIC_BACKEND_URL + '/auth/signup', {
                method: 'POST',
                body: JSON.stringify(user),
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const result = (await response.json()) as { success: boolean; message: string };

            return result;
        } catch (error) {
            throw error;
        }
    },

    login: async (data: { username: string; password: string }) => {
        try {
            const validate = signinSchema.safeParse(data);
            if (!validate.success) {
                const msg = validate.error.issues[0].message ?? 'Something went wrong';
                throw new Error(msg);
            }

            const response = await fetch(env.NEXT_PUBLIC_BACKEND_URL + '/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
                credentials: 'include',
            });

            const result = (await response.json()) as { success: boolean; message: string };

            return result;
        } catch (error) {
            throw error;
        }
    },
};

import { authServices } from '@/lib/server/services/auth';
import { userServices } from '@/lib/server/services/user';
import { profileServices } from '@/lib/server/services/profile';

export const api = {
    auth: authServices,
    user: userServices,
    profile: profileServices,
} as const;

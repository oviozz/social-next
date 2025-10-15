import { env } from '@/constants/env';
import { getAuthCookieToken } from '@/lib/actions/auth-token-action';

const BASE_URL = env.NEXT_PUBLIC_BACKEND_URL;

export default async function fetchClient<T = any>(
    path: string,
    options?: RequestInit,
): Promise<T> {
    const token = await getAuthCookieToken();

    const headers: HeadersInit & { Cookie?: string } = {
        ...options?.headers,
        'Content-Type': 'application/json',
    };

    if (typeof window === 'undefined' && token) {
        headers.Cookie = token;
    }

    const response = await fetch(BASE_URL + path, {
        ...options,
        headers,
        credentials: 'include',
    });

    if (!response.ok) {
        console.log('FETCH_CLIENT_ERROR', response.statusText);
        throw new Error('Something went wrong');
    }

    const result = (await response.json()) as T;

    return result;
}

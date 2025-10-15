'use client';
import { useEffect, useState } from 'react';
import useDebounce from '@/hooks/use-debounce';
import { api } from '@/lib/server/api';

type StatusType = 'idle' | 'checking' | 'taken' | 'available' | 'error';

export default function useUsernameChecker(username: string) {
    const [status, setStatus] = useState<StatusType>('idle');
    const [message, setMessage] = useState<string>('');

    const debounceUsername = useDebounce(username, 500);

    useEffect(() => {
        if (!debounceUsername) {
            setStatus('idle');
            setMessage('');
            return;
        }

        let cancelled = false;

        async function checkUser() {
            setStatus('checking');
            if (cancelled) return;

            try {
                const check = await api.auth.checkUsername(debounceUsername);

                if (check?.valid) {
                    setStatus('available');
                    setMessage(check.message);
                } else {
                    setStatus('taken');
                    setMessage(check?.message ?? 'Username is taken');
                }
            } catch (error) {
                if (cancelled) {
                    setStatus('error');
                    setMessage('Error checking username');
                }
            }
        }

        checkUser();
        return () => {
            cancelled = true;
        };
    }, [debounceUsername]);

    return { status, message };
}

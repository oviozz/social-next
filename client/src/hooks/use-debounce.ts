'use client';

import { useEffect, useState } from 'react';

export default function useDebounce(value: string, delay: number) {
    const [delayedValue, setDelayedValue] = useState<string | null>(null);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setDelayedValue(value);
        }, delay);

        return () => clearTimeout(timeout);
    }, [value, delay]);

    return delayedValue;
}

'use client';

import { ChangeEvent, useState } from 'react';

export default function useInput<T>(input: T) {
    const [value, setValue] = useState<T>(input);

    const setInputValue = (key: keyof T, value: any) => {
        setValue((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = event.target;
        setInputValue(id as keyof T, value);
    };

    return { value, setInputValue, onChangeHandler };
}

import { cn } from '@/lib/utils';

type AlertMessageProps = {
    variant: 'error' | 'success';
    message?: string;
    className?: string;
};

export default function AlertMessage({ variant, message, className }: AlertMessageProps) {
    if (!message) return null;

    return (
        <p
            className={cn(
                'text-sm',
                variant === 'success' ? 'text-green-600' : 'text-red-600',
                className,
            )}
        >
            {message}
        </p>
    );
}

'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signupSchema, SignUpType } from '@/schemas/auth';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import AlertMessage from '@/components/alert-mesage';
import { api } from '@/lib/server/api';
import { FaSpinner } from 'react-icons/fa6';
import useUsernameChecker from '@/hooks/use-username-checker';
import { useTransition } from 'react';
import { useAuthModalStore } from '@/store/use-auth-modal-store';

export default function SignupForm() {
    const closeModal = useAuthModalStore((state) => state.closeAuthModal);
    const [isPending, startTransition] = useTransition();
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors },
        watch,
    } = useForm<SignUpType>({
        resolver: zodResolver(signupSchema),
        defaultValues: {
            username: '',
            email: '',
            password: '',
            confirmPassword: '',
        },
    });

    const username_field = watch('username');
    const { status, message } = useUsernameChecker(username_field);

    const handleSignup = async (data: SignUpType) => {
        if (status !== 'available') {
            setError('username', { message: message || 'Username not available' });
        }

        startTransition(async () => {
            const response = await api.auth.signup(data);
            if (!response.success) {
                closeModal();
            }
        });
    };

    return (
        <form className={'flex flex-col gap-4'} onSubmit={handleSubmit(handleSignup)}>
            <div className={'space-y-2'}>
                <Label>Username</Label>
                <Input {...register('username')} />
                {errors.username ? (
                    <AlertMessage variant="error" message={errors.username.message} />
                ) : status === 'checking' ? (
                    <div className="flex items-center gap-2 text-muted-foreground">
                        <FaSpinner className="size-4 animate-spin" />
                        Checking availability..
                    </div>
                ) : status === 'available' ? (
                    <AlertMessage variant="success" message={message} />
                ) : status === 'taken' || status === 'error' ? (
                    <AlertMessage variant="error" message={message} />
                ) : null}
            </div>

            <div className={'space-y-2'}>
                <Label>Email</Label>
                <Input type={'email'} {...register('email')} />
                <AlertMessage variant={'error'} message={errors.email?.message} />
            </div>

            <div className={'space-y-2'}>
                <Label>Password</Label>
                <Input type={'password'} {...register('password')} />
                <AlertMessage variant={'error'} message={errors.password?.message} />
            </div>

            <div className={'space-y-2'}>
                <Label>Confirm Password</Label>
                <Input type={'password'} {...register('confirmPassword')} />
                <AlertMessage variant={'error'} message={errors.confirmPassword?.message} />
            </div>

            <Button>
                {isPending && <FaSpinner className={'size-4 animate-spin'} />}
                {isPending ? 'Creating..' : 'Create Account'}
            </Button>
        </form>
    );
}

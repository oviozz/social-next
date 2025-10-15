import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { signinSchema, SignInType } from '@/schemas/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import AlertMessage from '@/components/alert-mesage';
import { api } from '@/lib/server/api';
import { useAuthModalStore } from '@/store/use-auth-modal-store';
import { FaSpinner } from 'react-icons/fa6';
import { useAuth } from '@/store/use-auth';

export default function SigninForm() {
    const closeModal = useAuthModalStore((state) => state.closeAuthModal);
    const refreshUser = useAuth((state) => state.refreshUser);
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        setError,
    } = useForm<SignInType>({
        resolver: zodResolver(signinSchema),
        defaultValues: {
            username: '',
            password: '',
        },
    });

    const signInHandler = async (data: SignInType) => {
        const response = await api.auth.login(data);
        if (response.success) {
            refreshUser();
            closeModal();
        } else {
            setError('root', {
                message: response.message,
            });
        }
    };

    return (
        <form onSubmit={handleSubmit(signInHandler)} className={'flex flex-col gap-4'}>
            <div className={'flex justify-center'}>
                <AlertMessage
                    className={'text-white bg-red-500 w-fit px-2 rounded-sm'}
                    variant={'error'}
                    message={errors.root?.message}
                />
            </div>

            <div className={'space-y-2'}>
                <Label>Username</Label>
                <Input {...register('username')} />
                <AlertMessage variant={'error'} message={errors.username?.message} />
            </div>

            <div className={'space-y-2'}>
                <Label>Password</Label>
                <Input type={'password'} {...register('password')} />
                <AlertMessage variant={'error'} message={errors.password?.message} />
            </div>

            <Button>
                {isSubmitting ? (
                    <>
                        <FaSpinner className={'size-4'} />
                        <span>Signing in...</span>
                    </>
                ) : (
                    <>Sign in to account</>
                )}
            </Button>
        </form>
    );
}

'use client';
import { createProfileSchema, CreateProfileType } from '@/schemas/profile';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { IconType } from 'react-icons';
import { FaFemale, FaMale } from 'react-icons/fa';
import { FaCheck, FaPersonCircleQuestion, FaSpinner } from 'react-icons/fa6';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from '@/store/use-auth';
import { api } from '@/lib/server/api';
import { useState } from 'react';

export default function CreateProfileForm() {
    const [isCreated, setIsCreated] = useState(false);
    const setProfileExist = useAuth((state) => state.setProfileExists);
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        setValue,
        setError,
        watch,
    } = useForm<CreateProfileType>({
        resolver: zodResolver(createProfileSchema),
        defaultValues: {
            bio: '',
            gender: null,
        },
    });

    const gender_input = watch('gender');

    const createPostHandler = async (data: CreateProfileType) => {
        const response = await api.profile.createProfile(data);
        if (response.success) {
            setIsCreated(true);
            setTimeout(() => {
                setProfileExist(true);
            }, 4000);
        } else {
            setError('root', {
                message: response.message,
            });
        }
    };

    if (isCreated) {
        return <ProfileCreated closeDialog={() => setProfileExist(true)} />;
    }

    return (
        <form onSubmit={handleSubmit(createPostHandler)} className={'flex flex-col gap-5'}>
            <div className={'space-y-2'}>
                <Label>Write about yourself:</Label>
                <Textarea
                    id={'bio'}
                    {...register('bio')}
                    placeholder={'i like to watch the stars glow'}
                />
                {!!errors.bio && (
                    <span className={'text-red-500 text-sm'}>{errors.bio.message}</span>
                )}
            </div>

            <div className={'space-y-2'}>
                <Label>Your Gender</Label>
                <ul className={'grid sm:grid-cols-3 gap-4'}>
                    {GENDERS.map((person) => (
                        <li
                            key={person.id}
                            onClick={() => setValue('gender', person.id)}
                            className={cn(
                                'grid place-items-center h-20 border-2  rounded-xl cursor-pointer',
                                person.id === gender_input
                                    ? 'bg-neutral-50 text-green-700 border-green-700'
                                    : 'border-neutral-100 hover:border-neutral-100',
                            )}
                        >
                            <div className={'flex flex-col items-center gap-1'}>
                                <person.icon className={'size-7'} />
                                <span className={'text-sm'}>{person.value}</span>
                            </div>
                        </li>
                    ))}
                </ul>

                {!!errors.gender && (
                    <span className={'text-red-500 text-sm'}>{errors.gender.message}</span>
                )}
            </div>

            <Button className={'ml-auto'}>
                {isSubmitting && <FaSpinner className={'size-5 animate-spin'} />}
                {!isSubmitting ? 'Create Profile' : 'Creating Profile..'}
            </Button>
        </form>
    );
}

function ProfileCreated({ closeDialog }: { closeDialog: () => void }) {
    return (
        <div className={'h-52 flex flex-col items-center py-5'}>
            <FaCheck className={'size-9 text-green-600'} />
            <span className={'font-semibold'}>Profile Created Successfully</span>

            <Button onClick={closeDialog} className={'ml-auto'}>
                Close
            </Button>
        </div>
    );
}

const GENDERS: { id: CreateProfileType['gender']; value: string; icon: IconType }[] = [
    {
        id: 'male',
        value: 'Male',
        icon: FaMale,
    },
    {
        id: 'female',
        value: 'Female',
        icon: FaFemale,
    },
    {
        id: 'idk',
        value: "I don't know",
        icon: FaPersonCircleQuestion,
    },
] as const;

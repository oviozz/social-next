'use client';

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createPostSchema, CreatePostType } from '@/schemas/post';
import { useMutation } from '@tanstack/react-query';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

type PostModalProps = {
    children: React.ReactElement;
};

const PostModal = ({ children }: PostModalProps) => {
    const [open, setOpen] = useState(false);

    const createPostMutation = useMutation({
        mutationFn: async (post: CreatePostType) => {
            console.log(post);
        },
    });

    const form = useForm<CreatePostType>({
        resolver: zodResolver(createPostSchema),
        defaultValues: {
            post: {
                content: '',
                type: 'text',
                status: 'published',
            },
        },
    });

    const { register, handleSubmit } = form;
    const { errors, isSubmitting } = form.formState;

    const createHandler = async (post: CreatePostType) => {
        await createPostMutation.mutateAsync(post);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className={'p-4'}>
                <DialogHeader className={'flex flex-col gap-0'}>
                    <DialogTitle className={'text-lg leading-4'}>Create a post</DialogTitle>
                    <DialogDescription>Share anything you desire</DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit(createHandler)}>
                    <div className={'space-y-2'}>
                        <Label>About post</Label>
                        <Textarea {...register('post.content')} />
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default PostModal;

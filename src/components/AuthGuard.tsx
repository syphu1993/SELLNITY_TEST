'use client';

import { useEffect } from 'react';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { getUser } from '@/libs/redux/thunks/authThunks';
import { setToken } from '@/features/auth/authSlice';
import { useAppSelector } from '@/hooks/useAppSelector';
import { useRouter } from 'next/navigation';

export default function AuthGuard({ children, tokenC }: { children: React.ReactNode, tokenC: string | undefined }) {
    const dispatch = useAppDispatch();
    const { error } = useAppSelector((state) => state.auth);
    const router = useRouter();

    useEffect(() => {
        if (tokenC) {
            dispatch(setToken(tokenC))
            dispatch(getUser());
        }
    }, [dispatch, tokenC]);

    useEffect(() => {
        if (error && error.errorCode === 403) {
            router.push('/error-500');
        }

    }, [error, router]);

    return <>{children}</>;
}

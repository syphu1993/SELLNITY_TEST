import { NextResponse } from 'next/server';
import api from '@/libs/axios';
import { AxiosError } from 'axios';

export async function GET() {
    try {
        const response = await api.get('/auth/me');
        return NextResponse.json({ user: response.data });
    } catch (error) {
        const axiosError = error as AxiosError;
        if (axiosError.response?.status === 401) {
            return NextResponse.json({ errors: 'Token Expired!' }, { status: 401 });
        }

        return NextResponse.json({ errors: 'Something went wrong' }, { status: 500 });
    }
}

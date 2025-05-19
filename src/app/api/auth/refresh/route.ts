import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import api from '@/libs/axios';

export async function POST() {
    const refreshTokenLocal = (await cookies()).get('refreshToken')?.value;
    if (!refreshTokenLocal) {
        return NextResponse.json({ error: 'No refresh token' }, { status: 401 });
    }

    try {
        const response = await api.post('/auth/refresh', {
            refreshToken: refreshTokenLocal,
            expiresInMins: 1
        });

        const newAccessToken = response.data.accessToken;
        const newRefreshToken = response.data.refreshToken;

        const res = NextResponse.json({ accessToken: newAccessToken, refreshToken: newRefreshToken });

        res.cookies.set('token', newAccessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 60 * 60 * 24,
            path: '/',
        });

        res.cookies.set('refreshToken', newRefreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 60 * 60 * 24,
            path: '/',
        });
        return res;
    } catch {
        return NextResponse.json({ error: 'Refresh token invalid' }, { status: 403 });
    }
}

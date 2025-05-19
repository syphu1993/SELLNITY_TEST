// app/api/auth/login/route.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import api from '@/libs/axios';
import { RequestLogin } from '@/types/requestBody';
import { AxiosError } from 'axios';

export async function POST(req: NextRequest) {
  const { username, password, expiresInMins }: RequestLogin = await req.json();

  try {
    const response = await api.post("/auth/login", { username, password, expiresInMins });
    const token = response.data.accessToken;
    const refreshToken = response.data.refreshToken;


    const res = NextResponse.json({ userLogin: response.data });

    res.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24,
      path: '/',
    });

    res.cookies.set('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24,
      path: '/',
    });
    return res;
  } catch (error) {
    const axiosError = error as AxiosError;
    if (axiosError.response?.status === 403) {
      return NextResponse.json({ errors: 'Invalid credentials' }, { status: 403 });
    }

    return NextResponse.json({ errors: 'Something went wrong' }, { status: 500 });
  }
}

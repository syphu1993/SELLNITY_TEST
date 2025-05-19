// src/app/api/auth/logout/route.ts
import { NextResponse } from 'next/server';

export async function POST() {
  const response = NextResponse.json({ message: 'Logout success' });

  response.cookies.set('token', '', {
    httpOnly: true,
    path: '/',
    expires: new Date(0), // cách xoá cookie
  });
  response.cookies.set('refreshToken', '', {
    httpOnly: true,
    path: '/',
    expires: new Date(0), // cách xoá cookie
  });
  response.cookies.set('__next_hmr_refresh_hash__', '', {
    httpOnly: true,
    path: '/',
    expires: new Date(0), // cách xoá cookie
  });

  return response;
}

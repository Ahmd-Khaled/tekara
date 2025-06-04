// app/api/login/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { baseUrl } from '@/hooks/common/baseUrl';

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  // 🔐 Call external login API
  const apiResponse = await fetch(`${baseUrl}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  const result = await apiResponse.json();

  // console.log('Login API Response:', result);

  if (!result.status || !result?.token) {
    return NextResponse.json({ status: false, message: result.message }, { status: 401 });
  }

  // Set HttpOnly cookie securely
  (await
    // Set HttpOnly cookie securely
    cookies()).set({
      name: 'auth_token',
      value: result?.token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60, // 1 hour
    });

  return NextResponse.json({ status: true, message: result.message });
}

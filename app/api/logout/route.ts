// app/api/logout/route.ts
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST() {
  (await cookies()).set({
    name: 'auth_token',
    value: '',
    maxAge: 0,
  });

  return NextResponse.json({ status: true, message: 'Logged out' });
}

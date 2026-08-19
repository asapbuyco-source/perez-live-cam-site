import { NextResponse } from 'next/server'
import {
  checkPassword,
  createSessionToken,
  passwordConfigured,
  sessionCookieName,
} from '@/lib/admin-auth'

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}))
  const password = typeof body?.password === 'string' ? body.password : ''
  if (!passwordConfigured()) {
    return NextResponse.json(
      { ok: false, message: 'Admin password is not configured (PLC_ADMIN_PASSWORD).' },
      { status: 500 },
    )
  }
  if (!checkPassword(password)) {
    return NextResponse.json({ ok: false, message: 'Invalid password.' }, { status: 401 })
  }
  const token = createSessionToken()
  const res = NextResponse.json({ ok: true })
  res.cookies.set(sessionCookieName(), token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 12 * 60 * 60,
  })
  return res
}

import { NextResponse } from 'next/server'
import { sessionCookieName, verifySessionToken } from '@/lib/admin-auth'

export async function GET(req: Request) {
  const cookie = req.headers.get('cookie') ?? ''
  const token = /(?:^|;\s*)plc_admin_token=([^;]+)/.exec(cookie)?.[1]
  const ok = verifySessionToken(token)
  return NextResponse.json({ ok, name: sessionCookieName() })
}

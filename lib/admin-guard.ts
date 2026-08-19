import { NextRequest, NextResponse } from 'next/server'
import { sessionCookieName, verifySessionToken } from '@/lib/admin-auth'
import { isConfigured } from '@/lib/license-server'

// Guards an admin API route: requires a valid session cookie and configured
// license server credentials. Returns the NextResponse error when unauthorized.
export function guard(req: NextRequest): NextResponse | null {
  if (!verifySessionToken(req.cookies.get(sessionCookieName())?.value)) {
    return NextResponse.json({ ok: false, message: 'Unauthorized' }, { status: 401 })
  }
  if (!isConfigured()) {
    return NextResponse.json(
      { ok: false, message: 'License server is not configured (PLC_LICENSE_API_URL / PLC_ADMIN_KEY).' },
      { status: 500 },
    )
  }
  return null
}

import { NextRequest, NextResponse } from 'next/server'
import { guard } from '@/lib/admin-guard'
import { createCodes, listLicenses } from '@/lib/license-server'

export async function GET(req: NextRequest) {
  const denied = guard(req)
  if (denied) return denied
  try {
    const search = req.nextUrl.searchParams.get('search') ?? undefined
    const status = req.nextUrl.searchParams.get('status') ?? undefined
    const licenses = await listLicenses(search, status)
    return NextResponse.json({ ok: true, licenses })
  } catch (err) {
    return NextResponse.json({ ok: false, message: (err as Error).message }, { status: 502 })
  }
}

export async function POST(req: NextRequest) {
  const denied = guard(req)
  if (denied) return denied
  try {
    const body = await req.json().catch(() => ({}))
    const days = Math.max(1, Math.min(3650, Number(body?.days) || 30))
    const maxDevices = Math.max(1, Math.min(10, Number(body?.maxDevices) || 1))
    const count = Math.max(1, Math.min(50, Number(body?.count) || 1))
    const codes = await createCodes(days, maxDevices, count)
    return NextResponse.json({ ok: true, codes })
  } catch (err) {
    return NextResponse.json({ ok: false, message: (err as Error).message }, { status: 502 })
  }
}

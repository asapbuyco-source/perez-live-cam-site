import { NextRequest, NextResponse } from 'next/server'
import { guard } from '@/lib/admin-guard'
import { extendLicense } from '@/lib/license-server'

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const denied = guard(req)
  if (denied) return denied
  try {
    const { id } = await params
    const body = await req.json().catch(() => ({}))
    const days = Math.max(1, Math.min(3650, Number(body?.days) || 30))
    await extendLicense(id, days)
    return NextResponse.json({ ok: true })
  } catch (err) {
    return NextResponse.json({ ok: false, message: (err as Error).message }, { status: 502 })
  }
}

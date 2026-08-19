import { NextRequest, NextResponse } from 'next/server'
import { guard } from '@/lib/admin-guard'
import { getLicense } from '@/lib/license-server'

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const denied = guard(req)
  if (denied) return denied
  try {
    const { id } = await params
    const license = await getLicense(id)
    return NextResponse.json({ ok: true, license })
  } catch (err) {
    return NextResponse.json({ ok: false, message: (err as Error).message }, { status: 502 })
  }
}

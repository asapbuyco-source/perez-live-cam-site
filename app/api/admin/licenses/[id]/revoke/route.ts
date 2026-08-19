import { NextRequest, NextResponse } from 'next/server'
import { guard } from '@/lib/admin-guard'
import { revokeLicense } from '@/lib/license-server'

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const denied = guard(req)
  if (denied) return denied
  try {
    const { id } = await params
    await revokeLicense(id)
    return NextResponse.json({ ok: true })
  } catch (err) {
    return NextResponse.json({ ok: false, message: (err as Error).message }, { status: 502 })
  }
}

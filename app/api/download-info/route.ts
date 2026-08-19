import { NextResponse } from 'next/server'
import { getDownloadInfo } from '@/lib/license-server'

// Public: returns the admin-configured download link for the marketing page.
export async function GET() {
  try {
    const info = await getDownloadInfo()
    return NextResponse.json({ ok: true, ...info })
  } catch (err) {
    return NextResponse.json({ ok: false, message: (err as Error).message }, { status: 502 })
  }
}

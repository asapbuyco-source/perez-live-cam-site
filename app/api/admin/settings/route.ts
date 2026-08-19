import { NextRequest, NextResponse } from 'next/server'
import { guard } from '@/lib/admin-guard'
import { getSiteSettings, updateSiteSettings } from '@/lib/license-server'

export async function GET(req: NextRequest) {
  const denied = guard(req)
  if (denied) return denied
  try {
    const settings = await getSiteSettings()
    return NextResponse.json({ ok: true, settings })
  } catch (err) {
    return NextResponse.json({ ok: false, message: (err as Error).message }, { status: 502 })
  }
}

export async function POST(req: NextRequest) {
  const denied = guard(req)
  if (denied) return denied
  try {
    const body = await req.json().catch(() => ({}))
    const downloadUrl = typeof body.downloadUrl === 'string' ? body.downloadUrl.trim().slice(0, 2000) : ''
    const downloadName = typeof body.downloadName === 'string' ? body.downloadName.trim().slice(0, 200) : ''
    const appVersion = typeof body.appVersion === 'string' ? body.appVersion.trim().slice(0, 50) : ''
    const androidApkUrl = typeof body.androidApkUrl === 'string' ? body.androidApkUrl.trim().slice(0, 2000) : ''
    const androidApkName = typeof body.androidApkName === 'string' ? body.androidApkName.trim().slice(0, 200) : ''
    if (!downloadUrl && !androidApkUrl) {
      return NextResponse.json({ ok: false, message: 'Set at least one download URL.' }, { status: 400 })
    }
    await updateSiteSettings({ downloadUrl, downloadName, appVersion, androidApkUrl, androidApkName })
    return NextResponse.json({ ok: true })
  } catch (err) {
    return NextResponse.json({ ok: false, message: (err as Error).message }, { status: 502 })
  }
}

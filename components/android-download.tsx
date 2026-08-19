'use client'

import { useEffect, useState } from 'react'
import { Download, Smartphone } from 'lucide-react'

// Android app card shown in the Download section once the admin sets an APK
// link. Reads the link from the backend (no rebuild needed).
export function AndroidDownloadCard() {
  const [info, setInfo] = useState<{ url: string; name: string } | null>(null)

  useEffect(() => {
    let active = true
    fetch('/api/download-info')
      .then((r) => r.json().catch(() => ({})))
      .then((data) => {
        if (!active) return
        if (data && typeof data.androidApkUrl === 'string' && data.androidApkUrl) {
          setInfo({
            url: data.androidApkUrl,
            name: typeof data.androidApkName === 'string' ? data.androidApkName : 'Perez Live Cam.apk',
          })
        }
      })
      .catch(() => {})
    return () => {
      active = false
    }
  }, [])

  if (!info) return null

  return (
    <div className="mt-6 flex flex-col items-start gap-4 rounded-xl border border-border bg-muted/20 p-5 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-start gap-3">
        <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/15 text-primary">
          <Smartphone className="size-5" />
        </span>
        <div>
          <h3 className="text-sm font-semibold text-foreground">Perez Live Cam for Android</h3>
          <p className="text-sm text-muted-foreground">
            Install the app on your Android device. Download the APK below.
          </p>
        </div>
      </div>
      <a
        href={info.url}
        download={info.name}
        className="inline-flex h-9 shrink-0 items-center gap-1.5 rounded-lg bg-primary px-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/80"
      >
        <Download className="size-4" />
        Download APK
      </a>
    </div>
  )
}

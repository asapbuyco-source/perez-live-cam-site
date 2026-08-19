'use client'

import { useEffect, useState } from 'react'
import { Download, Smartphone, X } from 'lucide-react'

// Shows a fixed "Download the Android app" banner when the site is opened on
// an Android device and an APK link is configured by the admin.
export function AndroidAppBanner() {
  const [dismissed, setDismissed] = useState(false)
  const [info, setInfo] = useState<{ url: string; name: string } | null>(null)

  useEffect(() => {
    let active = true
    const isAndroid = /android/i.test(navigator.userAgent)
    if (!isAndroid) return

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

  if (!info || dismissed) return null

  return (
    <div className="fixed inset-x-0 top-0 z-[60] border-b border-border bg-background/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
        <div className="flex items-center gap-3">
          <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/15 text-primary">
            <Smartphone className="size-5" />
          </span>
          <div>
            <p className="text-sm font-medium text-foreground">Get the Perez Live Cam app for Android</p>
            <p className="text-xs text-muted-foreground">Download the APK and install it on your device.</p>
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-1.5">
          <a
            href={info.url}
            download={info.name}
            className="inline-flex h-9 items-center gap-1.5 rounded-lg bg-primary px-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/80"
          >
            <Download className="size-4" />
            Download app
          </a>
          <button
            type="button"
            aria-label="Dismiss"
            onClick={() => setDismissed(true)}
            className="flex size-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <X className="size-4" />
          </button>
        </div>
      </div>
    </div>
  )
}

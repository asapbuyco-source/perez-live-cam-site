'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Smartphone } from 'lucide-react'

// Compact hero button for the Android app. Only renders once the admin sets
// an APK link in /admin (no rebuild needed).
export function AndroidDownloadButton() {
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
    <Button
      size="sm"
      variant="outline"
      nativeButton={false}
      render={<a href={info.url} download={info.name} />}
    >
      <Smartphone className="size-4" />
      Download app for Android
    </Button>
  )
}
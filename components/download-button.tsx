'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Download } from 'lucide-react'
import { DOWNLOAD_URL, DOWNLOAD_NAME } from '@/lib/download'

// Download button that reads the admin-configured link from the backend.
// Falls back to the baked-in constant if the backend is unreachable.
export function DownloadButton({
  size = 'lg',
  label = 'Download for Windows',
  className,
}: {
  size?: 'default' | 'sm' | 'lg'
  label?: string
  className?: string
}) {
  const [href, setHref] = useState<string | null>(null)
  const [name, setName] = useState<string | null>(null)

  useEffect(() => {
    let active = true
    fetch('/api/download-info')
      .then((r) => r.json().catch(() => ({})))
      .then((data) => {
        if (!active) return
        if (data && typeof data.downloadUrl === 'string' && data.downloadUrl) {
          setHref(data.downloadUrl)
          if (typeof data.downloadName === 'string' && data.downloadName) setName(data.downloadName)
        }
      })
      .catch(() => {
        /* fall back to baked-in constant */
      })
    return () => {
      active = false
    }
  }, [])

  return (
    <Button
      className={className}
      size={size}
      nativeButton={false}
      render={<a href={href ?? DOWNLOAD_URL} download={name ?? DOWNLOAD_NAME} />}
    >
      <Download className="size-4" />
      {label}
    </Button>
  )
}

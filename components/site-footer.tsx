import { MessageCircle } from 'lucide-react'
import { Logo } from '@/components/logo'
import { CONTACT_LABEL, WHATSAPP_URL } from '@/lib/contact'

const links = [
  { label: 'Features', href: '#features' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Download', href: '#download' },
  { label: 'Admin', href: '/admin' },
]

export function SiteFooter() {
  return (
    <footer className="border-t border-border px-4 py-12 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <Logo />
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Play any video file through a virtual camera in your video-call
              apps. Windows only. Everything runs locally on your PC.
            </p>
          </div>

          <nav aria-label="Footer" className="flex flex-col gap-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Links
            </span>
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>
            License-activated software. Demo codes available for trial use.
          </p>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
          >
            <MessageCircle className="size-3.5 text-primary" />
            {CONTACT_LABEL}
          </a>
          <p>© 2026 Perez Live Cam. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

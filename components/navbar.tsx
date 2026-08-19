'use client'

import { Download, Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Logo } from '@/components/logo'
import { ThemeToggle } from '@/components/theme-toggle'
import { cn } from '@/lib/utils'
import { DOWNLOAD_NAME, DOWNLOAD_URL } from '@/lib/download'

const links = [
  { label: 'Features', href: '#features' },
  { label: 'How it works', href: '#how-it-works' },
  { label: 'Compatibility', href: '#compatibility' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Download', href: '#download' },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-colors duration-300',
        scrolled
          ? 'glass border-b border-border'
          : 'border-b border-transparent',
      )}
    >
      <nav
        className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6"
        aria-label="Primary"
      >
        <a href="#top" className="shrink-0" aria-label="Perez Live Cam home">
          <Logo />
        </a>

        <div className="hidden items-center gap-1 md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-2 md:flex">
          <ThemeToggle />
          <Button size="lg" nativeButton={false} render={<a href={DOWNLOAD_URL} download={DOWNLOAD_NAME} />}>
            <Download className="size-4" />
            Download for Windows
          </Button>
        </div>

        <div className="flex items-center gap-1 md:hidden">
          <Button
            size="sm"
            className="px-2.5"
            nativeButton={false}
            render={<a href={DOWNLOAD_URL} download={DOWNLOAD_NAME} />}
          >
            <Download className="size-4" />
            Download
          </Button>
          <div className="hidden min-[360px]:block">
            <ThemeToggle />
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? 'Close menu' : 'Open menu'}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </Button>
        </div>
      </nav>

      {open && (
        <div className="glass border-t border-border md:hidden">
          <div className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-4 sm:px-6">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                {link.label}
              </a>
            ))}
            <Button
              className="mt-2"
              size="lg"
              nativeButton={false}
              render={<a href={DOWNLOAD_URL} download={DOWNLOAD_NAME} onClick={() => setOpen(false)} />}
            >
              <Download className="size-4" />
              Download for Windows
            </Button>
            <div className="mt-2 flex items-center justify-between border-t border-border pt-3 min-[360px]:hidden">
              <span className="px-3 text-sm text-muted-foreground">Theme</span>
              <ThemeToggle />
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

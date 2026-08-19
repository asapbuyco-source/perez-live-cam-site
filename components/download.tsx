import { MessageCircle, ShieldCheck } from 'lucide-react'
import { Reveal } from '@/components/reveal'
import { DownloadButton } from '@/components/download-button'
import { AndroidDownloadCard } from '@/components/android-download'
import { CONTACT_LABEL, WHATSAPP_URL } from '@/lib/contact'
import { APP_VERSION } from '@/lib/download'

const steps = [
  'Download the installer.',
  'Run it as administrator.',
  'Allow the camera driver prompt on first launch.',
  'Enter a license code (demo codes available).',
  'Open your call app and pick "Perez Live Cam Virtual Camera".',
]

export function DownloadSection() {
  return (
    <section id="download" className="scroll-mt-20 px-4 py-20 sm:px-6 md:py-28">
      <Reveal className="mx-auto max-w-5xl">
        <div className="relative overflow-hidden rounded-2xl border border-border bg-card p-8 sm:p-12">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-20 -top-24 h-80 w-80 rounded-full opacity-70 blur-[110px]"
            style={{ background: 'var(--glow)' }}
          />

          <div className="relative grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-center">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-border bg-muted/40 px-3 py-1 font-mono text-xs text-muted-foreground">
                v{APP_VERSION} · x64
              </span>
              <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                Download & install
              </h2>
              <p className="mt-4 max-w-md text-pretty text-base leading-relaxed text-muted-foreground">
                A single NSIS installer with a guided setup wizard. Free to try
                with demo codes — no account required.
              </p>

              <div className="mt-7 flex flex-wrap items-center gap-3">
                <DownloadButton />
                <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  <ShieldCheck className="size-4 text-primary" />
                  100% local · no uploads
                </span>
              </div>
              <p className="mt-3 text-xs text-muted-foreground">
                Direct download from the releases page ·{' '}
                <a
                  href="https://github.com/asapbuyco-source/perez-live-cam-releases"
                  className="underline decoration-border underline-offset-4 hover:text-foreground"
                  target="_blank"
                  rel="noreferrer"
                >
                  view all versions
                </a>{' '}
                ·{' '}
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-xs text-muted-foreground transition-colors hover:text-foreground"
                >
                  <MessageCircle className="size-3 text-primary" />
                  {CONTACT_LABEL}
                </a>
              </p>

              <AndroidDownloadCard />
            </div>

            <ol className="flex flex-col gap-3">
              {steps.map((step, i) => (
                <li
                  key={step}
                  className="flex items-start gap-3 rounded-xl border border-border bg-muted/20 px-4 py-3"
                >
                  <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-primary font-mono text-xs font-semibold text-primary-foreground">
                    {i + 1}
                  </span>
                  <span className="text-sm leading-relaxed text-foreground">
                    {step}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </Reveal>
    </section>
  )
}

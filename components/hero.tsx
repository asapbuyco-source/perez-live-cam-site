import { Check, Download, PlayCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { AppMockup } from '@/components/app-mockup'
import { Reveal } from '@/components/reveal'
import { APP_VERSION, DOWNLOAD_NAME, DOWNLOAD_URL } from '@/lib/download'

const trust = ['Free to try', 'Windows 11', 'No account needed', '100% local']

export function Hero() {
  return (
    <section className="relative overflow-hidden px-4 pt-28 pb-16 sm:px-6 sm:pt-32 md:pb-24">
      {/* subtle blue glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[520px] w-[820px] -translate-x-1/2 rounded-full opacity-70 blur-[120px]"
        style={{ background: 'var(--glow)' }}
      />

      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1.05fr_1fr]">
        <Reveal className="flex flex-col items-start">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-muted/40 px-3 py-1 text-xs font-medium text-muted-foreground">
            <span className="size-1.5 rounded-full bg-primary" />
            Windows virtual camera · v{APP_VERSION}
          </span>

          <h1 className="mt-5 text-balance text-4xl font-semibold leading-[1.05] tracking-tight text-foreground sm:text-5xl md:text-6xl">
            Be anyone on camera. Play any video.
          </h1>

          <p className="mt-5 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
            Perez Live Cam turns video files into a real Windows camera — use
            them in WhatsApp, Zoom, Meet, OBS and every app that reads your
            webcam.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button size="lg" nativeButton={false} render={<a href={DOWNLOAD_URL} download={DOWNLOAD_NAME} />}>
              <Download className="size-4" />
              Download for Windows
            </Button>
            <Button
              size="lg"
              variant="outline"
              nativeButton={false}
              render={<a href="#how-it-works" />}
            >
              <PlayCircle className="size-4" />
              See how it works
            </Button>
          </div>

          <ul className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2">
            {trust.map((item) => (
              <li
                key={item}
                className="flex items-center gap-1.5 text-sm text-muted-foreground"
              >
                <Check className="size-4 text-primary" />
                {item}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={120}>
          <AppMockup />
        </Reveal>
      </div>
    </section>
  )
}

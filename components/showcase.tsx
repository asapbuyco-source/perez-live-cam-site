import { CheckCircle2 } from 'lucide-react'
import { Reveal } from '@/components/reveal'

const points = [
  'Appears as a standard camera device',
  'Works in Zoom, Meet, Teams, OBS & more',
  'Smooth 30 fps playback, no stutter',
]

export function Showcase() {
  return (
    <section className="relative overflow-hidden px-4 py-20 sm:px-6 md:py-28">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-1/4 top-1/2 -z-10 h-[380px] w-[560px] -translate-y-1/2 rounded-full opacity-50 blur-[120px]"
        style={{ background: 'var(--glow)' }}
      />
      <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[1fr_1.15fr]">
        <Reveal className="order-2 flex flex-col items-start lg:order-1">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-muted/40 px-3 py-1 text-xs font-medium text-muted-foreground">
            Seen by everyone on the call
          </span>
          <h2 className="mt-5 text-balance text-3xl font-semibold leading-tight tracking-tight text-foreground sm:text-4xl">
            Your video, right where your webcam used to be
          </h2>
          <p className="mt-4 max-w-md text-pretty text-base leading-relaxed text-muted-foreground">
            Once the camera is running, every meeting app treats it like any
            other webcam. Pick “Perez Live Cam” and your chosen video plays for
            everyone in the room.
          </p>
          <ul className="mt-7 flex flex-col gap-3">
            {points.map((point) => (
              <li
                key={point}
                className="flex items-center gap-2.5 text-sm text-foreground"
              >
                <CheckCircle2 className="size-5 shrink-0 text-primary" />
                {point}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={120} className="order-1 lg:order-2">
          <div className="glass overflow-hidden rounded-2xl border border-border p-2 shadow-2xl shadow-black/20">
            <img
              src="/showcase-meeting.png"
              alt="A video meeting where Perez Live Cam is used as the active camera"
              className="w-full rounded-xl"
            />
          </div>
        </Reveal>
      </div>
    </section>
  )
}

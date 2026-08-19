import { Check, Cpu, HardDrive, MonitorCheck, Webcam } from 'lucide-react'
import { Reveal } from '@/components/reveal'
import { SectionHeading } from '@/components/section-heading'

const requirements = [
  { icon: MonitorCheck, text: 'Windows 11 (build 22000+) for the virtual camera' },
  { icon: MonitorCheck, text: 'Windows 10 or newer to run the app UI' },
  { icon: HardDrive, text: '~200 MB of free disk space' },
  { icon: Cpu, text: 'Any modern CPU — no dedicated GPU required' },
]

const worksIn = [
  'WhatsApp Desktop',
  'Zoom',
  'Google Meet',
  'Microsoft Teams',
  'OBS Studio',
  'Discord',
  'Windows Camera',
]

export function Compatibility() {
  return (
    <section
      id="compatibility"
      className="scroll-mt-20 border-t border-border bg-muted/20 px-4 py-20 sm:px-6 md:py-28"
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Compatibility"
          title="Check your setup in seconds"
        />

        <div className="mt-14 grid gap-5 md:grid-cols-2">
          <Reveal>
            <div className="h-full rounded-xl border border-border bg-card p-7">
              <h3 className="text-lg font-semibold text-foreground">
                Requirements
              </h3>
              <ul className="mt-5 flex flex-col gap-4">
                {requirements.map((req) => (
                  <li key={req.text} className="flex items-start gap-3">
                    <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary/12 text-primary">
                      <req.icon className="size-4" />
                    </span>
                    <span className="text-sm leading-relaxed text-muted-foreground">
                      {req.text}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="h-full rounded-xl border border-border bg-card p-7">
              <h3 className="flex items-center gap-2 text-lg font-semibold text-foreground">
                <Webcam className="size-5 text-primary" />
                Works in
              </h3>
              <ul className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {worksIn.map((app) => (
                  <li
                    key={app}
                    className="flex items-center gap-2 text-sm text-muted-foreground"
                  >
                    <Check className="size-4 shrink-0 text-primary" />
                    {app}
                  </li>
                ))}
              </ul>
              <p className="mt-6 rounded-lg border border-border bg-muted/40 px-4 py-3 text-sm text-muted-foreground">
                …and any app with a camera selector.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

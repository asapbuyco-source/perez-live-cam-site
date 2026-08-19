import { Reveal } from '@/components/reveal'

const apps = [
  'WhatsApp',
  'Zoom',
  'Google Meet',
  'Microsoft Teams',
  'OBS Studio',
  'Discord',
  'Windows Camera',
]

export function LogoStrip() {
  return (
    <section className="border-y border-border bg-muted/20 px-4 py-8 sm:px-6">
      <Reveal className="mx-auto max-w-6xl">
        <div className="flex flex-col items-center gap-5 md:flex-row md:gap-8">
          <span className="shrink-0 text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Works with
          </span>
          <ul className="flex flex-wrap items-center justify-center gap-x-7 gap-y-3 md:justify-start">
            {apps.map((app) => (
              <li
                key={app}
                className="text-sm font-medium text-muted-foreground/70 transition-colors hover:text-foreground"
              >
                {app}
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </section>
  )
}

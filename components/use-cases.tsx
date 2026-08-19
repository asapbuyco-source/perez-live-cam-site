import { GraduationCap, PartyPopper, Users, Video } from 'lucide-react'
import { Reveal } from '@/components/reveal'
import { SectionHeading } from '@/components/section-heading'

const cases = [
  {
    icon: Video,
    title: 'Content creators',
    body: 'Route pre-rendered clips, intros or B-roll straight into your stream or recording.',
  },
  {
    icon: Users,
    title: 'Online meetings',
    body: 'Play a looping background or a prepared clip while you present on a call.',
  },
  {
    icon: GraduationCap,
    title: 'Teaching & presentations',
    body: 'Show recorded demos as your camera feed so everyone sees the same thing.',
  },
  {
    icon: PartyPopper,
    title: 'Just for fun',
    body: 'A harmless, prank-safe way to surprise friends on a video call.',
  },
]

export function UseCases() {
  return (
    <section className="px-4 py-20 sm:px-6 md:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Use cases"
          title="Made for however you show up on camera"
        />

        <div className="mt-14 grid gap-5 lg:grid-cols-[1.1fr_1fr]">
          {/* Featured image tile */}
          <Reveal>
            <div className="group relative h-full min-h-[280px] overflow-hidden rounded-2xl border border-border">
              <img
                src="/scene-creator.png"
                alt="A creator streaming with video routed through the virtual camera"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/90 px-2.5 py-1 text-[11px] font-semibold text-primary-foreground">
                  Creator favorite
                </span>
                <h3 className="mt-3 text-xl font-semibold text-white">
                  Stream clips without a capture card
                </h3>
                <p className="mt-1.5 max-w-sm text-sm leading-relaxed text-white/70">
                  Feed intros, replays and B-roll straight into OBS or your live
                  platform.
                </p>
              </div>
            </div>
          </Reveal>

          {/* Cards */}
          <div className="grid gap-5 sm:grid-cols-2">
            {cases.map((item, i) => (
              <Reveal key={item.title} delay={(i % 2) * 90}>
                <div className="h-full rounded-xl border border-border bg-card p-6 transition-colors hover:border-primary/40">
                  <span className="flex size-10 items-center justify-center rounded-lg bg-primary/12 text-primary">
                    <item.icon className="size-5" />
                  </span>
                  <h3 className="mt-4 text-base font-semibold text-foreground">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {item.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

import {
  Crop,
  FileVideo2,
  KeyRound,
  MonitorPlay,
  ToggleLeft,
  TvMinimal,
} from 'lucide-react'
import { Reveal } from '@/components/reveal'
import { SectionHeading } from '@/components/section-heading'

const features = [
  {
    icon: FileVideo2,
    title: 'Any video format',
    body: 'MP4, MKV, AVI and MOV via native decoding — no re-encoding required.',
  },
  {
    icon: MonitorPlay,
    title: 'Up to 1080p60 output',
    body: 'Selectable resolution and frame rate, defaulting to a clean 1280×720 at 30 fps.',
  },
  {
    icon: Crop,
    title: 'Fit / Stretch / Crop',
    body: 'Frame your video exactly how you want — letterbox, fill, or zoom to fill.',
  },
  {
    icon: ToggleLeft,
    title: 'Loop & mute controls',
    body: 'Loop the video seamlessly, mute audio and mirror the preview in a click.',
  },
  {
    icon: TvMinimal,
    title: 'Test pattern mode',
    body: 'A built-in animated pattern lets you verify the camera without a video file.',
  },
  {
    icon: KeyRound,
    title: 'Offline license',
    body: 'Device-bound activation that keeps working without internet after setup.',
  },
]

export function Features() {
  return (
    <section
      id="features"
      className="scroll-mt-20 border-t border-border bg-muted/20 px-4 py-20 sm:px-6 md:py-28"
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Features"
          title="Everything you need to control the camera"
          description="A focused toolset that does one thing well — turning your videos into a dependable Windows camera device."
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, i) => (
            <Reveal key={feature.title} delay={(i % 3) * 90}>
              <div className="group h-full rounded-xl border border-border bg-card p-6 transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-[0_12px_40px_-20px_var(--glow)]">
                <span className="flex size-11 items-center justify-center rounded-lg bg-primary/12 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <feature.icon className="size-5.5" />
                </span>
                <h3 className="mt-5 text-base font-semibold text-foreground">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {feature.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

import { FileVideo, Power, SwitchCamera } from 'lucide-react'
import { Reveal } from '@/components/reveal'
import { SectionHeading } from '@/components/section-heading'

const steps = [
  {
    icon: FileVideo,
    title: 'Pick a video',
    body: 'Choose any video file from your PC — MP4, MKV, AVI or MOV.',
  },
  {
    icon: Power,
    title: 'Start the camera',
    body: 'One click registers "Perez Live Cam Virtual Camera" on your system.',
  },
  {
    icon: SwitchCamera,
    title: 'Switch your camera',
    body: 'Select it in your call app\u2019s camera settings and you\u2019re live.',
  },
]

export function HowItWorks() {
  return (
    <section id="how-it-works" className="scroll-mt-20 px-4 py-20 sm:px-6 md:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="How it works"
          title="Three steps to a video-powered webcam"
          description="No drivers to hunt down, no config files. Set it up once and switch cameras like any other device."
        />

        <ol className="mt-14 grid gap-6 md:grid-cols-3">
          {steps.map((step, i) => (
            <Reveal as="li" key={step.title} delay={i * 100}>
              <div className="group relative h-full rounded-xl border border-border bg-card p-6 transition-colors hover:border-primary/40">
                <span className="flex size-11 items-center justify-center rounded-lg bg-primary/12 text-primary">
                  <step.icon className="size-5.5" />
                </span>
                <span className="mt-5 block font-mono text-xs text-muted-foreground">
                  Step {i + 1}
                </span>
                <h3 className="mt-1 text-lg font-semibold text-foreground">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {step.body}
                </p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}

import {
  Crop,
  Maximize2,
  Play,
  Repeat,
  Settings,
  Video,
  VolumeX,
} from 'lucide-react'

export function AppMockup() {
  return (
    <div className="glass overflow-hidden rounded-2xl border border-border shadow-2xl shadow-black/20">
      {/* Title bar */}
      <div className="flex items-center gap-2 border-b border-border bg-muted/40 px-4 py-2.5">
        <span className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
          <Video className="size-3.5 text-primary" />
          Perez Live Cam
        </span>
        <span className="ml-auto flex items-center gap-1.5">
          <span className="size-2.5 rounded-full bg-muted-foreground/30" />
          <span className="size-2.5 rounded-full bg-muted-foreground/30" />
          <span className="size-2.5 rounded-full bg-muted-foreground/30" />
        </span>
      </div>

      <div className="grid gap-3 p-3 sm:grid-cols-[1.6fr_1fr] sm:p-4">
        {/* Preview area */}
        <div className="relative aspect-video overflow-hidden rounded-xl border border-border bg-black/60">
          <img
            src="/preview-portrait.png"
            alt="Video playing as the virtual camera feed"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20" />

          <div className="absolute left-3 top-3 flex items-center gap-1.5 rounded-full bg-red-500/90 px-2.5 py-1 text-[11px] font-semibold text-white">
            <span className="size-1.5 animate-pulse rounded-full bg-white" />
            LIVE
          </div>

          <div className="absolute bottom-3 left-3 rounded-md bg-black/50 px-2 py-1 font-mono text-[11px] text-white/90">
            1280 × 720 · 30 fps
          </div>

          <div className="absolute inset-x-0 bottom-0 flex items-center gap-2 p-3">
            <span className="flex size-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <Play className="size-4 fill-current" />
            </span>
            <div className="h-1 flex-1 overflow-hidden rounded-full bg-white/20">
              <div className="h-full w-2/5 rounded-full bg-primary" />
            </div>
          </div>
        </div>

        {/* Virtual camera panel */}
        <div className="flex flex-col gap-3">
          <div className="rounded-xl border border-border bg-card/60 p-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-muted-foreground">
                Virtual Camera
              </span>
              <span className="flex items-center gap-1.5 rounded-full bg-primary/15 px-2 py-0.5 text-[10px] font-semibold text-primary">
                <span className="size-1.5 rounded-full bg-primary" />
                Running
              </span>
            </div>
            <p className="mt-2 font-mono text-[11px] leading-relaxed text-foreground">
              Perez Live Cam Virtual Camera
            </p>
            <p className="mt-1 text-[11px] text-muted-foreground">
              Selectable in your call app
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {[
              { icon: Maximize2, label: 'Fit' },
              { icon: Crop, label: 'Crop' },
              { icon: Repeat, label: 'Loop' },
              { icon: VolumeX, label: 'Mute' },
            ].map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex items-center gap-2 rounded-lg border border-border bg-muted/30 px-2.5 py-2 text-[11px] text-foreground"
              >
                <Icon className="size-3.5 text-primary" />
                {label}
              </div>
            ))}
          </div>

          <div className="mt-auto flex items-center gap-2 rounded-lg border border-border bg-muted/30 px-2.5 py-2 text-[11px] text-muted-foreground">
            <Settings className="size-3.5" />
            720p · 30 fps · Fit
          </div>
        </div>
      </div>
    </div>
  )
}

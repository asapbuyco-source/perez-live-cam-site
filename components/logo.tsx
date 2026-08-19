import { Video } from 'lucide-react'
import { cn } from '@/lib/utils'

export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn('inline-flex items-center gap-2', className)}>
      <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-[0_0_18px_-2px_var(--glow)]">
        <Video className="size-4.5" aria-hidden="true" />
      </span>
      <span className="text-[15px] font-semibold tracking-tight text-foreground">
        Perez Live Cam
      </span>
    </span>
  )
}

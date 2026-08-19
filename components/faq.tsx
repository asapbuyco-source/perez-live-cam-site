'use client'

import { ChevronDown } from 'lucide-react'
import { useState } from 'react'
import { Reveal } from '@/components/reveal'
import { SectionHeading } from '@/components/section-heading'
import { cn } from '@/lib/utils'

const faqs = [
  {
    q: 'Is it free?',
    a: 'It\u2019s free to try with demo codes. The full version needs a license code.',
  },
  {
    q: 'Does it work in WhatsApp / Zoom?',
    a: 'Yes — it appears as a standard camera device, so you can select it just like any webcam.',
  },
  {
    q: 'Why Windows 11?',
    a: 'Microsoft\u2019s Media Foundation virtual camera API requires Windows 11 build 22000 or newer.',
  },
  {
    q: 'Is my video uploaded anywhere?',
    a: 'No. Everything runs locally on your PC. Nothing ever leaves your machine.',
  },
  {
    q: 'Can I use it offline?',
    a: 'Yes — activation includes an offline grace period so it keeps working without internet.',
  },
  {
    q: 'Does it work on macOS?',
    a: 'No, Perez Live Cam is Windows only for now.',
  },
]

export function Faq() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section
      id="faq"
      className="scroll-mt-20 border-t border-border bg-muted/20 px-4 py-20 sm:px-6 md:py-28"
    >
      <div className="mx-auto max-w-3xl">
        <SectionHeading eyebrow="FAQ" title="Frequently asked questions" />

        <Reveal className="mt-12 flex flex-col gap-3">
          {faqs.map((faq, i) => {
            const isOpen = open === i
            return (
              <div
                key={faq.q}
                className="overflow-hidden rounded-xl border border-border bg-card"
              >
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition-colors hover:bg-muted/40"
                >
                  <span className="text-[15px] font-medium text-foreground">
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={cn(
                      'size-5 shrink-0 text-muted-foreground transition-transform duration-300',
                      isOpen && 'rotate-180 text-primary',
                    )}
                  />
                </button>
                <div
                  className={cn(
                    'grid transition-all duration-300 ease-out',
                    isOpen
                      ? 'grid-rows-[1fr] opacity-100'
                      : 'grid-rows-[0fr] opacity-0',
                  )}
                >
                  <div className="overflow-hidden">
                    <p className="px-5 pb-5 text-sm leading-relaxed text-muted-foreground">
                      {faq.a}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </Reveal>
      </div>
    </section>
  )
}

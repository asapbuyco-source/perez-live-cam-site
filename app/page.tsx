import { Navbar } from '@/components/navbar'
import { Hero } from '@/components/hero'
import { LogoStrip } from '@/components/logo-strip'
import { Showcase } from '@/components/showcase'
import { HowItWorks } from '@/components/how-it-works'
import { Features } from '@/components/features'
import { UseCases } from '@/components/use-cases'
import { Compatibility } from '@/components/compatibility'
import { DownloadSection } from '@/components/download'
import { Faq } from '@/components/faq'
import { SiteFooter } from '@/components/site-footer'

export default function Page() {
  return (
    <div id="top" className="min-h-screen bg-background">
      <Navbar />
      <main>
        <Hero />
        <LogoStrip />
        <Showcase />
        <HowItWorks />
        <Features />
        <UseCases />
        <Compatibility />
        <DownloadSection />
        <Faq />
      </main>
      <SiteFooter />
    </div>
  )
}

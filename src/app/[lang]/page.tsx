import { getTranslations, type Lang } from '@/lib/i18n'
import { Nav } from '@/components/Nav'
import { Hero } from '@/components/Hero'
import { StatsBar } from '@/components/StatsBar'
import { HowItWorks } from '@/components/HowItWorks'
import { About } from '@/components/About'
import { ProvidersCarousel } from '@/components/ProvidersCarousel'
import { Reviews } from '@/components/Reviews'
import { ComparisonTable } from '@/components/ComparisonTable'
import { FaqAccordion } from '@/components/FaqAccordion'
import { FinalCta } from '@/components/FinalCta'
import { Footer } from '@/components/Footer'
import { StickyWhatsApp } from '@/components/StickyWhatsApp'

interface Props { params: Promise<{ lang: string }> }

export default async function Home({ params }: Props) {
  const { lang: langStr } = await params
  const lang = langStr as Lang
  const t = getTranslations(lang)

  return (
    <>
      <Nav t={t.nav} lang={lang} />
      <main id="hero">
        <Hero t={t.hero} tForm={t.form} lang={lang} />
        <StatsBar stats={t.stats} />
        <HowItWorks t={t.howItWorks} />
        <About t={t.about} />
        <ProvidersCarousel t={t.providers} />
        <Reviews t={t.reviews} />
        <ComparisonTable t={t.comparison} />
        <FaqAccordion t={t.faq} lang={lang} preview />
        <FinalCta t={t.finalCta} />
      </main>
      <Footer t={t.footer} />
      <StickyWhatsApp />
    </>
  )
}

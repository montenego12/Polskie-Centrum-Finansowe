import { getPcfTranslations, VALID_PCF_LANGS, type Lang } from '@/lib/i18n/pcf'
import { notFound } from 'next/navigation'
import { PcfNav } from '@/components/pcf/Nav'
import { PcfHero } from '@/components/pcf/Hero'
import { PcfServicesOverview } from '@/components/pcf/ServicesOverview'
import { PcfTrust } from '@/components/pcf/Trust'
import { PcfAbout } from '@/components/pcf/About'
import { PcfReviews } from '@/components/pcf/Reviews'
import { PcfFaqAccordion } from '@/components/pcf/FaqAccordion'
import { PcfFinalCta } from '@/components/pcf/FinalCta'
import { PcfFooter } from '@/components/pcf/Footer'
import { StickyWhatsApp } from '@/components/StickyWhatsApp'

interface Props { params: Promise<{ lang: string }> }

export default async function PcfHome({ params }: Props) {
  const { lang: langStr } = await params
  const lang = langStr as Lang
  if (!VALID_PCF_LANGS.includes(lang)) notFound()
  const t = getPcfTranslations(lang)

  return (
    <>
      <PcfNav t={t.nav} lang={lang} />
      <main>
        <PcfHero t={t.hero} lang={lang} />
        <PcfServicesOverview t={t.services} lang={lang} />
        <PcfTrust t={t.trust} />
        <PcfAbout t={t.about} />
        <PcfReviews t={t.reviews} />
        <PcfFinalCta t={t.finalCta} />
        <PcfFaqAccordion t={t.faq} lang={lang} preview />
      </main>
      <PcfFooter t={t.footer} lang={lang} />
      <StickyWhatsApp />
    </>
  )
}

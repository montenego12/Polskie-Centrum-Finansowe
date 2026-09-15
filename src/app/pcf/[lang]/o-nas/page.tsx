import { getPcfTranslations, VALID_PCF_LANGS, type Lang } from '@/lib/i18n/pcf'
import { notFound } from 'next/navigation'
import { PcfNav } from '@/components/pcf/Nav'
import { PcfAbout } from '@/components/pcf/About'
import { PcfFinalCta } from '@/components/pcf/FinalCta'
import { PcfFooter } from '@/components/pcf/Footer'
import { StickyWhatsApp } from '@/components/StickyWhatsApp'
import type { Metadata } from 'next'

interface Props { params: Promise<{ lang: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params
  const title = 'O mnie — Patryk Kukliński, doradca finansowy w Niemczech | PCF'
  const description = 'Poznaj Patryka Kuklińskiego — doradcę finansowego Polskiego Centrum Finansowego w Magdeburgu. Pomagam Polakom w Niemczech od lat, po polsku, bez ukrytych kosztów.'
  return {
    metadataBase: new URL('https://finansewniemczech.de'),
    title,
    description,
    keywords: ['doradca finansowy Niemcy po polsku', 'Patryk Kukliński', 'Polskie Centrum Finansowe Magdeburg'],
    alternates: {
      canonical: `https://finansewniemczech.de/pcf/${lang}/o-nas`,
    },
    openGraph: {
      title,
      description,
      url: `https://finansewniemczech.de/pcf/${lang}/o-nas`,
      siteName: 'Polskie Centrum Finansowe w Niemczech',
      locale: lang === 'ua' ? 'uk_UA' : lang === 'de' ? 'de_DE' : 'pl_PL',
      type: 'website',
    },
  }
}

export default async function AboutPage({ params }: Props) {
  const { lang: langStr } = await params
  const lang = langStr as Lang
  if (!VALID_PCF_LANGS.includes(lang)) notFound()
  const t = getPcfTranslations(lang)

  return (
    <>
      <PcfNav t={t.nav} lang={lang} />
      <main className="pt-6">
        <PcfAbout t={t.about} standalone />
        <PcfFinalCta t={t.finalCta} />
      </main>
      <PcfFooter t={t.footer} lang={lang} />
      <StickyWhatsApp />
    </>
  )
}

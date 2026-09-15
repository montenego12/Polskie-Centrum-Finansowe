import { getPcfTranslations, VALID_PCF_LANGS, type Lang } from '@/lib/i18n/pcf'
import { notFound } from 'next/navigation'
import { PcfNav } from '@/components/pcf/Nav'
import { PcfInsuranceList } from '@/components/pcf/InsuranceList'
import { PcfFinalCta } from '@/components/pcf/FinalCta'
import { PcfFooter } from '@/components/pcf/Footer'
import { StickyWhatsApp } from '@/components/StickyWhatsApp'
import type { Metadata } from 'next'

interface Props { params: Promise<{ lang: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params
  const title = 'Ubezpieczenia w Niemczech po polsku — KFZ, życie, zdrowie, zęby | PCF'
  const description = 'Ubezpieczenie KFZ, na życie, zdrowotne, na zęby, od wypadków w Niemczech. Bezpłatne doradztwo po polsku. Porównujemy oferty Allianz, Generali, Advocard i innych.'
  return {
    metadataBase: new URL('https://finansewniemczech.de'),
    title,
    description,
    keywords: ['ubezpieczenie KFZ Niemcy', 'ubezpieczenie na życie Niemcy', 'ubezpieczenie na zęby Niemcy', 'ubezpieczenie zdrowotne Polak Niemcy'],
    alternates: {
      canonical: `https://finansewniemczech.de/pcf/${lang}/ubezpieczenia`,
    },
    openGraph: {
      title,
      description,
      url: `https://finansewniemczech.de/pcf/${lang}/ubezpieczenia`,
      siteName: 'Polskie Centrum Finansowe w Niemczech',
      locale: lang === 'ua' ? 'uk_UA' : lang === 'de' ? 'de_DE' : 'pl_PL',
      type: 'website',
    },
  }
}

export default async function InsurancePage({ params }: Props) {
  const { lang: langStr } = await params
  const lang = langStr as Lang
  if (!VALID_PCF_LANGS.includes(lang)) notFound()
  const t = getPcfTranslations(lang)

  return (
    <>
      <PcfNav t={t.nav} lang={lang} />
      <main className="pt-6">
        <PcfInsuranceList t={t.insurance} />
        <PcfFinalCta t={t.finalCta} />
      </main>
      <PcfFooter t={t.footer} lang={lang} />
      <StickyWhatsApp message="Szukasz ubezpieczenia w Niemczech? Pomogę dobrać najlepszą opcję — bezpłatnie i po polsku 😊" />
    </>
  )
}

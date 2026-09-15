import { getPcfTranslations, VALID_PCF_LANGS, type Lang } from '@/lib/i18n/pcf'
import { notFound } from 'next/navigation'
import { PcfNav } from '@/components/pcf/Nav'
import { PcfLoansList } from '@/components/pcf/LoansList'
import { PcfFinalCta } from '@/components/pcf/FinalCta'
import { PcfFooter } from '@/components/pcf/Footer'
import { StickyWhatsApp } from '@/components/StickyWhatsApp'
import type { Metadata } from 'next'

interface Props { params: Promise<{ lang: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params
  const title = 'Kredyty i finansowanie w Niemczech po polsku — hipoteka, auto, Bausparkasse | PCF'
  const description = 'Kredyt gotówkowy, hipoteczny, na auto i Bausparkasse w Niemczech. Doradztwo po polsku, bezpłatnie. Santander, Deutsche Bank, Badenia i inne.'
  return {
    metadataBase: new URL('https://finansewniemczech.de'),
    title,
    description,
    keywords: ['kredyt Niemcy Polak', 'kredyt hipoteczny Niemcy', 'Bausparkasse po polsku', 'finansowanie auta Niemcy'],
    alternates: {
      canonical: `https://finansewniemczech.de/pcf/${lang}/kredyty`,
    },
    openGraph: {
      title,
      description,
      url: `https://finansewniemczech.de/pcf/${lang}/kredyty`,
      siteName: 'Polskie Centrum Finansowe w Niemczech',
      locale: lang === 'ua' ? 'uk_UA' : lang === 'de' ? 'de_DE' : 'pl_PL',
      type: 'website',
    },
  }
}

export default async function LoansPage({ params }: Props) {
  const { lang: langStr } = await params
  const lang = langStr as Lang
  if (!VALID_PCF_LANGS.includes(lang)) notFound()
  const t = getPcfTranslations(lang)

  return (
    <>
      <PcfNav t={t.nav} lang={lang} />
      <main className="pt-6">
        <PcfLoansList t={t.loans} extras={t.extras} />
        <PcfFinalCta t={t.finalCta} />
      </main>
      <PcfFooter t={t.footer} lang={lang} />
      <StickyWhatsApp />
    </>
  )
}

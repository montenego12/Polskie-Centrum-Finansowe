import { getPcfTranslations, VALID_PCF_LANGS, type Lang } from '@/lib/i18n/pcf'
import { notFound } from 'next/navigation'
import { PcfNav } from '@/components/pcf/Nav'
import { PcfServiceDetail } from '@/components/pcf/ServiceDetail'
import { PcfFinalCta } from '@/components/pcf/FinalCta'
import { PcfFooter } from '@/components/pcf/Footer'
import { StickyWhatsApp } from '@/components/StickyWhatsApp'
import type { Metadata } from 'next'

const BAUSPAR_ITEMS = [
  {
    icon: '🏠',
    name: 'Bausparen — kasa budowlana',
    german: 'Bausparvertrag (Badenia)',
    desc: 'Systematyczne oszczędzanie na własne mieszkanie lub dom z gwarantowanym oprocentowaniem kredytu już od podpisania umowy. Nasz partner Badenia działa od ponad 80 lat.',
  },
  {
    icon: '🏛️',
    name: 'Wohnungsbauprämie',
    german: 'Premia mieszkaniowa od państwa',
    desc: 'Dofinansowanie od państwa dla osób oszczędzających na własne mieszkanie — do 70 € rocznie dla singli i do 140 € rocznie dla małżeństw. Bezpłatnie pomagamy złożyć wniosek.',
  },
  {
    icon: '💶',
    name: 'Arbeitnehmer-Sparzulage',
    german: 'Dopłata pracownicza',
    desc: 'Dodatkowe dofinansowanie od państwa dla pracowników etatowych, którzy część wynagrodzenia przeznaczają na kasę budowlaną. Do 43 € rocznie — bezpłatnie sprawdzimy czy Ci przysługuje.',
  },
  {
    icon: '📉',
    name: 'Gwarantowane oprocentowanie kredytu',
    german: 'Garantierter Darlehenszins',
    desc: 'Już w momencie podpisania umowy masz zagwarantowane oprocentowanie przyszłego kredytu budowlanego — niezależnie od sytuacji na rynku i stóp procentowych NBP czy EBC.',
  },
  {
    icon: '👶',
    name: 'Riester-Bausparen',
    german: 'Riester-Bausparvertrag',
    desc: 'Połączenie kasy budowlanej z dopłatami Riester — do 175 € rocznie dla Ciebie oraz 300 € za każde dziecko. Idealne dla rodzin planujących zakup nieruchomości.',
  },
  {
    icon: '🔨',
    name: 'Kredyt budowlany',
    german: 'Bauspardarlehen',
    desc: 'Po fazie oszczędzania możesz skorzystać z taniego kredytu budowlanego na remont, modernizację lub zakup nieruchomości — na warunkach ustalonych już przy podpisaniu umowy.',
  },
]

interface Props { params: Promise<{ lang: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params
  const title = 'Bausparkasse w Niemczech po polsku — kasa budowlana | PCF'
  const description = 'Oszczędzanie na własne mieszkanie w Niemczech — Bausparvertrag, dopłaty od państwa, gwarantowane oprocentowanie kredytu. Doradztwo po polsku, współpraca z Badenia.'
  return {
    metadataBase: new URL('https://finansewniemczech.de'),
    title,
    description,
    keywords: ['Bausparkasse po polsku', 'kasa budowlana Niemcy', 'Bausparvertrag Polak', 'oszczędzanie na mieszkanie Niemcy'],
    alternates: {
      canonical: `https://finansewniemczech.de/pcf/${lang}/bausparkasse`,
    },
    openGraph: {
      title,
      description,
      url: `https://finansewniemczech.de/pcf/${lang}/bausparkasse`,
      siteName: 'Polskie Centrum Finansowe w Niemczech',
      locale: lang === 'ua' ? 'uk_UA' : lang === 'de' ? 'de_DE' : 'pl_PL',
      type: 'website',
    },
  }
}

export default async function BausparkassePage({ params }: Props) {
  const { lang: langStr } = await params
  const lang = langStr as Lang
  if (!VALID_PCF_LANGS.includes(lang)) notFound()
  const t = getPcfTranslations(lang)

  return (
    <>
      <PcfNav t={t.nav} lang={lang} />
      <main className="pt-6">
        <PcfServiceDetail
          label="BAUSPARKASSE"
          title="Oszczędzanie na własne"
          titleAccent="mieszkanie w Niemczech"
          subtitle="Kasa budowlana (Bausparkasse) to jeden z najlepszych sposobów na sfinansowanie własnej nieruchomości w Niemczech — z dofinansowaniem od państwa i gwarantowanym oprocentowaniem kredytu. Wyjaśniamy wszystko po polsku."
          items={BAUSPAR_ITEMS}
          note="Współpracujemy z Badenia — jedną z największych prywatnych kas budowlanych w Niemczech z ponad 80-letnią historią. Bezpłatnie dobierzemy produkt dopasowany do Twojej sytuacji i pomożemy skorzystać ze wszystkich dostępnych dopłat państwowych."
        />
        <PcfFinalCta t={t.finalCta} />
      </main>
      <PcfFooter t={t.footer} lang={lang} />
      <StickyWhatsApp />
    </>
  )
}

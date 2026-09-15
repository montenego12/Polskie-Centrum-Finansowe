import { getPcfTranslations, VALID_PCF_LANGS, type Lang } from '@/lib/i18n/pcf'
import { notFound } from 'next/navigation'
import { PcfNav } from '@/components/pcf/Nav'
import { PcfServiceDetail } from '@/components/pcf/ServiceDetail'
import { PcfFinalCta } from '@/components/pcf/FinalCta'
import { PcfFooter } from '@/components/pcf/Footer'
import { StickyWhatsApp } from '@/components/StickyWhatsApp'
import type { Metadata } from 'next'

const BANKING_ITEMS = [
  {
    icon: '🏦',
    name: 'ZinsKonto Plus (Deutsche Bank)',
    german: 'Girokonto',
    desc: 'Bezpłatne konto bankowe z oprocentowaniem od pierwszego euro. Bezpłatne wypłaty gotówki na całym świecie. Dostępne wyłącznie przez DVAG dla naszych klientów.',
  },
  {
    icon: '💳',
    name: 'Karta kredytowa z bonusami',
    german: 'Kreditkarte mit Bonusprogramm',
    desc: 'Opcjonalna karta kredytowa z programem nagród. Zbieraj punkty za zakupy i korzystaj z dodatkowych benefitów przy codziennych płatnościach.',
  },
  {
    icon: '📈',
    name: 'Parkdepot Flex',
    german: 'Kurzfristige Geldanlage',
    desc: 'Elastyczna inwestycja krótkoterminowa z atrakcyjnym oprocentowaniem — alternatywa dla tradycyjnych kont oszczędnościowych. Twoje środki są zawsze dostępne.',
  },
  {
    icon: '🔒',
    name: 'FestzinsSparen',
    german: 'Festgeld',
    desc: 'Stałe oprocentowanie przez cały okres umowy — gwarantowany zwrot i pełna ochrona kapitału. Idealne jako stabilna podstawa planu oszczędnościowego.',
  },
  {
    icon: '📱',
    name: 'Bankowość online',
    german: 'Online-Banking',
    desc: 'Pełny dostęp do konta przez aplikację mobilną Deutsche Bank. Przelewy, historia transakcji, zarządzanie kartami — 24/7, bez konieczności wizyty w oddziale.',
  },
  {
    icon: '🌍',
    name: 'Konto dla cudzoziemców',
    german: 'Konto für Ausländer',
    desc: 'Pomagamy otworzyć konto bankowe nawet jeśli jesteś nowy w Niemczech i nie znasz dobrze języka. Przeprowadzimy Cię przez cały proces — po polsku.',
  },
]

interface Props { params: Promise<{ lang: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params
  const title = 'Konto bankowe w Niemczech po polsku — Deutsche Bank | PCF'
  const description = 'Bezpłatne konto bankowe w Niemczech, karta kredytowa, oszczędności. Otwieramy konto szybko i bez kolejek, po polsku. Współpraca z Deutsche Bank.'
  return {
    metadataBase: new URL('https://finansewniemczech.de'),
    title,
    description,
    keywords: ['konto bankowe Niemcy', 'konto bankowe Niemcy Polak', 'Deutsche Bank po polsku', 'Girokonto Niemcy'],
    alternates: {
      canonical: `https://finansewniemczech.de/pcf/${lang}/bankowosc`,
    },
    openGraph: {
      title,
      description,
      url: `https://finansewniemczech.de/pcf/${lang}/bankowosc`,
      siteName: 'Polskie Centrum Finansowe w Niemczech',
      locale: lang === 'ua' ? 'uk_UA' : lang === 'de' ? 'de_DE' : 'pl_PL',
      type: 'website',
    },
  }
}

export default async function BankowoscPage({ params }: Props) {
  const { lang: langStr } = await params
  const lang = langStr as Lang
  if (!VALID_PCF_LANGS.includes(lang)) notFound()
  const t = getPcfTranslations(lang)

  return (
    <>
      <PcfNav t={t.nav} lang={lang} />
      <main className="pt-6">
        <PcfServiceDetail
          label="BANKOWOŚĆ OSOBISTA"
          title="Bezpłatne konto i usługi bankowe"
          titleAccent="w Niemczech"
          subtitle="Współpracujemy z Deutsche Bank — otwieramy konto bankowe szybko i bez kolejek, prowadzimy przez cały proces po polsku. Bez ukrytych opłat, bez barier językowych."
          items={BANKING_ITEMS}
          note="Wszystkie produkty bankowe oferujemy we współpracy z Deutsche Bank AG — jednym z największych banków w Niemczech. Jako doradca DVAG mam dostęp do ofert niedostępnych standardowo w oddziale."
        />
        <PcfFinalCta t={t.finalCta} />
      </main>
      <PcfFooter t={t.footer} lang={lang} />
      <StickyWhatsApp />
    </>
  )
}

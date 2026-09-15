import { getPcfTranslations, VALID_PCF_LANGS, type Lang } from '@/lib/i18n/pcf'
import { notFound } from 'next/navigation'
import { PcfNav } from '@/components/pcf/Nav'
import { PcfServiceDetail } from '@/components/pcf/ServiceDetail'
import { PcfFinalCta } from '@/components/pcf/FinalCta'
import { PcfFooter } from '@/components/pcf/Footer'
import { StickyWhatsApp } from '@/components/StickyWhatsApp'
import type { Metadata } from 'next'

const INVESTMENT_ITEMS = [
  {
    icon: '📊',
    name: 'Fondssparen — plan funduszowy',
    german: 'Fondssparplan ab 25 €/Monat',
    desc: 'Regularne inwestowanie w fundusze już od 25 € miesięcznie. Elastyczny wybór funduszy, możliwość zmiany kwoty w dowolnym momencie. Długoterminowe budowanie majątku bez dużego kapitału na start.',
  },
  {
    icon: '💼',
    name: 'db AnlageDepot',
    german: 'Wertpapierdepot (Deutsche Bank)',
    desc: 'Rachunek papierów wartościowych z dostępem do szerokich możliwości rynku kapitałowego. Zarządzany przez doświadczonych specjalistów Deutsche Bank — dla klientów DVAG.',
  },
  {
    icon: '🏆',
    name: 'PremiumDepot',
    german: 'Strategisches Portfolio-Management',
    desc: 'Portfel inwestycyjny dostosowany do Twojego profilu ryzyka — konserwatywny, zrównoważony lub wzrostowy. Zarządzany przez profesjonalnych zarządzających funduszami z wieloletnim doświadczeniem.',
  },
  {
    icon: '⭐',
    name: 'Champions Select',
    german: 'Selektive Geldanlage',
    desc: 'Selektywna inwestycja łącząca dyscyplinę inwestycyjną z aktywną alokacją aktywów. Dla osób szukających ponadprzeciętnych wyników przy zachowaniu odpowiedniego poziomu bezpieczeństwa.',
  },
  {
    icon: '👴',
    name: 'Riester-Rente',
    german: 'Staatlich geförderte Altersvorsorge',
    desc: 'Prywatna emerytura z dofinansowaniem państwowym — do 175 € rocznie dla Ciebie i 300 € za każde dziecko. Dodatkowo odliczenia podatkowe. Bezpłatnie sprawdzimy czy Ci przysługuje.',
  },
  {
    icon: '📋',
    name: 'Basisrente (Rürup)',
    german: 'Steueroptimierte Altersvorsorge',
    desc: 'Emerytura z ulgą podatkową szczególnie korzystna dla samozatrudnionych i osób z wyższymi dochodami. Składki odliczasz od podatku — w 2025 r. nawet do 27 566 € rocznie.',
  },
  {
    icon: '🏢',
    name: 'bAV — emerytura przez pracodawcę',
    german: 'Betriebliche Altersvorsorge',
    desc: 'Pracownicze ubezpieczenie emerytalne finansowane z wynagrodzenia brutto — płacisz mniej podatku i składek ZUS (DRV), a pracodawca dokłada obowiązkowo 15% oszczędzonej kwoty.',
  },
  {
    icon: '👶',
    name: 'Zabezpieczenie dla dzieci',
    german: 'Kinderkonzept',
    desc: 'Plan oszczędnościowy lub inwestycyjny dla dzieci — start już od urodzenia. Kapitał na studia, mieszkanie czy start w dorosłe życie. Mały wkład miesięczny, duży efekt po 18-20 latach.',
  },
]

interface Props { params: Promise<{ lang: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params
  const title = 'Inwestycje i emerytura w Niemczech po polsku | PCF'
  const description = 'Fundusze inwestycyjne, prywatna emerytura z dofinansowaniem od państwa (Riester, Rürup, bAV) w Niemczech. Bezpłatne doradztwo po polsku, dopasowane do Twojej sytuacji.'
  return {
    metadataBase: new URL('https://finansewniemczech.de'),
    title,
    description,
    keywords: ['inwestycje Niemcy po polsku', 'emerytura Niemcy Polak', 'Riester Rente po polsku', 'fundusze inwestycyjne Niemcy'],
    alternates: {
      canonical: `https://finansewniemczech.de/pcf/${lang}/inwestycje`,
    },
    openGraph: {
      title,
      description,
      url: `https://finansewniemczech.de/pcf/${lang}/inwestycje`,
      siteName: 'Polskie Centrum Finansowe w Niemczech',
      locale: lang === 'ua' ? 'uk_UA' : lang === 'de' ? 'de_DE' : 'pl_PL',
      type: 'website',
    },
  }
}

export default async function InwestycjePage({ params }: Props) {
  const { lang: langStr } = await params
  const lang = langStr as Lang
  if (!VALID_PCF_LANGS.includes(lang)) notFound()
  const t = getPcfTranslations(lang)

  return (
    <>
      <PcfNav t={t.nav} lang={lang} />
      <main className="pt-6">
        <PcfServiceDetail
          label="INWESTYCJE I EMERYTURA"
          title="Buduj majątek i zabezpiecz"
          titleAccent="swoją przyszłość"
          subtitle="Fundusze inwestycyjne, plany oszczędnościowe, prywatna emerytura z dofinansowaniem od państwa — dobieramy produkty dopasowane do Twojej sytuacji i celów. Wszystko wyjaśniamy po polsku."
          items={INVESTMENT_ITEMS}
          note="DVAG zarządza aktywami o wartości ponad 50 miliardów euro i obsługuje ponad 8 milionów klientów. Jako certyfikowany doradca mam dostęp do szerokiego portfela produktów inwestycyjnych niedostępnych bezpośrednio w bankach."
        />
        <PcfFinalCta t={t.finalCta} />
      </main>
      <PcfFooter t={t.footer} lang={lang} />
      <StickyWhatsApp />
    </>
  )
}

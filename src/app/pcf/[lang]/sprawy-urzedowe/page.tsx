import { getPcfTranslations, VALID_PCF_LANGS, type Lang } from '@/lib/i18n/pcf'
import { notFound } from 'next/navigation'
import { PcfNav } from '@/components/pcf/Nav'
import { PcfServiceDetail } from '@/components/pcf/ServiceDetail'
import { PcfFinalCta } from '@/components/pcf/FinalCta'
import { PcfFooter } from '@/components/pcf/Footer'
import { StickyWhatsApp } from '@/components/StickyWhatsApp'
import type { Metadata } from 'next'

const ADMIN_ITEMS = [
  {
    icon: '👶',
    name: 'Kindergeld — zasiłek na dziecko',
    german: 'Kindergeld',
    desc: 'Zasiłek rodzinny w Niemczech to 255 € miesięcznie na pierwsze i drugie dziecko (od 2025 r.). Pomagamy złożyć wniosek do Familienkasse i upewnić się, że otrzymujesz wszystko co Ci się należy.',
  },
  {
    icon: '📄',
    name: 'Steuererklärung — rozliczenie podatkowe',
    german: 'Einkommensteuererklärung',
    desc: 'Roczne rozliczenie podatku dochodowego w Niemczech. Wielu Polaków przepłaca podatek lub nie odlicza przysługujących ulg. Pomagamy odzyskać nadpłacony podatek z Finanzamt.',
  },
  {
    icon: '🏛️',
    name: 'Finanzamt — urząd skarbowy',
    german: 'Finanzamt',
    desc: 'Kontakt z niemieckim urzędem skarbowym — pisma, wyjaśnienia, wnioski. Tłumaczymy dokumenty i pomagamy odpowiedzieć na pisma z Finanzamt bez stresu i barier językowych.',
  },
  {
    icon: '👴',
    name: 'DRV — emerytura i ZUS',
    german: 'Deutsche Rentenversicherung',
    desc: 'Weryfikacja stażu pracy w Niemczech, przeliczanie składek emerytalnych, koordynacja z polskim ZUS. Sprawdzamy czy Twoje lata pracy w Niemczech są prawidłowo zaewidencjonowane.',
  },
  {
    icon: '🍼',
    name: 'Elterngeld — zasiłek rodzicielski',
    german: 'Elterngeld / ElterngeldPlus',
    desc: 'Zasiłek dla rodziców po narodzinach dziecka — do 1 800 € miesięcznie przez 12-14 miesięcy. Pomagamy obliczyć należną kwotę i poprawnie złożyć wniosek do Elterngeldstelle.',
  },
  {
    icon: '🏠',
    name: 'Wohngeld — dodatek mieszkaniowy',
    german: 'Wohngeld',
    desc: 'Dofinansowanie do kosztów mieszkania dla osób z niższymi dochodami. Sprawdzamy czy spełniasz warunki i pomagamy złożyć wniosek do Wohngeldstelle.',
  },
  {
    icon: '📋',
    name: 'Anmeldung i formalności',
    german: 'Behördengänge',
    desc: 'Pomoc przy rejestracji miejsca zamieszkania (Anmeldung), wyrabianiu dokumentów, korespondencji z urzędami — tłumaczymy pisma i wyjaśniamy co zrobić krok po kroku.',
  },
  {
    icon: '💼',
    name: 'Selbstständigkeit — działalność gospodarcza',
    german: 'Gewerbe / Freiberufler',
    desc: 'Zakładanie działalności w Niemczech — Gewerbe lub Freiberufler. Pomagamy wybrać właściwą formę, przejść przez rejestrację i dobrać odpowiednie ubezpieczenia dla przedsiębiorców.',
  },
]

interface Props { params: Promise<{ lang: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params
  const title = 'Sprawy urzędowe w Niemczech po polsku — Kindergeld, Elterngeld, DRV | PCF'
  const description = 'Pomoc z niemiecką biurokracją po polsku — Kindergeld, Elterngeld, Wohngeld, DRV, Finanzamt, Anmeldung. Bezpłatne doradztwo, bez barier językowych.'
  return {
    metadataBase: new URL('https://finansewniemczech.de'),
    title,
    description,
    keywords: ['Kindergeld po polsku', 'Elterngeld Niemcy Polak', 'sprawy urzędowe Niemcy', 'DRV emerytura Niemcy', 'Wohngeld po polsku'],
    alternates: {
      canonical: `https://finansewniemczech.de/pcf/${lang}/sprawy-urzedowe`,
    },
    openGraph: {
      title,
      description,
      url: `https://finansewniemczech.de/pcf/${lang}/sprawy-urzedowe`,
      siteName: 'Polskie Centrum Finansowe w Niemczech',
      locale: lang === 'ua' ? 'uk_UA' : lang === 'de' ? 'de_DE' : 'pl_PL',
      type: 'website',
    },
  }
}

export default async function SprawyUrzedowePage({ params }: Props) {
  const { lang: langStr } = await params
  const lang = langStr as Lang
  if (!VALID_PCF_LANGS.includes(lang)) notFound()
  const t = getPcfTranslations(lang)

  return (
    <>
      <PcfNav t={t.nav} lang={lang} />
      <main className="pt-6">
        <PcfServiceDetail
          label="SPRAWY URZĘDOWE"
          title="Pomoc z niemiecką biurokracją"
          titleAccent="w Twoim języku"
          subtitle="Kindergeld, Steuererklärung, DRV, Elterngeld — pomagamy Polakom i Ukraińcom poruszać się po niemieckich urzędach. Bez barier językowych, bez stresu, krok po kroku."
          items={ADMIN_ITEMS}
          note="Wiele osób nie wie, że nie korzysta ze świadczeń które im przysługują. Szacujemy, że przeciętna polska rodzina z dwójką dzieci może odzyskać lub uzyskać nawet kilka tysięcy euro rocznie — z Kindergeld, Elterngeld, ulg podatkowych i Wohngeld razem wziętych."
        />
        <PcfFinalCta t={t.finalCta} />
      </main>
      <PcfFooter t={t.footer} lang={lang} />
      <StickyWhatsApp />
    </>
  )
}

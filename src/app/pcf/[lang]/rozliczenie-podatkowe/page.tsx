import type { Metadata } from 'next'
import { getPcfTranslations, VALID_PCF_LANGS, type Lang } from '@/lib/i18n/pcf'
import { notFound } from 'next/navigation'
import { PcfNav } from '@/components/pcf/Nav'
import { PcfFinalCta } from '@/components/pcf/FinalCta'
import { PcfFooter } from '@/components/pcf/Footer'
import { StickyWhatsApp } from '@/components/StickyWhatsApp'

interface Props { params: Promise<{ lang: string }> }

const TAX_META: Record<Lang, { title: string; description: string }> = {
  pl: {
    title: 'Rozliczenie Podatkowe w Niemczech po Polsku | Steuererklärung 2025 | PCF',
    description: 'Rozliczenie podatkowe w Niemczech po polsku — średnio 800–2500 € zwrotu. Pomagamy złożyć Steuererklärung za 2022, 2023, 2024 i 2025. Bezpłatna wycena. Magdeburg i całe Niemcy.',
  },
  ua: {
    title: 'Податкова декларація в Німеччині українською | Steuererklärung 2025 | PCF',
    description: 'Податкова декларація у Німеччині українською — в середньому 800–2500 € повернення. Подаємо Steuererklärung за 2022, 2023, 2024 і 2025 роки. Безкоштовна оцінка. Магдебург і вся Німеччина.',
  },
  de: {
    title: 'Steuererklärung in Deutschland auf Polnisch/Ukrainisch | 2025 | PCF',
    description: 'Steuererklärung in Deutschland — durchschnittlich 800–2500 € Rückerstattung. Wir helfen bei der Erklärung für 2022, 2023, 2024 und 2025. Kostenlose Einschätzung. Magdeburg und ganz Deutschland.',
  },
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params
  const { title, description } = TAX_META[lang as Lang] ?? TAX_META.pl
  return {
    metadataBase: new URL('https://finansewniemczech.de'),
    title,
    description,
    keywords: [
      'rozliczenie podatkowe Niemcy', 'Steuererklärung po polsku', 'zwrot podatku z Niemiec',
      'rozliczenie podatku Niemcy Polak', 'Steuererklärung Niemcy', 'zwrot podatku Niemcy 2025',
      'rozliczenie podatkowe Niemcy po polsku', 'Finanzamt po polsku', 'podatek Niemcy Polacy',
    ],
    alternates: {
      canonical: `https://finansewniemczech.de/pcf/${lang}/rozliczenie-podatkowe`,
    },
    openGraph: {
      title,
      description,
      url: `https://finansewniemczech.de/pcf/${lang}/rozliczenie-podatkowe`,
      siteName: 'Polskie Centrum Finansowe w Niemczech',
      locale: lang === 'ua' ? 'uk_UA' : lang === 'de' ? 'de_DE' : 'pl_PL',
      type: 'website',
    },
  }
}

const DEDUCTIONS = [
  { icon: '🚗', name: 'Koszty dojazdu do pracy', german: 'Fahrtkosten / Pendlerpauschale', desc: 'Odliczasz 0,30 € za każdy km od domu do pracy (od 21. km — 0,38 €). Przy 30 km dziennie i 220 dniach pracy to nawet 1 980 € odliczenia rocznie.' },
  { icon: '🏠', name: 'Podwójne prowadzenie gospodarstwa', german: 'Doppelte Haushaltsführung', desc: 'Jeśli mieszkasz w Polsce, a pracujesz w Niemczech — możesz odliczyć koszty wynajmu, przyjazdy do rodziny i koszty utrzymania. Nawet do 1 000 € miesięcznie.' },
  { icon: '👔', name: 'Koszty ubrań i narzędzi pracy', german: 'Werbungskosten', desc: 'Odzież robocza, narzędzia, materiały używane wyłącznie do pracy, kursy i szkolenia zawodowe — wszystko można odliczyć. Minimum 1 230 € ryczałtem bez paragonów.' },
  { icon: '👶', name: 'Koszty opieki nad dziećmi', german: 'Kinderbetreuungskosten', desc: 'Przedszkole, żłobek, opiekunka — 2/3 kosztów opieki możesz odliczyć od podatku, maksymalnie 4 000 € na dziecko rocznie.' },
  { icon: '🏥', name: 'Koszty leczenia', german: 'Außergewöhnliche Belastungen', desc: 'Wydatki na leki, leczenie, okulary, aparat słuchowy — ponad pewien próg możesz odliczyć od podatku. Szczególnie ważne przy większych kosztach medycznych.' },
  { icon: '📚', name: 'Szkolenia i kursy językowe', german: 'Fortbildungskosten', desc: 'Kurs języka niemieckiego, szkolenia zawodowe, studia podyplomowe — jeśli są związane z pracą, odliczysz pełne koszty. Kurs językowy nawet jako Werbungskosten.' },
  { icon: '💻', name: 'Home office i sprzęt', german: 'Homeoffice-Pauschale', desc: 'Praca zdalna? Od 2023 r. odliczasz 6 € za każdy dzień pracy z domu, max 1 260 € rocznie. Sprzęt komputerowy do 800 € jednorazowo w roku zakupu.' },
  { icon: '💰', name: 'Składki na ubezpieczenia', german: 'Vorsorgeaufwendungen', desc: 'Składki na ubezpieczenie emerytalne, zdrowotne, rentowe — częściowo lub w całości odliczasz od podstawy opodatkowania. To często kilka tysięcy euro ulgi.' },
]

const STEPS = [
  { n: '1', title: 'Kontakt — bezpłatna wycena', desc: 'Napisz na WhatsApp lub wyślij zapytanie. Opowiedz o swojej sytuacji — umowa o pracę, klasa podatkowa, dzieci, dojazdy. Wyceniam bezpłatnie.' },
  { n: '2', title: 'Zbieramy dokumenty', desc: 'Potrzebne: Lohnsteuerbescheinigung (od pracodawcy), Identifikationsnummer, oraz dokumenty potwierdzające ulgi. Pomogę Ci skompletować wszystko krok po kroku.' },
  { n: '3', title: 'Przygotowuję deklarację', desc: 'Wypełniam formularz ESt 1A z uwzględnieniem wszystkich przysługujących Ci ulg. Sprawdzam każdy możliwy odliczenie — nic nie przepada.' },
  { n: '4', title: 'Składam do Finanzamt', desc: 'Wysyłam deklarację elektronicznie przez ELSTER bezpośrednio do właściwego Finanzamtu. Dostajesz kopię dokumentów i śledzisz status.' },
  { n: '5', title: 'Zwrot na konto', desc: 'Finanzamt przelewa zwrot podatku bezpośrednio na Twoje konto — zazwyczaj w ciągu 3–6 miesięcy od złożenia deklaracji.' },
]

const FAQ = [
  { q: 'Czy muszę robić Steuererklärung?', a: 'Nie zawsze — ale w większości przypadków WARTO. Średnio 800–2500 € zwrotu rocznie. Obowiązek jest m.in. przy wielu pracodawcach, klasie podatkowej III/V, lub dochodach z kilku źródeł.' },
  { q: 'Za ile lat wstecz mogę się rozliczyć?', a: 'W 2026 roku możesz złożyć deklaracje za lata 2022, 2023, 2024 i 2025. To nawet do 10 000 € zwrotu łącznie — jeśli nie składałeś wcześniej.' },
  { q: 'Ile kosztuje rozliczenie?', a: 'Wycena jest bezpłatna. Koszt rozliczenia ustalamy indywidualnie — zazwyczaj jest to ułamek kwoty zwrotu jaki dla Ciebie uzyskam.' },
  { q: 'Muszę osobiście przyjeżdżać?', a: 'Nie. Całe rozliczenie robimy zdalnie przez WhatsApp, e-mail lub wideo-rozmowę. Dokumenty możesz przesłać zdjęciem przez telefon.' },
  { q: 'Czy rozliczasz osoby pracujące sezonowo?', a: 'Tak. Osoby pracujące sezonowo lub przez część roku często mają nadpłacony podatek — właśnie dla nich zwrot bywa najwyższy.' },
  { q: 'Co jeśli mam dochody z Polski i Niemiec?', a: 'To wymaga szczególnej uwagi — unikamy podwójnego opodatkowania zgodnie z umową między Polską a Niemcami. Specjalizuję się w takich przypadkach.' },
]

export default async function RozliczeniePodatkowePage({ params }: Props) {
  const { lang: langStr } = await params
  const lang = langStr as Lang
  if (!VALID_PCF_LANGS.includes(lang)) notFound()
  const t = getPcfTranslations(lang)
  const waNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '4917683425546'

  return (
    <>
      <PcfNav t={t.nav} lang={lang} />
      <main>

        {/* Hero */}
        <section className="bg-white px-6 py-16 md:py-24 md:px-12">
          <div className="mx-auto max-w-4xl text-center">
            <p className="mb-4 text-xs font-bold uppercase tracking-widest text-[#c9a227]">Steuererklärung · Rozliczenie podatkowe w Niemczech</p>
            <h1 className="mb-5 text-4xl font-black leading-tight text-black md:text-5xl lg:text-6xl">
              Zwrot podatku<br />
              <span className="text-[#c9a227]">z Niemiec po polsku</span>
            </h1>
            <p className="mb-8 mx-auto max-w-2xl text-base leading-relaxed text-gray-600">
              Średnio <strong>800–2 500 € zwrotu rocznie</strong>. Rozliczamy za 2022, 2023, 2024 i 2025.
              Całość zdalnie — przez WhatsApp lub e-mail. Bezpłatna wycena.
            </p>
            <div className="mb-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {[
                { v: '800–2 500 €', l: 'średni zwrot rocznie' },
                { v: '4 lata', l: 'wstecz w 2026 r.' },
                { v: '3–6 mies.', l: 'czas oczekiwania' },
                { v: '100%', l: 'zdalnie po polsku' },
              ].map((s, i) => (
                <div key={i} className="rounded-2xl border-2 border-[#c9a227]/30 bg-[#c9a227]/5 p-4">
                  <p className="text-xl font-black text-[#c9a227]">{s.v}</p>
                  <p className="text-xs text-gray-500">{s.l}</p>
                </div>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a href={`https://wa.me/${waNumber}?text=Chcę%20się%20rozliczyć%20z%20podatku%20w%20Niemczech`} target="_blank" rel="noopener noreferrer"
                className="inline-block rounded-lg bg-black px-8 py-4 text-sm font-extrabold uppercase tracking-wide text-white transition hover:bg-gray-900">
                💬 Napisz na WhatsApp
              </a>
              <a href={`https://wa.me/${waNumber}`} target="_blank" rel="noopener noreferrer"
                className="inline-block rounded-lg border-2 border-black px-8 py-4 text-sm font-bold text-black transition hover:bg-black hover:text-white">
                Bezpłatna wycena →
              </a>
            </div>
          </div>
        </section>

        {/* Co można odliczyć */}
        <section className="bg-gray-50 px-6 py-20 md:px-12">
          <div className="mx-auto max-w-6xl">
            <p className="mb-3 text-center text-xs font-bold uppercase tracking-widest text-[#c9a227]">Ulgi podatkowe</p>
            <h2 className="mb-3 text-center text-3xl font-black text-black md:text-4xl">Co możesz odliczyć od podatku?</h2>
            <p className="mb-12 mx-auto max-w-2xl text-center text-sm text-gray-500">
              Większość Polaków nie korzysta ze wszystkich dostępnych ulg. Sprawdzamy każdą możliwość — nic nie przepada.
            </p>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {DEDUCTIONS.map((d, i) => (
                <div key={i} className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:border-[#c9a227]/40 hover:shadow-md">
                  <div className="mb-3 flex items-center gap-2">
                    <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-[#c9a227]/10 text-lg">{d.icon}</span>
                    <div>
                      <h3 className="text-xs font-bold text-gray-900">{d.name}</h3>
                      <p className="text-[10px] italic text-gray-400">{d.german}</p>
                    </div>
                  </div>
                  <p className="text-xs leading-relaxed text-gray-500">{d.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Jak to działa */}
        <section className="bg-black px-6 py-20 md:px-12">
          <div className="mx-auto max-w-4xl">
            <p className="mb-3 text-center text-xs font-bold uppercase tracking-widest text-[#c9a227]">Proces</p>
            <h2 className="mb-12 text-center text-3xl font-black text-white md:text-4xl">Jak wygląda rozliczenie?</h2>
            <div className="flex flex-col gap-6">
              {STEPS.map((s, i) => (
                <div key={i} className="flex gap-5 items-start">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-[#c9a227] text-sm font-black text-black">{s.n}</div>
                  <div>
                    <h3 className="mb-1 font-bold text-white">{s.title}</h3>
                    <p className="text-sm leading-relaxed text-gray-400">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-white px-6 py-20 md:px-12">
          <div className="mx-auto max-w-3xl">
            <p className="mb-3 text-center text-xs font-bold uppercase tracking-widest text-[#c9a227]">FAQ</p>
            <h2 className="mb-12 text-center text-3xl font-black text-black">Często zadawane pytania</h2>
            <div className="flex flex-col divide-y divide-gray-100">
              {FAQ.map((f, i) => (
                <div key={i} className="py-5">
                  <h3 className="mb-2 font-bold text-gray-900">{f.q}</h3>
                  <p className="text-sm leading-relaxed text-gray-500">{f.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <PcfFinalCta t={t.finalCta} />
      </main>
      <PcfFooter t={t.footer} lang={lang} />
      <StickyWhatsApp />
    </>
  )
}

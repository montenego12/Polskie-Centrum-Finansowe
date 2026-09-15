import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import type { Metadata } from 'next'
import { getPcfTranslations, VALID_PCF_LANGS, type Lang } from '@/lib/i18n/pcf'
import { GERMAN_CITIES, getCityBySlug, CITY_SLUGS } from '@/lib/pcf-cities'
import { PcfNav } from '@/components/pcf/Nav'
import { PcfFooter } from '@/components/pcf/Footer'
import { StickyWhatsApp } from '@/components/StickyWhatsApp'
import { HeroSlideshow } from '@/components/pcf/HeroSlideshow'

interface Props { params: Promise<{ lang: string; miasto: string }> }

export const dynamicParams = false

export async function generateStaticParams() {
  const params: { lang: string; miasto: string }[] = []
  for (const city of GERMAN_CITIES) {
    params.push({ lang: 'pl', miasto: city.slug })
  }
  return params
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, miasto } = await params
  const city = getCityBySlug(miasto)
  if (!city) return {}
  const displayName = city.namePolish ?? city.name
  const title = `Ubezpieczenia KFZ, podatki, ubezpieczenie na życie ${displayName} — Polak w Niemczech | PCF`
  const description = `Polskie Centrum Finansowe ${city.locative}. Ubezpieczenie KFZ, ubezpieczenie na życie, ubezpieczenie na zęby, rozliczenie podatkowe. Doradztwo po polsku — bezpłatna konsultacja.`
  return {
    metadataBase: new URL('https://finansewniemczech.de'),
    title,
    description,
    keywords: [
      `ubezpieczenia ${displayName}`,
      `ubezpieczenie KFZ ${displayName}`,
      `ubezpieczenie na życie ${displayName}`,
      `ubezpieczenie na zęby ${displayName}`,
      `rozliczenie podatkowe ${displayName}`,
      `doradca finansowy ${displayName}`,
      `Polak ${displayName} ubezpieczenia`,
      `polskie centrum finansowe ${displayName}`,
      `Kfz-Versicherung ${city.name} Pole`,
      `Steuerberatung ${city.name} polnisch`,
    ],
    alternates: {
      canonical: `https://finansewniemczech.de/pcf/${lang}/${miasto}`,
    },
    openGraph: {
      title: `Doradztwo finansowe po polsku ${city.locative}`,
      description: `Ubezpieczenia KFZ, podatki, ubezpieczenie na życie — profesjonalne doradztwo ${city.locative}.`,
      url: `https://finansewniemczech.de/pcf/${lang}/${miasto}`,
      siteName: 'Polskie Centrum Finansowe w Niemczech',
      type: 'website',
    },
  }
}

const SERVICES = [
  {
    image: 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=600&h=320&fit=crop',
    title: 'Ubezpieczenie KFZ',
    german: 'Kfz-Versicherung',
    desc: 'OC, AC, pełne ubezpieczenie pojazdu. Porównujemy oferty wielu towarzystw — wybierasz najlepszą cenę.',
    href: '/ubezpieczenia',
    badge: 'KFZ',
  },
  {
    image: 'https://images.unsplash.com/photo-1476703993599-0035a21b17a9?w=600&h=320&fit=crop',
    title: 'Ubezpieczenie na życie',
    german: 'Lebensversicherung',
    desc: 'Ochrona dla Ciebie i Twojej rodziny. Risikolebensversicherung, kapitałowe, terminowe.',
    href: '/ubezpieczenia',
    badge: 'ŻYCIE',
  },
  {
    image: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=600&h=320&fit=crop',
    title: 'Ubezpieczenie na zęby',
    german: 'Zahnzusatzversicherung',
    desc: 'Dopłaty NFZ nie pokrywają leczenia. Ubezpieczenie dodatkowe zwraca nawet 90% kosztów dentysty.',
    href: '/ubezpieczenia',
    badge: 'ZĘBY',
  },
  {
    image: 'https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=600&h=320&fit=crop',
    title: 'Ubezpieczenie zdrowotne',
    german: 'Krankenversicherung',
    desc: 'Pomoc w wyborze kasy chorych (GKV/PKV). Zmiana kasy — kiedy się opłaca i jak to zrobić.',
    href: '/ubezpieczenia',
    badge: 'ZDROWIE',
  },
  {
    image: 'https://images.unsplash.com/photo-1554224154-22dec7ec8818?w=600&h=320&fit=crop',
    title: 'Rozliczenie podatkowe',
    german: 'Steuererklärung',
    desc: 'Odzyskaj nawet kilka tysięcy euro z podatku. Rozliczamy za ostatnie 4 lata wstecz.',
    href: '/rozliczenie-podatkowe',
    badge: 'PODATKI',
  },
  {
    image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=600&h=320&fit=crop',
    title: 'Kredyt i Bausparkasse',
    german: 'Immobilienkredit · Bausparen',
    desc: 'Kredyt hipoteczny na dom lub mieszkanie w Niemczech. Bausparkasse — oszczędzasz i budujesz.',
    href: '/kredyty',
    badge: 'KREDYT',
  },
  {
    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600&h=320&fit=crop',
    title: 'Emerytura i inwestycje',
    german: 'Altersvorsorge · Investitionen',
    desc: 'Riester, Rürup, ETF. Planujemy Twoją emeryturę — z ulgami podatkowymi i dopłatami państwa.',
    href: '/inwestycje',
    badge: 'EMERYT.',
  },
  {
    image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&h=320&fit=crop',
    title: 'Konto bankowe i finanse',
    german: 'Bankkonto · Finanzberatung',
    desc: 'Bezpłatne konto w Niemczech, karty, przelewy. Pomoc przy zakładaniu konta dla obcokrajowców.',
    href: '/bankowosc',
    badge: 'BANKING',
  },
]

const FAQ = [
  {
    q: (locative: string) => `Czy dojeżdżasz do klientów ${locative}?`,
    a: () => 'Obsługuję klientów na terenie całych Niemiec — spotkania online przez Zoom lub WhatsApp. W okolicach Magdeburga możliwe również spotkanie osobiste.',
  },
  {
    q: () => 'Czy doradztwo jest naprawdę bezpłatne?',
    a: () => 'Tak, w 100%. Wynagrodzenie otrzymuję od towarzystw ubezpieczeniowych i banków — Ty nie płacisz nic.',
  },
  {
    q: () => 'Ile mogę odzyskać z podatku w Niemczech?',
    a: () => 'Średni zwrot wynosi od 500 do 3000 € rocznie. Zależy od Twoich wydatków, dojazdów do pracy, rodziny. Rozliczam za ostatnie 4 lata wstecz.',
  },
  {
    q: () => 'Jak długo trwa zmiana ubezpieczenia KFZ?',
    a: () => 'Zmianę można zgłosić w ciągu 24h. Najlepszy termin to jesień (do 30 listopada) — zmiana obowiązuje od 1 stycznia.',
  },
  {
    q: () => 'Czy ubezpieczenie na zęby opłaca się, jeśli mam NFZ?',
    a: () => 'Zdecydowanie tak. Ustawowe ubezpieczenie pokrywa tylko minimum. Prywatny dodatek zwraca 70–90% kosztów implantów, aparatów i leczenia kanałowego.',
  },
]

export default async function CityPage({ params }: Props) {
  const { lang: langStr, miasto } = await params
  const lang = langStr as Lang
  if (!VALID_PCF_LANGS.includes(lang)) notFound()
  const city = getCityBySlug(miasto)
  if (!city) notFound()

  const t = getPcfTranslations(lang)
  const base = `/pcf/${lang}`
  const displayName = city.namePolish ?? city.name
  const waNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '4917683425546'
  const waMsg = encodeURIComponent(`Dzień dobry! Szukam doradcy finansowego ${city.locative}. Chciałbym umówić bezpłatną konsultację.`)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FinancialService',
    name: `Polskie Centrum Finansowe — ${displayName}`,
    description: `Doradztwo finansowe po polsku ${city.locative}. Ubezpieczenia KFZ, na życie, zęby, rozliczenie podatkowe.`,
    url: `https://finansewniemczech.de/pcf/pl/${miasto}`,
    telephone: '+4917683425546',
    email: 'patryk.kuk@pm.me',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Halberstädter Str. 29A',
      addressLocality: 'Magdeburg',
      postalCode: '39112',
      addressCountry: 'DE',
    },
    areaServed: {
      '@type': 'City',
      name: city.name,
      addressCountry: 'DE',
    },
    serviceType: ['Kfz-Versicherung', 'Lebensversicherung', 'Zahnzusatzversicherung', 'Steuererklärung', 'Krankenversicherung', 'Immobilienkredit'],
    availableLanguage: ['Polish', 'German'],
    priceRange: 'Bezpłatne doradztwo',
    sameAs: ['https://tanipradwniemczech.de'],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PcfNav t={t.nav} lang={lang} />

      {/* HERO */}
      <section className="relative overflow-hidden bg-[#0a0a0a] px-6 py-20 md:px-12 md:py-28">
        <HeroSlideshow />
        <div className="pointer-events-none absolute inset-0 bg-black/65" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#c9a227]/8 via-transparent to-transparent" />
        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <p className="mb-4 inline-block rounded-full border border-[#c9a227]/30 bg-[#c9a227]/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-[#c9a227]">
            Polskie Centrum Finansowe · {city.state}
          </p>
          <h1 className="mb-5 text-4xl font-black leading-tight text-white md:text-6xl">
            Doradztwo finansowe<br />
            <span className="text-[#c9a227]">{city.locative}</span>
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-white/60">
            Ubezpieczenie KFZ, na życie, na zęby, rozliczenie podatkowe — profesjonalne doradztwo po polsku {city.locative}. Bezpłatna konsultacja online lub telefoniczne.
          </p>
          <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <a
              href={`https://wa.me/${waNumber}?text=${waMsg}`}
              target="_blank" rel="noopener noreferrer"
              className="w-full rounded-xl bg-[#c9a227] px-8 py-4 text-sm font-bold uppercase tracking-wide text-black transition hover:bg-[#b8891e] sm:w-auto"
            >
              Bezpłatna konsultacja — WhatsApp
            </a>
            <a href="tel:+4917683425546" className="w-full rounded-xl border border-white/15 px-8 py-4 text-sm font-bold text-white transition hover:border-[#c9a227] hover:text-[#c9a227] sm:w-auto">
              +49 176 83425546
            </a>
          </div>
          {/* breadcrumb */}
          <p className="mt-8 text-xs text-white/30">
            <Link href={base} className="hover:text-white/60 transition">Polskie Centrum Finansowe</Link>
            {' → '}
            <span className="text-white/50">{displayName}</span>
          </p>
        </div>
      </section>

      {/* SERVICES GRID */}
      <section className="bg-gray-300 px-6 py-16 md:px-12">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 text-center">
            <p className="mb-2 text-xs font-bold uppercase tracking-widest text-[#c9a227]">Nasza oferta {city.locative}</p>
            <h2 className="text-3xl font-black text-gray-900">Co dla Ciebie zrobimy</h2>
            <p className="mt-2 text-sm text-gray-500">Pełne doradztwo finansowe po polsku — bez ukrytych kosztów</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {SERVICES.map((s, i) => (
              <Link key={i} href={`${base}${s.href}`}
                className="group flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-gray-200 transition hover:border-[#c9a227]/40 hover:shadow-md">
                <div className="relative h-28 w-full">
                  <Image
                    src={s.image}
                    alt={s.title}
                    fill
                    priority={i < 2}
                    className="object-cover"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 20vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <span className="absolute right-2 top-2 rounded-full bg-black/40 px-2 py-0.5 text-[9px] font-bold tracking-widest text-white backdrop-blur-sm">{s.badge}</span>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <p className="mb-0.5 text-sm font-black text-gray-900 group-hover:text-[#c9a227] transition">{s.title}</p>
                  <p className="mb-3 text-[10px] font-medium text-gray-400">{s.german}</p>
                  <p className="text-xs leading-relaxed text-gray-600 flex-1">{s.desc}</p>
                  <p className="mt-3 text-[10px] font-bold uppercase tracking-wide text-[#c9a227]">Dowiedz się więcej →</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* WHY US */}
      <section className="bg-gray-200 px-6 py-16 md:px-12">
        <div className="mx-auto max-w-4xl">
          <div className="mb-10 text-center">
            <p className="mb-2 text-xs font-bold uppercase tracking-widest text-[#c9a227]">Dlaczego my</p>
            <h2 className="text-3xl font-black text-gray-900">Doradca po polsku {city.locative}</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            {[
              { icon: '🇵🇱', title: 'Obsługa po polsku', desc: `Rozumiem specyfikę życia Polaka ${city.locative}. Tłumaczę każdy dokument.` },
              { icon: '💰', title: '100% bezpłatne', desc: 'Doradztwo jest bezpłatne. Wynagrodzenie pochodzi od firm ubezpieczeniowych i banków.' },
              { icon: '📱', title: 'Online lub telefon', desc: `Obsługuję klientów z ${displayName} przez WhatsApp, Zoom lub telefon — bez konieczności wychodzenia z domu.` },
              { icon: '⭐', title: 'Doświadczony doradca', desc: 'Kilka lat doświadczenia w finansach w Niemczech. Partner Deutsche Vermögensberatung (DVAG).' },
              { icon: '🔒', title: 'Bezpieczeństwo danych', desc: 'Twoje dane są chronione zgodnie z RODO / DSGVO. Pełna poufność.' },
              { icon: '⚡', title: 'Szybka odpowiedź', desc: 'Odpisuję na WhatsApp zazwyczaj w ciągu godziny w godzinach roboczych.' },
            ].map((item, i) => (
              <div key={i} className="flex gap-3 rounded-xl border border-gray-200 bg-gray-300 p-4">
                <span className="text-xl shrink-0">{item.icon}</span>
                <div>
                  <p className="text-sm font-bold text-gray-900">{item.title}</p>
                  <p className="mt-0.5 text-xs leading-relaxed text-gray-500">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-gray-300 px-6 py-16 md:px-12">
        <div className="mx-auto max-w-2xl">
          <div className="mb-10 text-center">
            <p className="mb-2 text-xs font-bold uppercase tracking-widest text-[#c9a227]">FAQ</p>
            <h2 className="text-3xl font-black text-gray-900">Najczęstsze pytania</h2>
          </div>
          <div className="space-y-3">
            {FAQ.map((item, i) => (
              <details key={i} className="group rounded-xl border border-gray-200 bg-gray-200 open:bg-gray-100 transition-all">
                <summary className="flex cursor-pointer items-center justify-between px-5 py-4 text-sm font-bold text-gray-900">
                  {item.q(city.locative)}
                  <span className="ml-4 shrink-0 text-[#c9a227] group-open:rotate-180 transition-transform">▾</span>
                </summary>
                <p className="px-5 pb-4 text-sm leading-relaxed text-gray-600">{item.a()}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#0a0a0a] px-6 py-20 md:px-12 text-center">
        <div className="mx-auto max-w-2xl">
          <p className="mb-3 text-xs font-bold uppercase tracking-widest text-[#c9a227]">Bezpłatna konsultacja</p>
          <h2 className="mb-4 text-3xl font-black text-white md:text-4xl">
            Napisz do mnie {city.locative}
          </h2>
          <p className="mb-8 text-white/60">
            Ubezpieczenie KFZ, podatki, ubezpieczenie na życie lub na zęby — odpowiem na każde pytanie. Bezpłatnie, po polsku.
          </p>
          <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <a
              href={`https://wa.me/${waNumber}?text=${waMsg}`}
              target="_blank" rel="noopener noreferrer"
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#25d366] px-8 py-4 text-sm font-bold text-white transition hover:bg-[#20c55e] sm:w-auto"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              WhatsApp {city.locative}
            </a>
            <a href="tel:+4917683425546" className="w-full rounded-xl border border-white/15 px-8 py-4 text-sm font-bold text-white transition hover:border-[#c9a227] hover:text-[#c9a227] sm:w-auto">
              Zadzwoń: +49 176 83425546
            </a>
          </div>
        </div>
      </section>

      {/* OTHER CITIES */}
      <section className="bg-gray-200 px-6 py-12 md:px-12">
        <div className="mx-auto max-w-6xl">
          <p className="mb-6 text-xs font-bold uppercase tracking-widest text-gray-500 text-center">Obsługujemy również</p>
          <div className="flex flex-wrap justify-center gap-2">
            {GERMAN_CITIES.filter(c => c.slug !== miasto).slice(0, 30).map(c => (
              <Link key={c.slug} href={`${base}/${c.slug}`}
                className="rounded-full border border-gray-300 bg-gray-300 px-3 py-1.5 text-xs text-gray-600 transition hover:border-[#c9a227] hover:text-[#c9a227]">
                {c.namePolish ?? c.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <PcfFooter t={t.footer} lang={lang} />
      <StickyWhatsApp message={`Szukasz doradcy finansowego ${city.locative}? Pomogę dobrać najlepszą ofertę — bezpłatnie i po polsku 😊`} />
    </>
  )
}

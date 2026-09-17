import { getTranslations, type Lang } from '@/lib/i18n'
import { Nav } from '@/components/Nav'
import { About } from '@/components/About'
import { FinalCta } from '@/components/FinalCta'
import { Footer } from '@/components/Footer'
import { StickyWhatsApp } from '@/components/StickyWhatsApp'
import type { Metadata } from 'next'

interface Props { params: Promise<{ lang: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params
  const title = lang === 'ua'
    ? 'Про мене — Patryk Kukliński, фінансовий радник у Німеччині | Tani Prąd'
    : 'O mnie — Patryk Kukliński, doradca finansowy w Niemczech | Tani Prąd'
  const description = lang === 'ua'
    ? 'Познайомтесь з Patryk Kukliński — фінансовим радником, який допомагає полякам та українцям в Німеччині заощаджувати на електриці та газі.'
    : 'Poznaj Patryka Kuklińskiego — doradcę finansowego, który pomaga Polakom i Ukraińcom w Niemczech oszczędzać na prądzie i gazie.'
  return {
    metadataBase: new URL('https://tanipradwniemczech.de'),
    title,
    description,
    alternates: {
      canonical: `https://tanipradwniemczech.de/${lang}/about`,
    },
    openGraph: {
      title,
      description,
      url: `https://tanipradwniemczech.de/${lang}/about`,
      siteName: 'Tani Prąd w Niemczech',
      locale: lang === 'ua' ? 'uk_UA' : 'pl_PL',
      type: 'website',
    },
  }
}

export default async function AboutPage({ params }: Props) {
  const { lang: langStr } = await params
  const lang = langStr as Lang
  const t = getTranslations(lang)
  return (
    <>
      <Nav t={t.nav} lang={lang} />
      <main className="pt-10">
        <About t={t.about} standalone />
        <FinalCta t={t.finalCta} />
      </main>
      <Footer t={t.footer} lang={lang} />
      <StickyWhatsApp />
    </>
  )
}

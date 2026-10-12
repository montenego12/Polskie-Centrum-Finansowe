import { getPcfTranslations, VALID_PCF_LANGS, type Lang } from '@/lib/i18n/pcf'
import { notFound } from 'next/navigation'
import { PcfNav } from '@/components/pcf/Nav'
import { PcfFooter } from '@/components/pcf/Footer'
import { StickyWhatsApp } from '@/components/StickyWhatsApp'
import Script from 'next/script'
import type { Metadata } from 'next'

interface Props { params: Promise<{ lang: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params
  const title = 'Blog — Finanse, podatki i ubezpieczenia w Niemczech | PCF'
  const description = 'Praktyczne porady o finansach, podatkach, kredytach i ubezpieczeniach w Niemczech. Po polsku, od doradcy Polskiego Centrum Finansowego.'
  return {
    metadataBase: new URL('https://finansewniemczech.de'),
    title,
    description,
    alternates: {
      canonical: `https://finansewniemczech.de/pcf/${lang}/blog`,
    },
    openGraph: {
      title,
      description,
      url: `https://finansewniemczech.de/pcf/${lang}/blog`,
      siteName: 'Polskie Centrum Finansowe w Niemczech',
      locale: lang === 'ua' ? 'uk_UA' : lang === 'de' ? 'de_DE' : 'pl_PL',
      type: 'website',
    },
  }
}

export default async function BlogPage({ params }: Props) {
  const { lang: langStr } = await params
  const lang = langStr as Lang
  if (!VALID_PCF_LANGS.includes(lang)) notFound()
  const t = getPcfTranslations(lang)

  return (
    <>
      <PcfNav t={t.nav} lang={lang} />
      <main className="mx-auto min-h-[60vh] max-w-6xl px-6 pb-16 pt-10 md:px-12">
        <div id="soro-blog" />
        <Script src="https://app.trysoro.com/api/embed/870be721-8df0-491c-8f89-7f4535af3035" strategy="afterInteractive" />
      </main>
      <PcfFooter t={t.footer} lang={lang} />
      <StickyWhatsApp />
    </>
  )
}

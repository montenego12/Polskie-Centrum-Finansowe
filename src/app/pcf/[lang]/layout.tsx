import type { Metadata } from 'next'
import { getPcfTranslations, VALID_PCF_LANGS, type Lang } from '@/lib/i18n/pcf'
import { notFound } from 'next/navigation'

interface Props {
  children: React.ReactNode
  params: Promise<{ lang: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params
  if (!VALID_PCF_LANGS.includes(lang as Lang)) return {}
  const t = getPcfTranslations(lang)

  return {
    metadataBase: new URL('https://finansewniemczech.de'),
    title: t.meta.title,
    description: t.meta.description,
    alternates: {
      canonical: `https://finansewniemczech.de/pcf/${lang}`,
      languages: {
        'pl': 'https://finansewniemczech.de/pcf/pl',
        'uk': 'https://finansewniemczech.de/pcf/ua',
        'x-default': 'https://finansewniemczech.de/pcf/pl',
      },
    },
    openGraph: {
      title: t.meta.title,
      description: t.meta.description,
      url: `https://finansewniemczech.de/pcf/${lang}`,
      siteName: 'Polskie Centrum Finansowe w Niemczech',
      locale: lang === 'ua' ? 'uk_UA' : 'pl_PL',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: t.meta.title,
      description: t.meta.description,
    },
  }
}

export function generateStaticParams() {
  return VALID_PCF_LANGS.map(lang => ({ lang }))
}

export default async function PcfLangLayout({ children, params }: Props) {
  const { lang } = await params
  if (!VALID_PCF_LANGS.includes(lang as Lang)) notFound()
  return <>{children}</>
}

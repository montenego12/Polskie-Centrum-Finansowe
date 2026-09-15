import type { Metadata } from 'next'
import { getTranslations, type Lang } from '@/lib/i18n'
import { notFound } from 'next/navigation'

const VALID_LANGS: Lang[] = ['pl', 'ua']

interface Props {
  children: React.ReactNode
  params: Promise<{ lang: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params
  if (!VALID_LANGS.includes(lang as Lang)) return {}
  const t = getTranslations(lang)

  return {
    metadataBase: new URL('https://tanipradwniemczech.de'),
    title: t.meta.title,
    description: t.meta.description,
    alternates: {
      canonical: `https://tanipradwniemczech.de/${lang}`,
      languages: {
        'pl': 'https://tanipradwniemczech.de/pl',
        'uk': 'https://tanipradwniemczech.de/ua',
        'x-default': 'https://tanipradwniemczech.de/pl',
      },
    },
    openGraph: {
      title: t.meta.title,
      description: t.meta.description,
      url: `https://tanipradwniemczech.de/${lang}`,
      siteName: 'Tani Prąd w Niemczech',
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
  return VALID_LANGS.map(lang => ({ lang }))
}

export default async function LangLayout({ children, params }: Props) {
  const { lang } = await params
  if (!VALID_LANGS.includes(lang as Lang)) notFound()
  return (
    <html lang={lang === 'ua' ? 'uk' : 'pl'}>
      <body>{children}</body>
    </html>
  )
}

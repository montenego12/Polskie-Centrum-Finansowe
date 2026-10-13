import { getPcfTranslations, VALID_PCF_LANGS, type Lang } from '@/lib/i18n/pcf'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { PcfNav } from '@/components/pcf/Nav'
import { PcfFooter } from '@/components/pcf/Footer'
import { StickyWhatsApp } from '@/components/StickyWhatsApp'
import { PCF_ARTICLES } from '@/lib/pcf-articles'
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
      canonical: `https://finansewniemczech.de/${lang}/blog`,
    },
    openGraph: {
      title,
      description,
      url: `https://finansewniemczech.de/${lang}/blog`,
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
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {PCF_ARTICLES.map(article => (
            <Link key={article.slug} href={`/${lang}/blog/${article.slug}`}
              className="group flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/5 transition hover:border-[#c9a227]/40">
              <div className="relative h-32 w-full">
                <Image src={article.coverImage} alt={article.title} fill className="object-cover" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" />
              </div>
              <div className="flex flex-1 flex-col p-5">
                <p className="mb-2 text-sm font-black text-white group-hover:text-[#c9a227] transition">{article.title}</p>
                <p className="text-xs leading-relaxed text-white/50 flex-1">{article.excerpt}</p>
                <p className="mt-3 text-[10px] font-bold uppercase tracking-wide text-[#c9a227]">Czytaj więcej →</p>
              </div>
            </Link>
          ))}
        </div>
      </main>
      <PcfFooter t={t.footer} lang={lang} />
      <StickyWhatsApp />
    </>
  )
}

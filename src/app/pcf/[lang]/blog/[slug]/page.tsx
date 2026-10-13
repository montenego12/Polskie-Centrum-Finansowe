import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getPcfTranslations, VALID_PCF_LANGS, type Lang } from '@/lib/i18n/pcf'
import { getArticleBySlug, ARTICLE_SLUGS } from '@/lib/pcf-articles'
import { PcfNav } from '@/components/pcf/Nav'
import { PcfArticleBody } from '@/components/pcf/ArticleBody'
import { PcfFinalCta } from '@/components/pcf/FinalCta'
import { PcfFooter } from '@/components/pcf/Footer'
import { StickyWhatsApp } from '@/components/StickyWhatsApp'
import type { Metadata } from 'next'

interface Props { params: Promise<{ lang: string; slug: string }> }

export const dynamicParams = false

export async function generateStaticParams() {
  return ARTICLE_SLUGS.map(slug => ({ lang: 'pl', slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, slug } = await params
  const article = getArticleBySlug(slug)
  if (!article) return {}
  return {
    metadataBase: new URL('https://finansewniemczech.de'),
    title: `${article.title} | PCF`,
    description: article.metaDescription,
    keywords: article.keywords,
    alternates: {
      canonical: `https://finansewniemczech.de/${lang}/blog/${slug}`,
    },
    openGraph: {
      title: article.title,
      description: article.metaDescription,
      url: `https://finansewniemczech.de/${lang}/blog/${slug}`,
      siteName: 'Polskie Centrum Finansowe w Niemczech',
      type: 'article',
      publishedTime: article.publishDate,
    },
  }
}

export default async function ArticlePage({ params }: Props) {
  const { lang: langStr, slug } = await params
  const lang = langStr as Lang
  if (!VALID_PCF_LANGS.includes(lang)) notFound()
  const article = getArticleBySlug(slug)
  if (!article) notFound()
  const t = getPcfTranslations(lang)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: article.title,
    description: article.metaDescription,
    datePublished: article.publishDate,
    author: { '@type': 'Person', name: 'Patryk Kukliński' },
    publisher: { '@type': 'Organization', name: 'Polskie Centrum Finansowe w Niemczech' },
    mainEntityOfPage: `https://finansewniemczech.de/${lang}/blog/${slug}`,
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PcfNav t={t.nav} lang={lang} />
      <main className="bg-gray-300 px-6 pb-20 pt-10 md:px-12">
        <div className="mx-auto max-w-3xl">
          <p className="mb-6 text-xs text-gray-500">
            <Link href={`/${lang}/blog`} className="hover:text-[#c9a227] transition">Blog</Link>
            {' → '}
            <span className="text-gray-400">{article.title}</span>
          </p>
          <h1 className="mb-3 text-3xl font-black leading-tight text-gray-900 md:text-4xl">{article.title}</h1>
          <p className="mb-10 text-xs text-gray-400">
            {new Date(article.publishDate).toLocaleDateString('pl-PL', { day: 'numeric', month: 'long', year: 'numeric' })}
          </p>
          <PcfArticleBody sections={article.sections} />
        </div>
      </main>
      <PcfFinalCta t={t.finalCta} />
      <PcfFooter t={t.footer} lang={lang} />
      <StickyWhatsApp />
    </>
  )
}

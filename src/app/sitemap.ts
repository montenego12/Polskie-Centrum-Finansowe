import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://tanipradwniemczech.de'
  const langs = ['pl', 'ua']
  const paths = ['', '/faq', '/about']

  return langs.flatMap(lang =>
    paths.map(path => ({
      url: `${base}/${lang}${path}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: path === '' ? 1 : 0.8,
    }))
  )
}

import type { MetadataRoute } from 'next'
import { GERMAN_CITIES } from '@/lib/pcf-cities'

export default function sitemap(): MetadataRoute.Sitemap {
  const tpBase = 'https://tanipradwniemczech.de'
  const pcfBase = 'https://finansewniemczech.de'
  const tpLangs = ['pl', 'ua']
  const pcfLangs = ['pl']

  const tpPaths = ['', '/faq', '/about']
  const pcfCorePaths = [
    '',
    '/ubezpieczenia',
    '/kredyty',
    '/o-nas',
    '/faq',
    '/rozliczenie-podatkowe',
    '/inwestycje',
    '/bankowosc',
    '/bausparkasse',
    '/sprawy-urzedowe',
  ]

  const tpUrls: MetadataRoute.Sitemap = tpLangs.flatMap(lang =>
    tpPaths.map(path => ({
      url: `${tpBase}/${lang}${path}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: path === '' ? 1 : 0.8,
    }))
  )

  const pcfCoreUrls: MetadataRoute.Sitemap = pcfLangs.flatMap(lang =>
    pcfCorePaths.map(path => ({
      url: `${pcfBase}/pcf/${lang}${path}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: path === '' ? 0.9 : 0.7,
    }))
  )

  const cityUrls: MetadataRoute.Sitemap = GERMAN_CITIES.map(city => ({
    url: `${pcfBase}/pcf/pl/${city.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: city.slug === 'magdeburg' ? 0.9 : 0.7,
  }))

  return [...tpUrls, ...pcfCoreUrls, ...cityUrls]
}

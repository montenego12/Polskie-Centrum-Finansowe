import type { Translations, Lang } from '@/lib/i18n'

interface Props {
  t: Translations
  lang: Lang
}

export function JsonLd({ t, lang }: Props) {
  const localBusiness = {
    '@context': 'https://schema.org',
    '@type': 'FinancialService',
    name: 'Tani Prąd w Niemczech',
    description: t.meta.description,
    url: `https://tanipradwniemczech.de/${lang}`,
    telephone: '+4917683425546',
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+4917683425546',
      contactType: 'customer service',
      availableLanguage: ['Polish', 'Ukrainian'],
    },
    employee: {
      '@type': 'Person',
      name: 'Patryk Kukliński',
      jobTitle: lang === 'ua' ? 'Фінансовий радник' : 'Doradca finansowy',
    },
    areaServed: {
      '@type': 'Country',
      name: 'Germany',
    },
    serviceType: lang === 'ua'
      ? 'Фінансове консультування з вибору тарифів на електроенергію та газ'
      : 'Doradztwo finansowe w zakresie wyboru taryf na prąd i gaz',
    priceRange: lang === 'ua' ? 'Безкоштовно' : 'Bezpłatnie',
    sameAs: [
      'https://www.facebook.com/groups/pracawniemczech',
    ],
  }

  const faqPage = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: t.faq.items.map(item => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a,
      },
    })),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPage) }}
      />
    </>
  )
}

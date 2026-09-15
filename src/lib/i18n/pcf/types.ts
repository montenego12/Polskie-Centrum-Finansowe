export type Lang = 'pl' | 'ua' | 'de'

export interface PcfTranslations {
  meta: { title: string; description: string }
  nav: {
    offer: string
    insurance: string
    loans: string
    taxes: string
    about: string
    faq: string
    whatsapp: string
    switchTo: string
  }
  hero: {
    badge: string
    title: string
    titleAccent: string
    subtitle: string
    checks: string[]
    cta: string
    ctaWa: string
  }
  stats: Array<{ value: string; label: string }>
  services: {
    label: string
    title: string
    titleAccent: string
    categories: Array<{
      icon: string
      title: string
      desc: string
      items: string[]
      href: string
      cta: string
    }>
  }
  trust: {
    label: string
    title: string
    points: string[]
    partnersLabel: string
  }
  insurance: {
    label: string
    title: string
    titleAccent: string
    subtitle: string
    items: Array<{ icon: string; name: string; german: string; desc: string }>
  }
  loans: {
    label: string
    title: string
    titleAccent: string
    subtitle: string
    items: Array<{ icon: string; name: string; desc: string }>
  }
  extras: {
    label: string
    title: string
    titleAccent: string
    items: Array<{ icon: string; name: string; desc: string }>
  }
  about: {
    label: string
    name: string
    role: string
    quote: string
    desc: string
    imgAlt: string
    address: string
    benefits: Array<{ icon: string; title: string; desc: string }>
  }
  reviews: {
    label: string
    title: string
    rating: string
    ratingCount: string
    items: Array<{ text: string; name: string; city: string; service: string }>
  }
  faq: {
    label: string
    title: string
    items: Array<{ q: string; a: string }>
    more: string
  }
  finalCta: {
    label: string
    title: string
    titleAccent: string
    subtitle: string
    wa: string
    email: string
  }
  footer: {
    address: string
    rights: string
    privacy: string
    impressum: string
    switchTo: string
  }
}

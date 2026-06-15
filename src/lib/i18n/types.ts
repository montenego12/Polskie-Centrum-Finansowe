export type Lang = 'pl' | 'ua'

export interface Translations {
  meta: { title: string; description: string }
  nav: {
    howItWorks: string
    about: string
    reviews: string
    faq: string
    whatsapp: string
  }
  hero: {
    badge: string
    title: string
    titleAccent: string
    subtitle: string
    checks: string[]
    formTitle: string
    fields: {
      name: string
      phone: string
      email: string
      city: string
      electricity: string
      gas: string
      upload: string
      uploadHint: string
    }
    cta: string
    ctaWa: string
  }
  stats: Array<{ value: string; label: string }>
  howItWorks: {
    label: string
    title: string
    steps: Array<{ icon: string; title: string; desc: string }>
  }
  about: {
    label: string
    name: string
    role: string
    quote: string
    desc: string
    benefits: Array<{ icon: string; title: string; desc: string }>
  }
  providers: { title: string; names: string[] }
  reviews: {
    label: string
    title: string
    items: Array<{ text: string; name: string; city: string; savings: string }>
  }
  comparison: {
    title: string
    subtitle: string
    us: string
    them: string
    rows: string[]
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
    form: string
  }
  footer: {
    rights: string
    fb1: string
    fb2: string
    privacy: string
    impressum: string
  }
  form: {
    success: string
    error: string
    sending: string
  }
}

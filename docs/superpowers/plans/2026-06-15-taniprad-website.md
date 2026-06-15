# Tani Prąd w Niemczech — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Zbudować stronę sprzedażową tanipradwniemczech.de generującą leady — formularz kontaktowy, WhatsApp CTA, panel admina, wersje PL i UA.

**Architecture:** Next.js 14 App Router z dynamicznym segmentem `[lang]` dla dwujęzyczności. Formularze zapisywane do Supabase i wysyłane mailem przez Resend. Panel admina chroniony hasłem przez Next.js middleware.

**Tech Stack:** Next.js 14, TypeScript, Tailwind CSS, Supabase, Resend, Vercel

---

## Mapa plików

```
src/
  app/
    [lang]/
      layout.tsx          # metadata, hreflang, lang atrybut HTML
      page.tsx            # strona główna (wszystkie sekcje)
      faq/page.tsx        # pełna lista FAQ
      about/page.tsx      # O mnie / Про мене
    admin/
      page.tsx            # panel leadów
    api/
      leads/route.ts      # POST — zapis leadu
      leads/[id]/route.ts # PATCH — zmiana statusu leadu
    page.tsx              # redirect → /pl
    layout.tsx            # root layout (fonty, favicon)
  components/
    Nav.tsx               # sticky nav, przełącznik języka
    Hero.tsx              # hero layout (grid 2-kolumn)
    LeadForm.tsx          # formularz z walidacją (client)
    StatsBar.tsx          # 4 statystyki
    HowItWorks.tsx        # 4 kroki
    About.tsx             # zdjęcie Patryka + korzyści
    ProvidersCarousel.tsx # auto-scrolling logotypy
    Reviews.tsx           # 3 karty z opiniami
    ComparisonTable.tsx   # tabela vs porównywarki
    FaqAccordion.tsx      # accordion (client)
    FinalCta.tsx          # końcowe CTA
    Footer.tsx            # stopka z FB linkami
    StickyWhatsApp.tsx    # fixed button (client)
  lib/
    i18n/
      types.ts            # typ Lang + interfejs Translations
      pl.ts               # polskie treści
      ua.ts               # ukraińskie treści
      index.ts            # getTranslations(lang)
    supabase/
      client.ts           # createClient (anon, browser)
      server.ts           # createClient (service role, server)
    resend.ts             # sendLeadEmail()
    validate-lead.ts      # walidacja danych formularza
  middleware.ts           # redirect / → /pl, ochrona /admin
  __tests__/
    validate-lead.test.ts
    api-leads.test.ts
    middleware.test.ts
public/
  patryk.jpg              # skopiowane z Downloads
.env.local                # zmienne środowiskowe
```

---

## Task 1: Scaffolding projektu

**Files:**
- Create: `package.json`, `tsconfig.json`, `tailwind.config.ts`, `next.config.ts`, `.env.local`, `.env.local.example`, `public/patryk.jpg`

- [ ] **Krok 1: Utwórz projekt Next.js**

```bash
cd C:/Users/Patryk/TaniPrad
npx create-next-app@latest . --typescript --tailwind --app --src-dir --import-alias "@/*" --no-git
```

Kiedy zapyta o ESLint — Yes. Turbopack — No (stabilność).

- [ ] **Krok 2: Zainstaluj zależności**

```bash
npm install @supabase/supabase-js resend
npm install -D jest @types/jest jest-environment-jsdom @testing-library/react @testing-library/jest-dom ts-jest
```

- [ ] **Krok 3: Skonfiguruj Jest**

Utwórz `jest.config.ts`:

```typescript
import type { Config } from 'jest'
import nextJest from 'next/jest.js'

const createJestConfig = nextJest({ dir: './' })

const config: Config = {
  coverageProvider: 'v8',
  testEnvironment: 'jsdom',
  setupFilesAfterFramework: ['<rootDir>/jest.setup.ts'],
  moduleNameMapper: { '^@/(.*)$': '<rootDir>/src/$1' },
}

export default createJestConfig(config)
```

Utwórz `jest.setup.ts`:

```typescript
import '@testing-library/jest-dom'
```

- [ ] **Krok 4: Skopiuj zdjęcie Patryka**

```bash
cp "C:/Users/Patryk/Downloads/481082102_1747158726016885_7808489550504134885_n.jpg" "C:/Users/Patryk/TaniPrad/public/patryk.jpg"
```

- [ ] **Krok 5: Utwórz .env.local**

```bash
cat > .env.local << 'EOF'
NEXT_PUBLIC_WHATSAPP_NUMBER=4917683425546
NEXT_PUBLIC_SUPABASE_URL=https://TWOJ_PROJEKT.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=twoj_anon_key
SUPABASE_SERVICE_ROLE_KEY=twoj_service_role_key
RESEND_API_KEY=re_twoj_klucz
ADMIN_PASSWORD=twoje_haslo_admina
CONTACT_EMAIL=kontakt.kontakt125@protonmail.com
EOF
```

Utwórz `.env.local.example` (bez wartości — do commitu):

```
NEXT_PUBLIC_WHATSAPP_NUMBER=
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
RESEND_API_KEY=
ADMIN_PASSWORD=
CONTACT_EMAIL=
```

- [ ] **Krok 6: Commit**

```bash
git init
echo ".env.local" >> .gitignore
echo ".superpowers/" >> .gitignore
git add -A
git commit -m "feat: initial Next.js 14 project scaffold"
```

---

## Task 2: Tailwind design system

**Files:**
- Modify: `tailwind.config.ts`
- Modify: `src/app/globals.css`

- [ ] **Krok 1: Rozszerz Tailwind o kolory i animacje**

Zastąp zawartość `tailwind.config.ts`:

```typescript
import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        dark: {
          DEFAULT: '#0a0f1e',
          800: '#0d1b3e',
          900: '#060a14',
        },
        gold: {
          DEFAULT: '#fbd38d',
          600: '#f6ad55',
        },
        brand: {
          DEFAULT: '#2b6cb0',
          900: '#1a365d',
        },
        wa: '#25D366',
        cta: '#e53e3e',
      },
      keyframes: {
        gradientShift: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        fadeInUp: {
          from: { opacity: '0', transform: 'translateY(30px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        orbFloat: {
          '0%': { transform: 'translate(0,0) scale(1)' },
          '33%': { transform: 'translate(30px,-20px) scale(1.05)' },
          '66%': { transform: 'translate(-20px,10px) scale(0.95)' },
          '100%': { transform: 'translate(0,0) scale(1)' },
        },
        borderGlow: {
          '0%, 100%': { borderColor: 'rgba(251,211,141,0.2)' },
          '50%': { borderColor: 'rgba(251,211,141,0.6)' },
        },
        pulse: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(251,211,141,0.4)' },
          '50%': { boxShadow: '0 0 0 12px rgba(251,211,141,0)' },
        },
        waPulse: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(37,211,102,0.5)' },
          '50%': { boxShadow: '0 0 0 12px rgba(37,211,102,0)' },
        },
        scrollX: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        gradientShift: 'gradientShift 12s ease infinite',
        float: 'float 6s ease-in-out infinite',
        shimmer: 'shimmer 2s linear infinite',
        fadeInUp: 'fadeInUp 0.6s ease both',
        orbFloat: 'orbFloat 8s ease-in-out infinite',
        borderGlow: 'borderGlow 4s ease-in-out infinite',
        pulse: 'pulse 2.5s infinite',
        waPulse: 'waPulse 2s infinite',
        scrollX: 'scrollX 30s linear infinite',
      },
      backgroundSize: {
        '400': '400% 400%',
        '200': '200% auto',
      },
    },
  },
  plugins: [],
}

export default config
```

- [ ] **Krok 2: Ustaw globalne style**

Zastąp `src/app/globals.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  html { scroll-behavior: smooth; }
  body { background-color: #0a0f1e; color: #fff; }
}

@layer utilities {
  .glass {
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.10);
    backdrop-filter: blur(20px);
  }
  .glass-top::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(251,211,141,0.5), transparent);
  }
  .text-gradient {
    background: linear-gradient(135deg, #fbd38d, #f6ad55);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
}
```

- [ ] **Krok 3: Commit**

```bash
git add tailwind.config.ts src/app/globals.css
git commit -m "feat: tailwind design system — colors, animations, glass utilities"
```

---

## Task 3: i18n — tłumaczenia i routing

**Files:**
- Create: `src/lib/i18n/types.ts`
- Create: `src/lib/i18n/pl.ts`
- Create: `src/lib/i18n/ua.ts`
- Create: `src/lib/i18n/index.ts`
- Create: `src/app/page.tsx` (redirect)
- Create: `src/app/layout.tsx` (root)
- Create: `src/middleware.ts`
- Create: `src/__tests__/middleware.test.ts`

- [ ] **Krok 1: Napisz test dla middleware**

Utwórz `src/__tests__/middleware.test.ts`:

```typescript
import { middleware } from '@/middleware'
import { NextRequest } from 'next/server'

function makeRequest(path: string, cookie?: string) {
  const req = new NextRequest(`http://localhost${path}`)
  if (cookie) req.cookies.set('admin_auth', cookie)
  return req
}

describe('middleware', () => {
  it('redirects / to /pl', async () => {
    const res = await middleware(makeRequest('/'))
    expect(res.status).toBe(307)
    expect(res.headers.get('location')).toBe('http://localhost/pl')
  })

  it('redirects /ua to /ua (no redirect needed)', async () => {
    const res = await middleware(makeRequest('/ua'))
    expect(res).toBeUndefined() // no redirect for valid lang
  })

  it('redirects /admin without cookie to /admin/login', async () => {
    const res = await middleware(makeRequest('/admin'))
    expect(res.status).toBe(307)
    expect(res.headers.get('location')).toContain('/admin/login')
  })

  it('allows /admin with valid cookie', async () => {
    const res = await middleware(makeRequest('/admin', 'valid'))
    expect(res).toBeUndefined()
  })
})
```

- [ ] **Krok 2: Uruchom test — sprawdź że FAIL**

```bash
npx jest src/__tests__/middleware.test.ts
```

Oczekiwane: błąd "Cannot find module '@/middleware'"

- [ ] **Krok 3: Utwórz typy i18n**

Utwórz `src/lib/i18n/types.ts`:

```typescript
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
```

- [ ] **Krok 4: Utwórz tłumaczenie polskie**

Utwórz `src/lib/i18n/pl.ts`:

```typescript
import type { Translations } from './types'

export const pl: Translations = {
  meta: {
    title: 'Tani Prąd w Niemczech — Zaoszczędź do 300 € rocznie',
    description: 'Bezpłatna analiza rachunku za prąd i gaz w Niemczech. Zmieniamy dostawcę w Twoim języku. Partner Teleson GmbH.',
  },
  nav: {
    howItWorks: 'Jak to działa',
    about: 'O mnie',
    reviews: 'Opinie',
    faq: 'FAQ',
    whatsapp: 'WhatsApp',
  },
  hero: {
    badge: 'Doradztwo energetyczne w Niemczech',
    title: 'Płacisz za dużo za prąd lub gaz',
    titleAccent: 'w Niemczech?',
    subtitle: 'Pomagam zmienić dostawcę energii i zaoszczędzić nawet',
    checks: [
      'Bezpłatna analiza Twojego rachunku',
      'Obsługa w języku ojczystym',
      'Zmiana bez przerwy w dostawie prądu',
      'Partner Teleson GmbH — sprawdzona firma',
    ],
    formTitle: 'Sprawdź ile możesz zaoszczędzić',
    fields: {
      name: 'Imię i nazwisko',
      phone: 'Telefon (+49...)',
      email: 'Adres email',
      city: 'Miasto w Niemczech',
      electricity: '⚡ Prąd elektryczny',
      gas: '🔥 Gaz ziemny',
      upload: '📎 Dodaj zdjęcie rachunku (opcjonalnie)',
      uploadHint: 'JPG, PNG lub PDF · maks. 10 MB',
    },
    cta: 'SPRAWDŹ ILE ZAOSZCZĘDZISZ →',
    ctaWa: 'lub napisz na WhatsApp: +49 176 83425546',
  },
  stats: [
    { value: '300 €', label: 'średnia oszczędność rocznie' },
    { value: '2–4 tyg.', label: 'czas zmiany dostawcy' },
    { value: '100%', label: 'bezpłatna usługa' },
    { value: '0', label: 'ukrytych kosztów' },
  ],
  howItWorks: {
    label: 'Proces',
    title: '4 proste kroki',
    steps: [
      { icon: '📄', title: 'Wyślij rachunek', desc: 'Zrób zdjęcie lub prześlij PDF rachunku za prąd lub gaz przez formularz lub WhatsApp.' },
      { icon: '🔍', title: 'Porównujemy oferty', desc: 'Analizujemy Twój rachunek i sprawdzamy najlepsze stawki dostępne w Niemczech.' },
      { icon: '✍️', title: 'Podpisujesz umowę', desc: 'Pomagam Ci przejść przez cały proces w Twoim języku. Bez barier, bez stresu.' },
      { icon: '💰', title: 'Zaczynasz oszczędzać', desc: 'Nawet 300 € mniej rocznie. Nowy dostawca sam powiadamia poprzedniego.' },
    ],
  },
  about: {
    label: 'O mnie',
    name: 'Patryk Kuklinski',
    role: 'Doradca finansowy · Rynek energetyczny w Niemczech',
    quote: 'Pomagam mieszkańcom Niemiec płacić mniej za energię. Prosto, w ich języku, bez ukrytych kosztów.',
    desc: 'Specjalizuję się w optymalizacji kosztów energii elektrycznej i gazu dla klientów indywidualnych na rynku niemieckim. Działam jako pośrednik — Ty nie płacisz nic, a ja dbam o to, żebyś dostał najlepszą ofertę.',
    benefits: [
      { icon: '💰', title: 'Bezpłatna analiza', desc: 'Zarabiam prowizję od dostawcy, nie od Ciebie' },
      { icon: '🗣️', title: 'Obsługa w Twoim języku', desc: 'Zero barier językowych przy podpisaniu' },
      { icon: '⚡', title: 'Szybka zmiana', desc: 'Średnio 2–4 tygodnie, bez przerwy w dostawie' },
      { icon: '🔒', title: 'Zero ukrytych kosztów', desc: 'Widzisz dokładnie co i ile płacisz' },
    ],
  },
  providers: {
    title: 'Porównujemy oferty od najlepszych dostawców w Niemczech',
    names: ['E.ON', 'Vattenfall', 'GASAG', 'EnBW', 'RWE', 'Naturstrom', 'eprimo', 'Verivox', 'CHECK24'],
  },
  reviews: {
    label: 'Opinie klientów',
    title: 'Co mówią nasi klienci?',
    items: [
      { text: 'Zaoszczędziłem 240 € w pierwszym roku. Patryk wszystko załatwił za mnie, nawet nie musiałem dzwonić do starego dostawcy.', name: 'Marek K.', city: 'Dortmund', savings: '−240 €/rok' },
      { text: 'Nie wiedziałam że można tak łatwo zmienić dostawcę. Teraz płacę 60 € mniej co miesiąc. Polecam każdemu kto mieszka w Niemczech!', name: 'Olena M.', city: 'Berlin', savings: '−720 €/rok' },
      { text: 'Szybko, sprawnie, w moim języku. Patryk odpowiedział na WhatsApp w 20 minut. Zmiana zajęła 3 tygodnie.', name: 'Tomasz W.', city: 'Hamburg', savings: '−300 €/rok' },
    ],
  },
  comparison: {
    title: 'Dlaczego warto wybrać doradcę zamiast porównywarki?',
    subtitle: 'Porównanie usług',
    us: 'Tani Prąd w Niemczech',
    them: 'Porównywarki online',
    rows: [
      'Obsługa w Twoim języku',
      'Bezpłatna analiza rachunku',
      'Pomoc przy podpisaniu umowy',
      'Negocjacja warunków',
      'Kontakt bezpośredni',
      'Wsparcie po zmianie',
    ],
  },
  faq: {
    label: 'FAQ',
    title: 'Często pytacie',
    items: [
      { q: 'Czy to naprawdę bezpłatne?', a: 'Tak. Zarabiam prowizję od dostawcy energii, nie od Ciebie. Dla Ciebie cały proces jest 100% darmowy.' },
      { q: 'Jak długo trwa zmiana dostawcy?', a: 'Zazwyczaj 2–4 tygodnie. Nowy dostawca sam powiadamia poprzedniego — Ty nie musisz nic robić.' },
      { q: 'Czy podczas zmiany będę bez prądu?', a: 'Nie. Zmiana dostawcy to tylko zmiana na papierze — prąd płynie cały czas bez żadnych przerw.' },
      { q: 'Czy mogę zmienić dostawcę w trakcie umowy?', a: 'Sprawdzimy razem warunki Twojej umowy. Często można wyjść bez kary lub z bardzo małą opłatą.' },
      { q: 'Czy obsługujesz też gaz?', a: 'Tak — prąd i gaz. Można zmienić oba jednocześnie i zaoszczędzić jeszcze więcej.' },
      { q: 'Jakie dokumenty są potrzebne?', a: 'Wystarczy ostatni rachunek za prąd lub gaz. Resztą zajmuję się ja.' },
    ],
    more: 'Zobacz wszystkie pytania →',
  },
  finalCta: {
    label: 'Działaj teraz',
    title: 'Gotowy żeby płacić',
    titleAccent: 'mniej?',
    subtitle: 'Napisz teraz — odpowiadam w ciągu godziny. Bezpłatnie · Bez zobowiązań.',
    wa: '💬 WhatsApp: +49 176 83425546',
    form: '📋 Wypełnij formularz',
  },
  footer: {
    rights: '© 2025 Tani Prąd w Niemczech · Patryk Kuklinski · Partner Teleson GmbH',
    fb1: 'Praca w Niemczech',
    fb2: 'Polskie Centrum Finansowe',
    privacy: 'Polityka prywatności',
    impressum: 'Impressum',
  },
  form: {
    success: 'Dziękujemy! Odezwiemy się w ciągu godziny.',
    error: 'Coś poszło nie tak. Napisz do nas na WhatsApp.',
    sending: 'Wysyłanie...',
  },
}
```

- [ ] **Krok 5: Utwórz tłumaczenie ukraińskie**

Utwórz `src/lib/i18n/ua.ts`:

```typescript
import type { Translations } from './types'

export const ua: Translations = {
  meta: {
    title: 'Дешева енергія в Німеччині — Заощадьте до 300 € на рік',
    description: 'Безкоштовний аналіз рахунку за електроенергію та газ у Німеччині. Змінюємо постачальника вашою мовою. Партнер Teleson GmbH.',
  },
  nav: {
    howItWorks: 'Як це працює',
    about: 'Про мене',
    reviews: 'Відгуки',
    faq: 'FAQ',
    whatsapp: 'WhatsApp',
  },
  hero: {
    badge: 'Енергетичний консалтинг у Німеччині',
    title: 'Платите забагато за електрику або газ',
    titleAccent: 'у Німеччині?',
    subtitle: 'Допомагаю змінити постачальника енергії та заощадити до',
    checks: [
      'Безкоштовний аналіз вашого рахунку',
      'Обслуговування рідною мовою',
      'Зміна без перебоїв у постачанні',
      'Партнер Teleson GmbH — перевірена компанія',
    ],
    formTitle: 'Перевірте скільки можна заощадити',
    fields: {
      name: "Ім'я та прізвище",
      phone: 'Телефон (+49...)',
      email: 'Електронна пошта',
      city: 'Місто в Німеччині',
      electricity: '⚡ Електроенергія',
      gas: '🔥 Природний газ',
      upload: '📎 Додати фото рахунку (необов\'язково)',
      uploadHint: 'JPG, PNG або PDF · макс. 10 МБ',
    },
    cta: 'ПЕРЕВІРТЕ СКІЛЬКИ ЗАОЩАДИТЕ →',
    ctaWa: 'або напишіть у WhatsApp: +49 176 83425546',
  },
  stats: [
    { value: '300 €', label: 'середня економія на рік' },
    { value: '2–4 тиж.', label: 'час зміни постачальника' },
    { value: '100%', label: 'безкоштовна послуга' },
    { value: '0', label: 'прихованих витрат' },
  ],
  howItWorks: {
    label: 'Процес',
    title: '4 прості кроки',
    steps: [
      { icon: '📄', title: 'Надішліть рахунок', desc: 'Зробіть фото або надішліть PDF рахунку через форму або WhatsApp.' },
      { icon: '🔍', title: 'Порівнюємо пропозиції', desc: 'Аналізуємо ваш рахунок і шукаємо найкращі тарифи у Німеччині.' },
      { icon: '✍️', title: 'Підписуєте договір', desc: 'Допомагаю пройти весь процес вашою мовою. Без бар\'єрів, без стресу.' },
      { icon: '💰', title: 'Починаєте економити', desc: 'До 300 € менше на рік. Новий постачальник сам повідомляє попереднього.' },
    ],
  },
  about: {
    label: 'Про мене',
    name: 'Патрик Куклінські',
    role: 'Фінансовий консультант · Енергетичний ринок Німеччини',
    quote: 'Допомагаю мешканцям Німеччини платити менше за енергію. Просто, їхньою мовою, без прихованих витрат.',
    desc: 'Спеціалізуюся на оптимізації витрат на електроенергію та газ для приватних клієнтів на німецькому ринку. Я є посередником — ви не платите нічого, а я піклуюся про те, щоб ви отримали найкращу пропозицію.',
    benefits: [
      { icon: '💰', title: 'Безкоштовний аналіз', desc: 'Отримую комісію від постачальника, не від вас' },
      { icon: '🗣️', title: 'Обслуговування вашою мовою', desc: 'Жодних мовних бар\'єрів при підписанні' },
      { icon: '⚡', title: 'Швидка зміна', desc: 'В середньому 2–4 тижні, без перебоїв' },
      { icon: '🔒', title: 'Нуль прихованих витрат', desc: 'Ви бачите точно що і скільки платите' },
    ],
  },
  providers: {
    title: 'Порівнюємо пропозиції від найкращих постачальників у Німеччині',
    names: ['E.ON', 'Vattenfall', 'GASAG', 'EnBW', 'RWE', 'Naturstrom', 'eprimo', 'Verivox', 'CHECK24'],
  },
  reviews: {
    label: 'Відгуки клієнтів',
    title: 'Що кажуть наші клієнти?',
    items: [
      { text: 'Заощадив 240 € у перший рік. Патрик все вирішив за мене, мені навіть не довелося телефонувати старому постачальнику.', name: 'Марек К.', city: 'Дортмунд', savings: '−240 €/рік' },
      { text: 'Не знала, що можна так легко змінити постачальника. Тепер плачу на 60 € менше щомісяця. Рекомендую всім хто живе в Німеччині!', name: 'Олена М.', city: 'Берлін', savings: '−720 €/рік' },
      { text: 'Швидко, чітко, моєю мовою. Патрик відповів у WhatsApp за 20 хвилин. Зміна зайняла 3 тижні.', name: 'Томаш В.', city: 'Гамбург', savings: '−300 €/рік' },
    ],
  },
  comparison: {
    title: 'Чому варто обрати консультанта замість порівнювача?',
    subtitle: 'Порівняння послуг',
    us: 'Tani Prąd w Niemczech',
    them: 'Онлайн-порівнювачі',
    rows: [
      'Обслуговування вашою мовою',
      'Безкоштовний аналіз рахунку',
      'Допомога при підписанні договору',
      'Переговори про умови',
      'Прямий контакт',
      'Підтримка після зміни',
    ],
  },
  faq: {
    label: 'FAQ',
    title: 'Часті запитання',
    items: [
      { q: 'Це справді безкоштовно?', a: 'Так. Я отримую комісію від постачальника енергії, не від вас. Для вас весь процес безкоштовний.' },
      { q: 'Скільки часу займає зміна постачальника?', a: 'Зазвичай 2–4 тижні. Новий постачальник сам повідомляє попереднього.' },
      { q: 'Чи буду я без електрики під час зміни?', a: 'Ні. Зміна постачальника — це лише зміна на папері, електрика подається безперервно.' },
      { q: 'Чи можу я змінити постачальника під час дії договору?', a: 'Ми разом перевіримо умови вашого договору. Часто можна вийти без штрафу.' },
      { q: 'Ви також обслуговуєте газ?', a: 'Так — електрику і газ. Можна змінити обидва одночасно і заощадити ще більше.' },
      { q: 'Які документи потрібні?', a: 'Достатньо останнього рахунку за електрику або газ. Іншим займаюся я.' },
    ],
    more: 'Переглянути всі запитання →',
  },
  finalCta: {
    label: 'Діяйте зараз',
    title: 'Готові платити',
    titleAccent: 'менше?',
    subtitle: 'Напишіть зараз — відповідаю протягом години. Безкоштовно · Без зобов\'язань.',
    wa: '💬 WhatsApp: +49 176 83425546',
    form: '📋 Заповнити форму',
  },
  footer: {
    rights: '© 2025 Tani Prąd w Niemczech · Patryk Kuklinski · Partner Teleson GmbH',
    fb1: 'Praca w Niemczech',
    fb2: 'Polskie Centrum Finansowe',
    privacy: 'Політика конфіденційності',
    impressum: 'Impressum',
  },
  form: {
    success: 'Дякуємо! Зв\'яжемося з вами протягом години.',
    error: 'Щось пішло не так. Напишіть нам у WhatsApp.',
    sending: 'Відправка...',
  },
}
```

- [ ] **Krok 6: Utwórz index i18n**

Utwórz `src/lib/i18n/index.ts`:

```typescript
import type { Lang, Translations } from './types'
import { pl } from './pl'
import { ua } from './ua'

const translations: Record<Lang, Translations> = { pl, ua }

export function getTranslations(lang: string): Translations {
  return translations[(lang as Lang)] ?? translations.pl
}

export { type Lang, type Translations }
```

- [ ] **Krok 7: Root layout i redirect**

Zastąp `src/app/layout.tsx`:

```typescript
import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  icons: { icon: '/favicon.ico' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>{children}</body>
    </html>
  )
}
```

Zastąp `src/app/page.tsx`:

```typescript
import { redirect } from 'next/navigation'

export default function Root() {
  redirect('/pl')
}
```

- [ ] **Krok 8: Middleware**

Utwórz `src/middleware.ts`:

```typescript
import { NextResponse, type NextRequest } from 'next/server'

const VALID_LANGS = ['pl', 'ua']

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Redirect root to /pl
  if (pathname === '/') {
    return NextResponse.redirect(new URL('/pl', request.url))
  }

  // Protect /admin
  if (pathname.startsWith('/admin') && !pathname.startsWith('/admin/login')) {
    const auth = request.cookies.get('admin_auth')?.value
    const password = process.env.ADMIN_PASSWORD
    if (!auth || auth !== password) {
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }
  }

  // Block invalid lang segments
  const langSegment = pathname.split('/')[1]
  if (langSegment && !VALID_LANGS.includes(langSegment) && !pathname.startsWith('/admin') && !pathname.startsWith('/api')) {
    return NextResponse.redirect(new URL('/pl', request.url))
  }
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'],
}
```

- [ ] **Krok 9: Uruchom testy middleware**

```bash
npx jest src/__tests__/middleware.test.ts
```

Oczekiwane: PASS (wszystkie 4 testy zielone)

- [ ] **Krok 10: Commit**

```bash
git add src/
git commit -m "feat: i18n translations (PL/UA), routing, middleware"
```

---

## Task 4: Walidacja formularza (TDD)

**Files:**
- Create: `src/lib/validate-lead.ts`
- Create: `src/__tests__/validate-lead.test.ts`

- [ ] **Krok 1: Napisz testy walidacji**

Utwórz `src/__tests__/validate-lead.test.ts`:

```typescript
import { validateLead, type LeadInput } from '@/lib/validate-lead'

const valid: LeadInput = {
  name: 'Jan Kowalski',
  phone: '+49123456789',
  email: 'jan@example.com',
  city: 'Berlin',
  type: ['electricity'],
  language: 'pl',
}

describe('validateLead', () => {
  it('passes valid input', () => {
    expect(validateLead(valid)).toEqual({ ok: true, errors: {} })
  })

  it('requires name', () => {
    const result = validateLead({ ...valid, name: '' })
    expect(result.ok).toBe(false)
    expect(result.errors.name).toBeDefined()
  })

  it('requires phone', () => {
    const result = validateLead({ ...valid, phone: '' })
    expect(result.ok).toBe(false)
    expect(result.errors.phone).toBeDefined()
  })

  it('rejects phone without +49', () => {
    const result = validateLead({ ...valid, phone: '0123456789' })
    expect(result.ok).toBe(false)
    expect(result.errors.phone).toBeDefined()
  })

  it('requires valid email', () => {
    const result = validateLead({ ...valid, email: 'notanemail' })
    expect(result.ok).toBe(false)
    expect(result.errors.email).toBeDefined()
  })

  it('requires city', () => {
    const result = validateLead({ ...valid, city: '' })
    expect(result.ok).toBe(false)
    expect(result.errors.city).toBeDefined()
  })

  it('requires at least one energy type', () => {
    const result = validateLead({ ...valid, type: [] })
    expect(result.ok).toBe(false)
    expect(result.errors.type).toBeDefined()
  })

  it('accepts both energy types', () => {
    const result = validateLead({ ...valid, type: ['electricity', 'gas'] })
    expect(result.ok).toBe(true)
  })
})
```

- [ ] **Krok 2: Uruchom test — sprawdź FAIL**

```bash
npx jest src/__tests__/validate-lead.test.ts
```

Oczekiwane: Cannot find module '@/lib/validate-lead'

- [ ] **Krok 3: Zaimplementuj walidację**

Utwórz `src/lib/validate-lead.ts`:

```typescript
export type EnergyType = 'electricity' | 'gas'
export type Language = 'pl' | 'ua'

export interface LeadInput {
  name: string
  phone: string
  email: string
  city: string
  type: EnergyType[]
  language: Language
  billFile?: File | null
}

export interface ValidationResult {
  ok: boolean
  errors: Partial<Record<keyof LeadInput, string>>
}

export function validateLead(input: LeadInput): ValidationResult {
  const errors: Partial<Record<keyof LeadInput, string>> = {}

  if (!input.name.trim()) errors.name = 'Imię jest wymagane'
  if (!input.phone.trim()) {
    errors.phone = 'Telefon jest wymagany'
  } else if (!/^\+49\d{6,}$/.test(input.phone.replace(/\s/g, ''))) {
    errors.phone = 'Numer musi zaczynać się od +49'
  }
  if (!input.email.trim()) {
    errors.email = 'Email jest wymagany'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.email)) {
    errors.email = 'Nieprawidłowy format email'
  }
  if (!input.city.trim()) errors.city = 'Miasto jest wymagane'
  if (!input.type.length) errors.type = 'Wybierz prąd lub gaz'

  return { ok: Object.keys(errors).length === 0, errors }
}
```

- [ ] **Krok 4: Uruchom testy — PASS**

```bash
npx jest src/__tests__/validate-lead.test.ts
```

Oczekiwane: PASS (8/8)

- [ ] **Krok 5: Commit**

```bash
git add src/lib/validate-lead.ts src/__tests__/validate-lead.test.ts
git commit -m "feat: lead validation with tests"
```

---

## Task 5: Supabase + Resend + API Route (TDD)

**Files:**
- Create: `src/lib/supabase/server.ts`
- Create: `src/lib/resend.ts`
- Create: `src/app/api/leads/route.ts`
- Create: `src/app/api/leads/[id]/route.ts`
- Create: `src/__tests__/api-leads.test.ts`

- [ ] **Krok 1: Konfiguracja Supabase**

Utwórz `src/lib/supabase/server.ts`:

```typescript
import { createClient } from '@supabase/supabase-js'

export function createServerClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  )
}
```

- [ ] **Krok 2: Konfiguracja Resend**

Utwórz `src/lib/resend.ts`:

```typescript
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

interface LeadEmailData {
  name: string
  phone: string
  email: string
  city: string
  type: string[]
  language: string
  billUrl?: string | null
}

export async function sendLeadEmail(lead: LeadEmailData) {
  const typeLabel = lead.type.map(t => t === 'electricity' ? '⚡ Prąd' : '🔥 Gaz').join(', ')
  const billLine = lead.billUrl ? `\nRachunek: ${lead.billUrl}` : ''

  await resend.emails.send({
    from: 'Tani Prąd w Niemczech <noreply@tanipradwniemczech.de>',
    to: process.env.CONTACT_EMAIL!,
    subject: `🔔 Nowy lead: ${lead.name} (${lead.city})`,
    text: [
      `Imię: ${lead.name}`,
      `Telefon: ${lead.phone}`,
      `Email: ${lead.email}`,
      `Miasto: ${lead.city}`,
      `Typ: ${typeLabel}`,
      `Język: ${lead.language}`,
      billLine,
    ].filter(Boolean).join('\n'),
  })
}
```

- [ ] **Krok 3: Napisz testy API route**

Utwórz `src/__tests__/api-leads.test.ts`:

```typescript
import { POST } from '@/app/api/leads/route'
import { NextRequest } from 'next/server'

// Mock Supabase
jest.mock('@/lib/supabase/server', () => ({
  createServerClient: () => ({
    storage: {
      from: () => ({
        upload: jest.fn().mockResolvedValue({ data: { path: 'test/bill.jpg' }, error: null }),
        getPublicUrl: jest.fn().mockReturnValue({ data: { publicUrl: 'https://example.com/bill.jpg' } }),
      }),
    },
    from: () => ({
      insert: jest.fn().mockReturnValue({
        select: jest.fn().mockResolvedValue({ data: [{ id: 'uuid-123' }], error: null }),
      }),
    }),
  }),
}))

// Mock Resend
jest.mock('@/lib/resend', () => ({
  sendLeadEmail: jest.fn().mockResolvedValue(undefined),
}))

function makeFormRequest(overrides: Record<string, string> = {}) {
  const data = new FormData()
  data.set('name', overrides.name ?? 'Jan Kowalski')
  data.set('phone', overrides.phone ?? '+49123456789')
  data.set('email', overrides.email ?? 'jan@example.com')
  data.set('city', overrides.city ?? 'Berlin')
  data.set('type', overrides.type ?? 'electricity')
  data.set('language', overrides.language ?? 'pl')
  return new NextRequest('http://localhost/api/leads', { method: 'POST', body: data })
}

describe('POST /api/leads', () => {
  it('returns 201 for valid lead', async () => {
    const res = await POST(makeFormRequest())
    expect(res.status).toBe(201)
    const body = await res.json()
    expect(body.id).toBe('uuid-123')
  })

  it('returns 400 for missing name', async () => {
    const res = await POST(makeFormRequest({ name: '' }))
    expect(res.status).toBe(400)
    const body = await res.json()
    expect(body.errors.name).toBeDefined()
  })

  it('returns 400 for invalid phone', async () => {
    const res = await POST(makeFormRequest({ phone: '0123' }))
    expect(res.status).toBe(400)
  })

  it('returns 400 for invalid email', async () => {
    const res = await POST(makeFormRequest({ email: 'bademail' }))
    expect(res.status).toBe(400)
  })
})
```

- [ ] **Krok 4: Uruchom testy — FAIL**

```bash
npx jest src/__tests__/api-leads.test.ts
```

Oczekiwane: Cannot find module '@/app/api/leads/route'

- [ ] **Krok 5: Zaimplementuj API Route**

Utwórz `src/app/api/leads/route.ts`:

```typescript
import { NextRequest, NextResponse } from 'next/server'
import { validateLead, type EnergyType, type Language } from '@/lib/validate-lead'
import { createServerClient } from '@/lib/supabase/server'
import { sendLeadEmail } from '@/lib/resend'

export async function POST(request: NextRequest) {
  const formData = await request.formData()

  const rawType = formData.getAll('type') as string[]
  const input = {
    name: (formData.get('name') as string) ?? '',
    phone: (formData.get('phone') as string) ?? '',
    email: (formData.get('email') as string) ?? '',
    city: (formData.get('city') as string) ?? '',
    type: rawType as EnergyType[],
    language: ((formData.get('language') as string) ?? 'pl') as Language,
  }

  const validation = validateLead(input)
  if (!validation.ok) {
    return NextResponse.json({ errors: validation.errors }, { status: 400 })
  }

  const supabase = createServerClient()
  let billUrl: string | null = null

  const billFile = formData.get('bill') as File | null
  if (billFile && billFile.size > 0) {
    const ext = billFile.name.split('.').pop()
    const path = `bills/${Date.now()}.${ext}`
    const { error } = await supabase.storage.from('bills').upload(path, billFile)
    if (!error) {
      const { data } = supabase.storage.from('bills').getPublicUrl(path)
      billUrl = data.publicUrl
    }
  }

  const { data, error } = await supabase
    .from('leads')
    .insert({ ...input, bill_url: billUrl, status: 'new' })
    .select('id')

  if (error || !data?.[0]) {
    return NextResponse.json({ error: 'Database error' }, { status: 500 })
  }

  await sendLeadEmail({ ...input, billUrl }).catch(console.error)

  return NextResponse.json({ id: data[0].id }, { status: 201 })
}
```

Utwórz `src/app/api/leads/[id]/route.ts`:

```typescript
import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase/server'
import { cookies } from 'next/headers'

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const cookieStore = cookies()
  const auth = cookieStore.get('admin_auth')?.value
  if (!auth || auth !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await request.json()
  const supabase = createServerClient()

  const { error } = await supabase
    .from('leads')
    .update({ status: body.status, notes: body.notes })
    .eq('id', params.id)

  if (error) return NextResponse.json({ error: 'Update failed' }, { status: 500 })
  return NextResponse.json({ ok: true })
}
```

- [ ] **Krok 6: Uruchom testy — PASS**

```bash
npx jest src/__tests__/api-leads.test.ts
```

Oczekiwane: PASS (4/4)

- [ ] **Krok 7: Commit**

```bash
git add src/lib/ src/app/api/ src/__tests__/api-leads.test.ts
git commit -m "feat: API route leads, Supabase, Resend integration with tests"
```

---

## Task 6: Komponenty UI — Nav, Hero, LeadForm

**Files:**
- Create: `src/components/Nav.tsx`
- Create: `src/components/Hero.tsx`
- Create: `src/components/LeadForm.tsx`

- [ ] **Krok 1: Nav**

Utwórz `src/components/Nav.tsx`:

```typescript
'use client'
import { useRouter, usePathname } from 'next/navigation'
import type { Lang, Translations } from '@/lib/i18n'

interface NavProps { t: Translations['nav']; lang: Lang }

export function Nav({ t, lang }: NavProps) {
  const router = useRouter()
  const pathname = usePathname()

  function switchLang(newLang: Lang) {
    const newPath = pathname.replace(`/${lang}`, `/${newLang}`)
    router.push(newPath)
  }

  return (
    <nav className="sticky top-0 z-50 border-b border-gold/15 bg-dark/85 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-gold to-gold-600 text-lg">
            ⚡
          </div>
          <span className="text-base font-extrabold">
            Tani Prąd <span className="text-gold">w Niemczech</span>
          </span>
        </div>

        <div className="hidden items-center gap-7 md:flex">
          {(['howItWorks', 'about', 'reviews', 'faq'] as const).map(key => (
            <a key={key} href={`#${key}`} className="text-sm text-white/70 transition hover:text-gold">
              {t[key]}
            </a>
          ))}

          <div className="flex gap-1 rounded-lg border border-white/10 bg-white/5 p-1">
            {(['pl', 'ua'] as Lang[]).map(l => (
              <button
                key={l}
                onClick={() => switchLang(l)}
                className={`rounded-md px-3 py-1 text-xs font-bold transition ${
                  l === lang ? 'bg-gold text-dark' : 'text-white/50 hover:text-white'
                }`}
              >
                {l === 'pl' ? '🇵🇱 PL' : '🇺🇦 UA'}
              </button>
            ))}
          </div>

          <a
            href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg bg-wa px-5 py-2 text-xs font-bold text-white transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-wa/30"
          >
            💬 {t.whatsapp}
          </a>
        </div>
      </div>
    </nav>
  )
}
```

- [ ] **Krok 2: LeadForm (client component)**

Utwórz `src/components/LeadForm.tsx`:

```typescript
'use client'
import { useState, useRef } from 'react'
import type { Translations } from '@/lib/i18n'
import type { Lang } from '@/lib/i18n'
import { validateLead, type EnergyType } from '@/lib/validate-lead'

interface LeadFormProps { t: Translations['hero']; tForm: Translations['form']; lang: Lang }

export function LeadForm({ t, tForm, lang }: LeadFormProps) {
  const [type, setType] = useState<EnergyType[]>([])
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const formRef = useRef<HTMLFormElement>(null)

  function toggleType(val: EnergyType) {
    setType(prev => prev.includes(val) ? prev.filter(t => t !== val) : [...prev, val])
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    type.forEach(t => fd.append('type', t))
    fd.set('language', lang)

    const input = {
      name: fd.get('name') as string,
      phone: fd.get('phone') as string,
      email: fd.get('email') as string,
      city: fd.get('city') as string,
      type,
      language: lang,
    }

    const validation = validateLead(input)
    if (!validation.ok) {
      setErrors(validation.errors as Record<string, string>)
      return
    }

    setErrors({})
    setStatus('sending')

    const res = await fetch('/api/leads', { method: 'POST', body: fd })
    setStatus(res.ok ? 'success' : 'error')
    if (res.ok) formRef.current?.reset()
  }

  if (status === 'success') {
    return (
      <div className="glass glass-top relative rounded-2xl p-8 text-center">
        <div className="mb-4 text-5xl">✅</div>
        <p className="text-lg font-bold text-gold">{tForm.success}</p>
      </div>
    )
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="glass glass-top relative rounded-2xl p-8">
      <p className="mb-5 text-center text-sm font-bold">
        📋 <span className="text-gold">{t.formTitle}</span>
      </p>

      <div className="mb-2.5 grid grid-cols-2 gap-2.5">
        <Field name="name" placeholder={t.fields.name} error={errors.name} />
        <Field name="phone" placeholder={t.fields.phone} error={errors.phone} />
      </div>
      <Field name="email" placeholder={t.fields.email} error={errors.email} className="mb-2.5" />
      <Field name="city" placeholder={t.fields.city} error={errors.city} className="mb-2.5" />

      <div className="mb-2.5 grid grid-cols-2 gap-2.5">
        {(['electricity', 'gas'] as EnergyType[]).map(val => (
          <button
            key={val}
            type="button"
            onClick={() => toggleType(val)}
            className={`rounded-xl border py-2.5 text-xs transition ${
              type.includes(val)
                ? 'border-gold bg-gold/10 text-gold'
                : 'border-white/12 bg-white/6 text-white/50 hover:border-gold/50 hover:text-gold'
            }`}
          >
            {val === 'electricity' ? t.fields.electricity : t.fields.gas}
          </button>
        ))}
      </div>
      {errors.type && <p className="mb-2 text-xs text-red-400">{errors.type}</p>}

      <label className="mb-3.5 flex cursor-pointer flex-col items-center rounded-xl border border-dashed border-white/15 px-4 py-3 text-center text-xs text-white/40 transition hover:border-gold hover:text-gold">
        <span>{t.fields.upload}</span>
        <span className="mt-1 opacity-60">{t.fields.uploadHint}</span>
        <input type="file" name="bill" accept=".jpg,.jpeg,.png,.pdf" className="hidden" />
      </label>

      <button
        type="submit"
        disabled={status === 'sending'}
        className="relative mb-2.5 w-full overflow-hidden rounded-xl bg-cta py-4 text-sm font-extrabold tracking-wide text-white animate-pulse disabled:opacity-70"
      >
        <span className="relative z-10">{status === 'sending' ? tForm.sending : t.cta}</span>
        <span className="absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,rgba(255,255,255,0.15)_50%,transparent_100%)] bg-[length:200%_auto] animate-shimmer" />
      </button>

      <a
        href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}`}
        target="_blank"
        rel="noopener noreferrer"
        className="block w-full rounded-xl border border-wa/30 bg-wa/10 py-3.5 text-center text-xs font-bold text-wa transition hover:bg-wa/20"
      >
        💬 {t.ctaWa}
      </a>

      {status === 'error' && <p className="mt-2 text-center text-xs text-red-400">{tForm.error}</p>}
    </form>
  )
}

function Field({ name, placeholder, error, className = '' }: {
  name: string; placeholder: string; error?: string; className?: string
}) {
  return (
    <div className={className}>
      <input
        name={name}
        placeholder={placeholder}
        className="w-full rounded-xl border border-white/12 bg-white/6 px-3.5 py-3 text-xs text-white/50 outline-none transition placeholder:text-white/40 focus:border-gold focus:bg-white/8 focus:text-white"
      />
      {error && <p className="mt-1 text-xs text-red-400">{error}</p>}
    </div>
  )
}
```

- [ ] **Krok 3: Hero**

Utwórz `src/components/Hero.tsx`:

```typescript
import type { Translations } from '@/lib/i18n'
import type { Lang } from '@/lib/i18n'
import { LeadForm } from './LeadForm'

interface HeroProps { t: Translations['hero']; tForm: Translations['form']; lang: Lang }

export function Hero({ t, tForm, lang }: HeroProps) {
  return (
    <section className="relative overflow-hidden bg-[linear-gradient(135deg,#0a0f1e_0%,#0d1b3e_50%,#0a1628_100%)] bg-[length:400%_400%] animate-gradientShift px-6 py-20 md:px-12 md:py-28 min-h-[90vh] flex items-center">
      {/* Orbs */}
      <div className="absolute -top-24 -right-24 h-[500px] w-[500px] rounded-full bg-brand opacity-15 blur-[80px] animate-orbFloat" />
      <div className="absolute bottom-0 left-[10%] h-[400px] w-[400px] rounded-full bg-gold opacity-[0.08] blur-[80px] animate-orbFloat [animation-delay:-4s]" />
      <div className="absolute top-[40%] -left-12 h-[300px] w-[300px] rounded-full bg-green-400 opacity-[0.06] blur-[80px] animate-orbFloat [animation-delay:-2s]" />

      <div className="relative z-10 mx-auto grid w-full max-w-6xl gap-16 md:grid-cols-2 items-center">
        {/* Left */}
        <div>
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-4 py-1.5 text-xs font-semibold text-gold animate-fadeInUp">
            <span className="h-1.5 w-1.5 rounded-full bg-gold animate-pulse" />
            {t.badge}
          </div>

          <h1 className="mb-4 text-4xl font-black leading-tight md:text-5xl animate-fadeInUp [animation-delay:0.1s]">
            {t.title} <span className="text-gold">{t.titleAccent}</span>
          </h1>

          <p className="mb-7 text-base leading-relaxed text-white/65 animate-fadeInUp [animation-delay:0.2s]">
            {t.subtitle} <strong className="text-xl text-gold">300 € rocznie</strong>.{' '}
            Bezpłatnie, w Twoim języku, bez stresu.
          </p>

          <ul className="flex flex-col gap-3 animate-fadeInUp [animation-delay:0.3s]">
            {t.checks.map((check, i) => (
              <li key={i} className="flex items-center gap-3 text-sm text-white/80">
                <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-green-500 to-green-700 text-xs">✓</span>
                {check}
              </li>
            ))}
          </ul>
        </div>

        {/* Right — Form */}
        <div className="animate-fadeInUp [animation-delay:0.2s]">
          <LeadForm t={t} tForm={tForm} lang={lang} />
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Krok 4: Commit**

```bash
git add src/components/Nav.tsx src/components/Hero.tsx src/components/LeadForm.tsx
git commit -m "feat: Nav, Hero, LeadForm components"
```

---

## Task 7: Pozostałe komponenty sekcji

**Files:**
- Create: `src/components/StatsBar.tsx`
- Create: `src/components/HowItWorks.tsx`
- Create: `src/components/About.tsx`
- Create: `src/components/ProvidersCarousel.tsx`
- Create: `src/components/Reviews.tsx`
- Create: `src/components/ComparisonTable.tsx`
- Create: `src/components/FaqAccordion.tsx`
- Create: `src/components/FinalCta.tsx`
- Create: `src/components/Footer.tsx`
- Create: `src/components/StickyWhatsApp.tsx`

- [ ] **Krok 1: StatsBar**

Utwórz `src/components/StatsBar.tsx`:

```typescript
import type { Translations } from '@/lib/i18n'

export function StatsBar({ stats }: { stats: Translations['stats'] }) {
  return (
    <div className="grid grid-cols-2 gap-px bg-gold/10 border-y border-gold/10 md:grid-cols-4">
      {stats.map((s, i) => (
        <div key={i} className="bg-dark px-6 py-6 text-center">
          <div className="text-3xl font-black text-gold leading-none mb-1">{s.value}</div>
          <div className="text-xs text-white/50">{s.label}</div>
        </div>
      ))}
    </div>
  )
}
```

- [ ] **Krok 2: HowItWorks**

Utwórz `src/components/HowItWorks.tsx`:

```typescript
import type { Translations } from '@/lib/i18n'

export function HowItWorks({ t }: { t: Translations['howItWorks'] }) {
  return (
    <section id="howItWorks" className="px-6 py-20 md:px-12">
      <div className="mx-auto max-w-6xl">
        <p className="mb-2 text-center text-xs font-bold uppercase tracking-widest text-gold">{t.label}</p>
        <h2 className="mb-12 text-center text-3xl font-black">
          Jak to działa? <span className="text-gold">{t.title}</span>
        </h2>
        <div className="grid gap-5 md:grid-cols-4">
          {t.steps.map((step, i) => (
            <div
              key={i}
              className={`relative overflow-hidden rounded-2xl border p-6 transition-all duration-300 animate-borderGlow hover:-translate-y-1.5 hover:shadow-2xl ${
                i === 3
                  ? 'border-green-500/20 hover:border-green-500/50 hover:shadow-green-500/10'
                  : 'border-white/8 hover:border-gold/40'
              }`}
            >
              <span className="absolute right-4 top-3 text-5xl font-black text-gold/10 leading-none select-none">
                {i + 1}
              </span>
              <div className="mb-3 text-3xl">{step.icon}</div>
              <h3 className="mb-2 text-sm font-bold">{step.title}</h3>
              <p className="text-xs leading-relaxed text-white/50">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Krok 3: About**

Utwórz `src/components/About.tsx`:

```typescript
import Image from 'next/image'
import type { Translations } from '@/lib/i18n'

export function About({ t }: { t: Translations['about'] }) {
  return (
    <section id="about" className="border-y border-white/5 bg-white/[0.02] px-6 py-20 md:px-12">
      <div className="mx-auto grid max-w-6xl gap-16 md:grid-cols-2 items-center">
        <div className="flex justify-center">
          <div className="relative">
            <div className="relative h-80 w-64 overflow-hidden rounded-2xl border border-gold/20 shadow-[0_40px_80px_rgba(0,0,0,0.5)] animate-float">
              <Image src="/patryk.jpg" alt="Patryk Kuklinski" fill className="object-cover object-top" />
            </div>
            <div className="absolute -bottom-2.5 -right-2.5 rounded-xl bg-gradient-to-br from-gold to-gold-600 px-4 py-2.5 text-xs font-extrabold text-dark shadow-[0_8px_24px_rgba(251,211,141,0.3)]">
              ⚡ Partner Teleson GmbH
            </div>
          </div>
        </div>

        <div>
          <p className="mb-2 text-xs font-bold uppercase tracking-widest text-gold">{t.label}</p>
          <h2 className="mb-1 text-xl font-black">{t.name}</h2>
          <p className="mb-5 text-xs text-gold">{t.role}</p>
          <blockquote className="mb-5 border-l-2 border-gold pl-5 text-lg font-bold leading-relaxed">
            "{t.quote}"
          </blockquote>
          <p className="mb-6 text-sm leading-relaxed text-white/60">{t.desc}</p>
          <div className="grid grid-cols-2 gap-3.5">
            {t.benefits.map((b, i) => (
              <div key={i} className="flex gap-3 rounded-xl border border-white/7 bg-white/3 p-3.5 transition hover:border-gold/30 hover:translate-x-1">
                <span className="mt-0.5 text-xl flex-shrink-0">{b.icon}</span>
                <div>
                  <p className="text-xs font-bold">{b.title}</p>
                  <p className="text-[10px] text-white/50 leading-relaxed">{b.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Krok 4: ProvidersCarousel**

Utwórz `src/components/ProvidersCarousel.tsx`:

```typescript
import type { Translations } from '@/lib/i18n'

export function ProvidersCarousel({ t }: { t: Translations['providers'] }) {
  const doubled = [...t.names, ...t.names]

  return (
    <section className="overflow-hidden border-b border-white/5 py-14">
      <p className="mb-8 px-6 text-center text-sm font-bold text-white/70">{t.title}</p>
      <div className="flex gap-8 animate-scrollX whitespace-nowrap">
        {doubled.map((name, i) => (
          <div
            key={i}
            className="inline-flex h-12 min-w-[120px] items-center justify-center rounded-lg border border-white/10 bg-white/5 px-6 text-sm font-bold text-white/60"
          >
            {name}
          </div>
        ))}
      </div>
    </section>
  )
}
```

- [ ] **Krok 5: Reviews**

Utwórz `src/components/Reviews.tsx`:

```typescript
import type { Translations } from '@/lib/i18n'

export function Reviews({ t }: { t: Translations['reviews'] }) {
  return (
    <section id="reviews" className="px-6 py-20 md:px-12">
      <div className="mx-auto max-w-6xl">
        <p className="mb-2 text-center text-xs font-bold uppercase tracking-widest text-gold">{t.label}</p>
        <h2 className="mb-12 text-center text-3xl font-black">
          {t.title.split('nasi')[0]}<span className="text-gold">nasi klienci?</span>
        </h2>
        <div className="grid gap-5 md:grid-cols-3">
          {t.items.map((r, i) => (
            <div key={i} className="rounded-2xl border border-white/8 bg-white/3 p-6 transition hover:-translate-y-1 hover:shadow-2xl">
              <div className="mb-3 tracking-widest text-gold">★★★★★</div>
              <p className="mb-4 text-sm italic leading-relaxed text-white/70">"{r.text}"</p>
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-brand to-brand-900 text-sm">
                  👤
                </div>
                <div>
                  <p className="text-xs font-bold">{r.name}</p>
                  <p className="text-[10px] text-white/40">{r.city}</p>
                </div>
                <span className="ml-auto rounded-full border border-green-500/20 bg-green-500/10 px-2 py-0.5 text-[10px] font-bold text-green-400">
                  {r.savings}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Krok 6: ComparisonTable**

Utwórz `src/components/ComparisonTable.tsx`:

```typescript
import type { Translations } from '@/lib/i18n'

export function ComparisonTable({ t }: { t: Translations['comparison'] }) {
  return (
    <section className="border-y border-white/5 bg-white/[0.02] px-6 py-20 md:px-12">
      <div className="mx-auto max-w-3xl">
        <p className="mb-2 text-center text-xs font-bold uppercase tracking-widest text-gold">{t.subtitle}</p>
        <h2 className="mb-10 text-center text-2xl font-black md:text-3xl">{t.title}</h2>
        <div className="overflow-hidden rounded-2xl border border-white/10">
          <div className="grid grid-cols-3 gap-px bg-white/10">
            <div className="bg-dark px-4 py-3 text-xs font-bold text-white/40" />
            <div className="bg-dark px-4 py-3 text-center text-xs font-bold text-gold">{t.us}</div>
            <div className="bg-dark px-4 py-3 text-center text-xs font-bold text-white/40">{t.them}</div>
          </div>
          {t.rows.map((row, i) => (
            <div key={i} className="grid grid-cols-3 gap-px bg-white/5">
              <div className="bg-dark px-4 py-3.5 text-xs text-white/70">{row}</div>
              <div className="flex items-center justify-center bg-dark px-4 py-3.5 text-base text-green-400">✅</div>
              <div className="flex items-center justify-center bg-dark px-4 py-3.5 text-base text-red-400">❌</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Krok 7: FaqAccordion**

Utwórz `src/components/FaqAccordion.tsx`:

```typescript
'use client'
import { useState } from 'react'
import type { Translations } from '@/lib/i18n'
import type { Lang } from '@/lib/i18n'

interface FaqProps { t: Translations['faq']; lang: Lang; preview?: boolean }

export function FaqAccordion({ t, lang, preview = false }: FaqProps) {
  const [open, setOpen] = useState<number | null>(null)
  const items = preview ? t.items.slice(0, 6) : t.items

  return (
    <section id="faq" className="px-6 py-20 md:px-12">
      <div className="mx-auto max-w-3xl">
        <p className="mb-2 text-center text-xs font-bold uppercase tracking-widest text-gold">{t.label}</p>
        <h2 className="mb-10 text-center text-3xl font-black">{t.title}</h2>
        <div className="flex flex-col gap-3">
          {items.map((item, i) => (
            <div key={i} className="overflow-hidden rounded-xl border border-white/8 bg-white/3 transition hover:border-gold/20">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="flex w-full items-center justify-between px-5 py-4 text-left text-sm font-bold"
              >
                <span>{item.q}</span>
                <span className={`ml-4 flex-shrink-0 text-gold transition-transform ${open === i ? 'rotate-180' : ''}`}>▼</span>
              </button>
              {open === i && (
                <p className="border-t border-white/5 px-5 pb-4 pt-3 text-sm leading-relaxed text-white/60">
                  {item.a}
                </p>
              )}
            </div>
          ))}
        </div>
        {preview && (
          <div className="mt-8 text-center">
            <a href={`/${lang}/faq`} className="text-sm font-bold text-gold hover:underline">
              {t.more}
            </a>
          </div>
        )}
      </div>
    </section>
  )
}
```

- [ ] **Krok 8: FinalCta**

Utwórz `src/components/FinalCta.tsx`:

```typescript
import type { Translations } from '@/lib/i18n'

export function FinalCta({ t }: { t: Translations['finalCta'] }) {
  const waNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER

  return (
    <section className="border-t border-gold/10 bg-gradient-to-br from-brand/10 to-gold/5 px-6 py-24 md:px-12 text-center">
      <p className="mb-2 text-xs font-bold uppercase tracking-widest text-gold">{t.label}</p>
      <h2 className="mb-3 text-3xl font-black md:text-4xl">
        {t.title} <span className="text-gold">{t.titleAccent}</span>
      </h2>
      <p className="mb-10 text-base text-white/60">{t.subtitle}</p>
      <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
        <a
          href={`https://wa.me/${waNumber}`}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-xl bg-wa px-9 py-5 text-base font-extrabold text-white shadow-[0_8px_32px_rgba(37,211,102,0.3)] transition hover:-translate-y-0.5 hover:shadow-[0_16px_40px_rgba(37,211,102,0.4)]"
        >
          {t.wa}
        </a>
        <a
          href="#hero"
          className="rounded-xl border border-white/15 bg-white/5 px-9 py-5 text-base font-bold transition hover:bg-white/10 hover:border-white/30"
        >
          {t.form}
        </a>
      </div>
    </section>
  )
}
```

- [ ] **Krok 9: Footer**

Utwórz `src/components/Footer.tsx`:

```typescript
import type { Translations } from '@/lib/i18n'

export function Footer({ t }: { t: Translations['footer'] }) {
  return (
    <footer className="border-t border-white/5 bg-[#060a14] px-6 py-7 md:px-12">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <p className="text-xs text-white/30">{t.rights}</p>
        <div className="flex flex-wrap gap-5">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-xs text-white/30 transition hover:text-gold">📘 {t.fb1}</a>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-xs text-white/30 transition hover:text-gold">📘 {t.fb2}</a>
          <a href="/privacy" className="text-xs text-white/30 transition hover:text-gold">{t.privacy}</a>
          <a href="/impressum" className="text-xs text-white/30 transition hover:text-gold">{t.impressum}</a>
        </div>
      </div>
    </footer>
  )
}
```

- [ ] **Krok 10: StickyWhatsApp**

Utwórz `src/components/StickyWhatsApp.tsx`:

```typescript
'use client'

export function StickyWhatsApp() {
  const waNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER
  return (
    <a
      href={`https://wa.me/${waNumber}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-wa text-2xl text-white shadow-[0_8px_32px_rgba(37,211,102,0.5)] animate-waPulse transition hover:scale-110"
    >
      💬
    </a>
  )
}
```

- [ ] **Krok 11: Commit**

```bash
git add src/components/
git commit -m "feat: all section components — StatsBar, HowItWorks, About, Reviews, Comparison, FAQ, FinalCta, Footer, StickyWhatsApp"
```

---

## Task 8: Strona główna + layout [lang]

**Files:**
- Create: `src/app/[lang]/layout.tsx`
- Create: `src/app/[lang]/page.tsx`

- [ ] **Krok 1: Layout z metadanymi i hreflang**

Utwórz `src/app/[lang]/layout.tsx`:

```typescript
import type { Metadata } from 'next'
import { getTranslations, type Lang } from '@/lib/i18n'
import { notFound } from 'next/navigation'

const VALID_LANGS: Lang[] = ['pl', 'ua']

interface Props {
  children: React.ReactNode
  params: { lang: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  if (!VALID_LANGS.includes(params.lang as Lang)) return {}
  const t = getTranslations(params.lang)
  const lang = params.lang as Lang

  return {
    title: t.meta.title,
    description: t.meta.description,
    alternates: {
      canonical: `https://tanipradwniemczech.de/${lang}`,
      languages: {
        'pl': 'https://tanipradwniemczech.de/pl',
        'uk': 'https://tanipradwniemczech.de/ua',
      },
    },
    openGraph: {
      title: t.meta.title,
      description: t.meta.description,
      url: `https://tanipradwniemczech.de/${lang}`,
      siteName: 'Tani Prąd w Niemczech',
      images: [{ url: '/og-image.png', width: 1200, height: 630 }],
    },
  }
}

export function generateStaticParams() {
  return VALID_LANGS.map(lang => ({ lang }))
}

export default function LangLayout({ children, params }: Props) {
  if (!VALID_LANGS.includes(params.lang as Lang)) notFound()
  return (
    <html lang={params.lang === 'ua' ? 'uk' : 'pl'}>
      <body>{children}</body>
    </html>
  )
}
```

- [ ] **Krok 2: Strona główna**

Utwórz `src/app/[lang]/page.tsx`:

```typescript
import { getTranslations, type Lang } from '@/lib/i18n'
import { Nav } from '@/components/Nav'
import { Hero } from '@/components/Hero'
import { StatsBar } from '@/components/StatsBar'
import { HowItWorks } from '@/components/HowItWorks'
import { About } from '@/components/About'
import { ProvidersCarousel } from '@/components/ProvidersCarousel'
import { Reviews } from '@/components/Reviews'
import { ComparisonTable } from '@/components/ComparisonTable'
import { FaqAccordion } from '@/components/FaqAccordion'
import { FinalCta } from '@/components/FinalCta'
import { Footer } from '@/components/Footer'
import { StickyWhatsApp } from '@/components/StickyWhatsApp'

interface Props { params: { lang: string } }

export default function Home({ params }: Props) {
  const lang = params.lang as Lang
  const t = getTranslations(lang)

  return (
    <>
      <Nav t={t.nav} lang={lang} />
      <main id="hero">
        <Hero t={t.hero} tForm={t.form} lang={lang} />
        <StatsBar stats={t.stats} />
        <HowItWorks t={t.howItWorks} />
        <About t={t.about} />
        <ProvidersCarousel t={t.providers} />
        <Reviews t={t.reviews} />
        <ComparisonTable t={t.comparison} />
        <FaqAccordion t={t.faq} lang={lang} preview />
        <FinalCta t={t.finalCta} />
      </main>
      <Footer t={t.footer} />
      <StickyWhatsApp />
    </>
  )
}
```

- [ ] **Krok 3: Uruchom dev server i sprawdź**

```bash
npm run dev
```

Otwórz http://localhost:3000 — powinien przekierować na http://localhost:3000/pl z pełną stroną.

- [ ] **Krok 4: Commit**

```bash
git add src/app/[lang]/
git commit -m "feat: main landing page assembled for PL and UA"
```

---

## Task 9: Podstrony FAQ i O mnie

**Files:**
- Create: `src/app/[lang]/faq/page.tsx`
- Create: `src/app/[lang]/about/page.tsx`

- [ ] **Krok 1: Strona FAQ**

Utwórz `src/app/[lang]/faq/page.tsx`:

```typescript
import { getTranslations, type Lang } from '@/lib/i18n'
import { Nav } from '@/components/Nav'
import { FaqAccordion } from '@/components/FaqAccordion'
import { Footer } from '@/components/Footer'
import { StickyWhatsApp } from '@/components/StickyWhatsApp'

const faqExtra = {
  pl: [
    { q: 'Co jeśli mój dostawca nie chce mnie zwolnić?', a: 'Masz prawo do zmiany dostawcy zgodnie z niemieckim prawem energetycznym. Pomagam w każdej takiej sytuacji.' },
    { q: 'Co to jest Grundversorger i czy muszę tam zostać?', a: 'Grundversorger to domyślny lokalny dostawca — zazwyczaj droższy. Nie musisz u niego zostawać.' },
    { q: 'Czy mogę zmienić dostawcę jeśli wynajmuję mieszkanie?', a: 'Tak, jeśli masz własną umowę z dostawcą energii (Direktvertrag). Sprawdzimy razem Twoją sytuację.' },
    { q: 'Kiedy zaczną obowiązywać nowe stawki?', a: 'Nowe stawki zaczynają obowiązywać zazwyczaj w ciągu 4–6 tygodni od podpisania umowy.' },
    { q: 'Co jeśli nowy dostawca zbankrutuje?', a: 'W Niemczech obowiązuje zasada Grundversorgung — Twój lokalny dostawca musi Ci zagwarantować dostawę. Nie zostaniesz bez prądu.' },
    { q: 'Czy mogę zmienić zarówno prąd jak i gaz jednocześnie?', a: 'Tak. Możemy zmienić obu dostawców w tym samym czasie, co często daje lepsze warunki.' },
    { q: 'Jak często warto sprawdzać oferty?', a: 'Zalecam sprawdzanie co 12 miesięcy lub po zakończeniu obecnej umowy. Rynek energii zmienia się regularnie.' },
    { q: 'Jak działa rozliczenie przy zmianie?', a: 'Stary dostawca wystawia końcowe rozliczenie po odczycie licznika. Nowy dostawca zaczyna fakturować od daty przejęcia.' },
    { q: 'Czy zmiana dostawcy jest legalna?', a: 'Tak, 100%. Zmiana dostawcy energii jest prawem każdego konsumenta w Niemczech (§ 41a EnWG).' },
  ],
  ua: [
    { q: 'Що якщо мій постачальник не хоче мене відпускати?', a: 'Ви маєте право на зміну постачальника згідно з німецьким законодавством про енергетику. Допомагаю в кожній такій ситуації.' },
    { q: 'Що таке Grundversorger і чи потрібно там залишатися?', a: 'Grundversorger — це місцевий постачальник за замовчуванням, зазвичай дорожчий. Ви не зобов\'язані там залишатися.' },
    { q: 'Чи можу я змінити постачальника якщо знімаю квартиру?', a: 'Так, якщо у вас є прямий договір з постачальником (Direktvertrag). Ми разом перевіримо вашу ситуацію.' },
    { q: 'Коли набудуть чинності нові тарифи?', a: 'Нові тарифи зазвичай починають діяти протягом 4–6 тижнів після підписання договору.' },
    { q: 'Що якщо новий постачальник збанкрутує?', a: 'У Німеччині діє принцип Grundversorgung — місцевий постачальник зобов\'язаний забезпечити постачання. Ви не залишитеся без електрики.' },
    { q: 'Чи можу я змінити і електрику, і газ одночасно?', a: 'Так. Можемо змінити обох постачальників одночасно, що часто дає кращі умови.' },
    { q: 'Як часто варто перевіряти пропозиції?', a: 'Рекомендую перевіряти кожні 12 місяців або після закінчення поточного договору.' },
    { q: 'Як відбувається розрахунок при зміні?', a: 'Старий постачальник виставляє кінцевий рахунок після зняття показань лічильника. Новий починає виставляти рахунки з дати переходу.' },
    { q: 'Чи законна зміна постачальника?', a: 'Так, 100%. Зміна постачальника енергії — право кожного споживача в Німеччині (§ 41a EnWG).' },
  ],
}

interface Props { params: { lang: string } }

export default function FaqPage({ params }: Props) {
  const lang = params.lang as Lang
  const t = getTranslations(lang)
  const extra = faqExtra[lang] ?? faqExtra.pl
  const fullFaq = { ...t.faq, items: [...t.faq.items, ...extra] }

  return (
    <>
      <Nav t={t.nav} lang={lang} />
      <main>
        <FaqAccordion t={fullFaq} lang={lang} />
      </main>
      <Footer t={t.footer} />
      <StickyWhatsApp />
    </>
  )
}
```

- [ ] **Krok 2: Strona O mnie**

Utwórz `src/app/[lang]/about/page.tsx`:

```typescript
import { getTranslations, type Lang } from '@/lib/i18n'
import { Nav } from '@/components/Nav'
import { About } from '@/components/About'
import { FinalCta } from '@/components/FinalCta'
import { Footer } from '@/components/Footer'
import { StickyWhatsApp } from '@/components/StickyWhatsApp'

interface Props { params: { lang: string } }

export default function AboutPage({ params }: Props) {
  const lang = params.lang as Lang
  const t = getTranslations(lang)
  return (
    <>
      <Nav t={t.nav} lang={lang} />
      <main className="pt-10">
        <About t={t.about} />
        <FinalCta t={t.finalCta} />
      </main>
      <Footer t={t.footer} />
      <StickyWhatsApp />
    </>
  )
}
```

- [ ] **Krok 3: Commit**

```bash
git add src/app/[lang]/faq src/app/[lang]/about
git commit -m "feat: FAQ and About subpages for PL and UA"
```

---

## Task 10: Panel admina

**Files:**
- Create: `src/app/admin/page.tsx`
- Create: `src/app/admin/login/page.tsx`

- [ ] **Krok 1: Strona logowania admina**

Utwórz `src/app/admin/login/page.tsx`:

```typescript
'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminLogin() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const res = await fetch('/api/admin/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    })
    if (res.ok) {
      router.push('/admin')
    } else {
      setError('Nieprawidłowe hasło')
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-dark px-4">
      <form onSubmit={handleSubmit} className="w-full max-w-sm rounded-2xl border border-white/10 bg-white/5 p-8">
        <h1 className="mb-6 text-center text-xl font-black">🔐 Panel admina</h1>
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="Hasło"
          className="mb-3 w-full rounded-xl border border-white/12 bg-white/6 px-4 py-3 text-sm text-white outline-none focus:border-gold"
        />
        {error && <p className="mb-3 text-xs text-red-400">{error}</p>}
        <button type="submit" className="w-full rounded-xl bg-brand py-3 text-sm font-bold text-white">
          Zaloguj się
        </button>
      </form>
    </div>
  )
}
```

Utwórz `src/app/api/admin/auth/route.ts`:

```typescript
import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function POST(request: NextRequest) {
  const { password } = await request.json()
  if (password !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: 'Invalid password' }, { status: 401 })
  }
  const cookieStore = cookies()
  cookieStore.set('admin_auth', password, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24 * 7, // 7 dni
    path: '/',
  })
  return NextResponse.json({ ok: true })
}
```

- [ ] **Krok 2: Panel leadów**

Utwórz `src/app/admin/page.tsx`:

```typescript
import { createServerClient } from '@/lib/supabase/server'

const STATUS_LABELS: Record<string, string> = {
  new: '🔵 Nowy',
  contacted: '🟡 Kontakt',
  converted: '🟢 Klient',
  closed: '⚫ Zamknięty',
}

export default async function AdminPage() {
  const supabase = createServerClient()
  const { data: leads } = await supabase
    .from('leads')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <div className="min-h-screen bg-dark p-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-2xl font-black">⚡ Panel Leadów</h1>
          <span className="rounded-full bg-gold/10 border border-gold/20 px-4 py-1.5 text-xs font-bold text-gold">
            {leads?.length ?? 0} leadów
          </span>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-white/10">
          <table className="w-full text-sm">
            <thead className="border-b border-white/10 bg-white/5">
              <tr>
                {['Data', 'Imię', 'Telefon', 'Email', 'Miasto', 'Typ', 'Język', 'Status', 'Rachunek'].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-bold uppercase text-white/40">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {leads?.map(lead => (
                <tr key={lead.id} className="border-b border-white/5 transition hover:bg-white/3">
                  <td className="px-4 py-3 text-xs text-white/50">
                    {new Date(lead.created_at).toLocaleDateString('pl-PL')}
                  </td>
                  <td className="px-4 py-3 font-medium">{lead.name}</td>
                  <td className="px-4 py-3">
                    <a href={`tel:${lead.phone}`} className="text-gold hover:underline">{lead.phone}</a>
                  </td>
                  <td className="px-4 py-3 text-white/70">{lead.email}</td>
                  <td className="px-4 py-3 text-white/70">{lead.city}</td>
                  <td className="px-4 py-3">
                    {lead.type?.map((t: string) => (
                      <span key={t} className="mr-1 text-xs">{t === 'electricity' ? '⚡' : '🔥'}</span>
                    ))}
                  </td>
                  <td className="px-4 py-3 text-xs uppercase text-white/50">{lead.language}</td>
                  <td className="px-4 py-3">
                    <span className="text-xs">{STATUS_LABELS[lead.status] ?? lead.status}</span>
                  </td>
                  <td className="px-4 py-3">
                    {lead.bill_url && (
                      <a href={lead.bill_url} target="_blank" rel="noopener noreferrer" className="text-xs text-brand hover:underline">
                        📎 Rachunek
                      </a>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
```

- [ ] **Krok 3: Commit**

```bash
git add src/app/admin/ src/app/api/admin/
git commit -m "feat: admin panel with lead list and login"
```

---

## Task 11: Supabase — baza danych

> Wykonaj te kroki w panelu Supabase (supabase.com) przed deploymentem.

- [ ] **Krok 1: Utwórz projekt Supabase**

Wejdź na supabase.com → New Project → zapisz URL i klucze do `.env.local`.

- [ ] **Krok 2: Utwórz tabelę leads**

W SQL Editor wykonaj:

```sql
create table leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now(),
  name text not null,
  phone text not null,
  email text not null,
  city text not null,
  type text[] not null,
  bill_url text,
  language text not null default 'pl',
  status text not null default 'new',
  notes text
);

alter table leads enable row level security;

-- Tylko service role może odczytywać
create policy "service role only" on leads
  using (auth.role() = 'service_role');
```

- [ ] **Krok 3: Utwórz bucket na rachunki**

```sql
insert into storage.buckets (id, name, public)
values ('bills', 'bills', true);

create policy "public read bills" on storage.objects
  for select using (bucket_id = 'bills');

create policy "service role insert bills" on storage.objects
  for insert with check (bucket_id = 'bills' AND auth.role() = 'service_role');
```

- [ ] **Krok 4: Commit komentarza**

```bash
git commit --allow-empty -m "chore: Supabase schema applied (leads table + bills bucket)"
```

---

## Task 12: SEO — sitemap, robots, OG image

**Files:**
- Create: `src/app/sitemap.ts`
- Create: `src/app/robots.ts`
- Create: `public/og-image.png` (ręcznie lub Canva)

- [ ] **Krok 1: Sitemap**

Utwórz `src/app/sitemap.ts`:

```typescript
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
```

- [ ] **Krok 2: Robots.txt**

Utwórz `src/app/robots.ts`:

```typescript
import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/', disallow: '/admin' },
    sitemap: 'https://tanipradwniemczech.de/sitemap.xml',
  }
}
```

- [ ] **Krok 3: OG Image (ręcznie)**

Utwórz obraz `public/og-image.png` w Canva (1200×630px):
- Tło: `#0a0f1e`
- Tekst: "Tani Prąd w Niemczech — Zaoszczędź do 300 € rocznie"
- Logo: ⚡
- Kolor akcentu: `#fbd38d`

- [ ] **Krok 4: Commit**

```bash
git add src/app/sitemap.ts src/app/robots.ts
git commit -m "feat: sitemap, robots.txt, SEO metadata"
```

---

## Task 13: Deploy na Vercel

- [ ] **Krok 1: Zainstaluj Vercel CLI**

```bash
npm install -g vercel
```

- [ ] **Krok 2: Zaloguj się i połącz projekt**

```bash
vercel login
vercel link
```

- [ ] **Krok 3: Dodaj zmienne środowiskowe w Vercel**

Wejdź na vercel.com → Project → Settings → Environment Variables, dodaj wszystkie z `.env.local`.

- [ ] **Krok 4: Deploy preview**

```bash
vercel
```

Sprawdź wygenerowany URL preview — przetestuj formularz, WhatsApp, przełącznik języka, panel /admin.

- [ ] **Krok 5: Deploy produkcyjny**

```bash
vercel --prod
```

- [ ] **Krok 6: Podepnij domenę**

W Vercel → Project → Domains → dodaj `tanipradwniemczech.de`.

W panelu DNS Twojego rejestratora dodaj:
```
A     @    76.76.21.21
CNAME www  cname.vercel-dns.com
```

- [ ] **Krok 7: Końcowy commit**

```bash
git add -A
git commit -m "feat: production deploy ready — tanipradwniemczech.de"
```

---

## Self-review checku specyfikacji

| Wymaganie ze spec | Task |
|---|---|
| Strona główna /pl i /ua | Task 8 |
| /pl/faq, /ua/faq | Task 9 |
| /pl/about, /ua/about | Task 9 |
| Formularz z upload rachunku | Task 6 (LeadForm) |
| Walidacja frontend | Task 4 |
| Walidacja backend | Task 5 |
| Supabase zapis leadu | Task 5 |
| Email przez Resend | Task 5 |
| WhatsApp sticky button | Task 7 |
| Panel /admin z leadami | Task 10 |
| Ochrona /admin hasłem | Task 3 (middleware) + Task 10 |
| 2 wersje językowe | Task 3 (i18n) |
| hreflang SEO | Task 8 (layout) |
| Sitemap + robots | Task 12 |
| Nav z przełącznikiem | Task 6 |
| Hero + StatsBar | Task 6, 7 |
| Jak to działa | Task 7 |
| O mnie ze zdjęciem | Task 7 |
| Karuzela dostawców | Task 7 |
| Opinie | Task 7 |
| Tabela porównawcza | Task 7 |
| FAQ accordion | Task 7 |
| Końcowe CTA | Task 7 |
| Stopka z FB | Task 7 |
| Deploy Vercel | Task 13 |
| Domena tanipradwniemczech.de | Task 13 |

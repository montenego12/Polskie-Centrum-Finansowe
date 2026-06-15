# Specyfikacja — Tani Prąd w Niemczech (tanipradwniemczech.de)

Data: 2026-06-15  
Autor: Patryk Kuklinski  
Status: Zatwierdzony

---

## 1. Cel projektu

Zbudowanie strony sprzedażowej `tanipradwniemczech.de` generującej leady dla doradcy finansowego specjalizującego się w optymalizacji kosztów energii elektrycznej i gazu na rynku niemieckim. Partner handlowy: Teleson GmbH.

**Główny cel:** Pozyskanie kontaktu od potencjalnego klienta (lead = wypełniony formularz lub wiadomość WhatsApp).

---

## 2. Architektura — Opcja B: Landing page + podstrony

### Struktura URL

```
/pl                    — strona główna (polski)
/pl/faq                — FAQ po polsku
/pl/o-mnie             — O mnie po polsku

/ua                    — головна (ukraiński)
/ua/faq                — FAQ po ukraińsku
/ua/pro-mene           — Про мене po ukraińsku
```

- `hreflang` na wszystkich stronach (SEO dwujęzyczne)
- `/` (root) — redirect do `/pl`

### Panel administracyjny

```
/admin                 — panel zarządzania leadami (hasło)
```

---

## 3. Stack technologiczny

| Warstwa | Technologia |
|---|---|
| Framework | Next.js 14 (App Router) |
| Język | TypeScript |
| Style | Tailwind CSS |
| Deploy | Vercel |
| Email leadów | Resend |
| Baza leadów | Supabase (tabela `leads`) |
| Upload plików | Supabase Storage |
| Panel admina | Next.js route `/admin` + middleware (hasło) |

---

## 4. Design

### Styl wizualny

- **Tło:** ciemne (`#0a0f1e`) — premium, nowoczesne
- **Akcent główny:** złoty (`#fbd38d`, `#f6ad55`)
- **Akcent pomocniczy:** niebieski (`#2b6cb0`)
- **Sukces/WhatsApp:** zielony (`#25D366`, `#68d391`)
- **CTA:** czerwony (`#e53e3e`)

### Efekty i animacje

- Animated gradient background w sekcji Hero (orby świetlne)
- Glassmorphism na formularzu (`backdrop-filter: blur`)
- Shimmer na przycisku CTA
- Pulsujący WhatsApp button (sticky, fixed)
- Hover: karty unoszą się (`translateY(-6px)`)
- Sticky nav z frosted glass (`backdrop-filter: blur(20px)`)
- Fade-in animacje przy ładowaniu Hero

### Responsywność

- Mobile-first
- Breakpointy: `sm` (640px), `md` (768px), `lg` (1024px)
- Na mobile: formularz pod tekstem (jedna kolumna), sticky WhatsApp button widoczny zawsze

---

## 5. Sekcje strony głównej (/pl)

### 1. Nawigacja (sticky)
- Logo: `⚡ Tani Prąd w Niemczech`
- Linki: Jak to działa, O mnie, Opinie, FAQ
- Przełącznik języka: PL / UA
- Przycisk WhatsApp (zielony)
- Tło: frosted glass przy scrollowaniu

### 2. Hero
**Lewa kolumna:**
- Badge: "Doradztwo energetyczne w Niemczech"
- Nagłówek: "Płacisz za dużo za prąd lub gaz w Niemczech?"
- Podtytuł: oszczędność do 300 € rocznie, bezpłatnie, w języku klienta
- 4 checkmarki: bezpłatna analiza, obsługa w języku ojczystym, zmiana bez przerwy, Partner Teleson GmbH

**Prawa kolumna (formularz glass):**
- Imię i nazwisko
- Telefon (+49...)
- Email
- Miasto w Niemczech
- Toggle: ⚡ Prąd / 🔥 Gaz
- Upload: zdjęcie rachunku (opcjonalnie, JPG/PNG/PDF max 10MB)
- CTA: "SPRAWDŹ ILE ZAOSZCZĘDZISZ →" (czerwony, shimmer)
- Secondary CTA: "💬 lub napisz na WhatsApp: +49 176 83425546"

### 3. Stats Bar
- 300 € — średnia oszczędność rocznie
- 2–4 tyg. — czas zmiany dostawcy
- 100% — bezpłatna usługa
- 0 — ukrytych kosztów

### 4. Jak to działa (4 kroki)
1. Wyślij rachunek
2. Porównujemy oferty
3. Podpisujesz umowę
4. Zaczynasz oszczędzać

### 5. O mnie
- Zdjęcie Patryka (plik: `481082102_1747158726016885_7808489550504134885_n.jpg`) — floating animation
- Badge: "⚡ Partner Teleson GmbH"
- Cytat: "Pomagam mieszkańcom Niemiec płacić mniej za energię. Prosto, w ich języku, bez ukrytych kosztów."
- Grid 2x2 korzyści: Bezpłatna analiza, Obsługa w Twoim języku, Szybka zmiana, Zero ukrytych kosztów

### 6. Dostawcy energii (karuzela logotypów)
- Auto-scrolling karuzela z logo dostawców (Vattenfall, E.ON, GASAG, EnBW i inni dostępni przez Teleson)
- Nagłówek: "Porównujemy oferty od najlepszych dostawców w Niemczech"
- Buduje wiarygodność — pokazuje że pracujemy z prawdziwymi, dużymi firmami
- Logotypy do pobrania/potwierdzenia z Teleson GmbH

### 7. Opinie klientów (3 karty)
- Placeholder testimoniale z kwotami oszczędności (do zastąpienia realnymi)
- Każda karta: ★★★★★, cytat, imię, miasto, tag oszczędności (np. `−240 €/rok`)
- Konkretne % oszczędności (np. "zaoszczędziłem 28% miesięcznie")

### 8. Tabela porównawcza
Sekcja: "Dlaczego warto wybrać doradcę zamiast porównywarki?"

| | Tani Prąd w Niemczech | Porównywarki online |
|---|---|---|
| Obsługa w Twoim języku | ✅ | ❌ |
| Bezpłatna analiza rachunku | ✅ | ❌ |
| Pomoc przy podpisaniu umowy | ✅ | ❌ |
| Negocjacja warunków | ✅ | ❌ |
| Kontakt bezpośredni | ✅ | ❌ |
| Wsparcie po zmianie | ✅ | ❌ |

### 9. FAQ (accordion, 15–20 pytań)
- Układ: accordion (jedno pytanie na raz)
- Na stronie głównej: 6 najważniejszych pytań + link do `/pl/faq`
- Pełna lista na `/pl/faq`

**Pytania na stronie głównej:**
1. Czy to naprawdę bezpłatne?
2. Jak długo trwa zmiana dostawcy?
3. Czy podczas zmiany będę bez prądu?
4. Czy mogę zmienić dostawcę w trakcie umowy?
5. Czy obsługujesz też gaz?
6. Jakie dokumenty są potrzebne?

**Dodatkowe pytania na /pl/faq:**
7. Co jeśli mój dostawca nie chce mnie zwolnić?
8. Czy zmiana dostawcy jest legalna?
9. Jak działa rozliczenie przy zmianie?
10. Co to jest Grundversorger i czy muszę tam zostać?
11. Czy mogę zmienić dostawcę jeśli wynajmuję mieszkanie?
12. Kiedy zaczną obowiązywać nowe stawki?
13. Co jeśli nowy dostawca zbankrutuje?
14. Czy mogę zmienić zarówno prąd jak i gaz jednocześnie?
15. Jak często warto sprawdzać oferty?

### 11. Końcowe CTA
- Nagłówek: "Gotowy żeby płacić mniej?"
- Dwa przyciski: WhatsApp + Formularz

### 12. Stopka
- Logo + info prawne
- Linki: Praca w Niemczech (FB), Polskie Centrum Finansowe (FB), Polityka prywatności, Impressum

### 13. Sticky WhatsApp
- Zielony pulsujący button, fixed bottom-right
- Link: `https://wa.me/4917683425546`

---

## 6. Formularz — logika

### Walidacja (frontend)
- Imię: wymagane
- Telefon: wymagane, format +49...
- Email: wymagane, format email
- Miasto: wymagane
- Prąd/Gaz: wymagane (min. 1)
- Zdjęcie: opcjonalne

### Po wysłaniu formularza (backend — API Route)
1. Walidacja po stronie serwera
2. Upload zdjęcia do Supabase Storage (jeśli dodane)
3. Zapis leadu do tabeli `leads` w Supabase
4. Wysłanie emaila na adres Patryka przez Resend
5. Wyświetlenie potwierdzenia użytkownikowi

### Tabela `leads` (Supabase)
```sql
id          uuid primary key
created_at  timestamptz
name        text
phone       text
email       text
city        text
type        text[]  -- ['electricity', 'gas']
bill_url    text    -- nullable, Supabase Storage URL
language    text    -- 'pl' | 'ua'
status      text    -- 'new' | 'contacted' | 'converted' | 'closed'
notes       text    -- nullable
```

---

## 7. Panel admina (/admin)

- Ochrona: middleware Next.js + hasło (env variable)
- Lista leadów: tabela sortowana po dacie (newest first)
- Kolumny: data, imię, telefon, email, miasto, typ, język, status
- Akcje: zmiana statusu, notatki, podgląd zdjęcia rachunku
- Eksport: CSV (opcjonalnie w v2)

---

## 8. SEO

- `hreflang` PL/UA na każdej stronie
- `lang` atrybut HTML (`pl` lub `uk`)
- Meta title i description w obu językach
- Sitemap (`/sitemap.xml`)
- robots.txt
- Open Graph tags (pod Meta Ads)
- Canonical URL

---

## 9. Kontakt

- WhatsApp: +49 176 83425546
- Link: `https://wa.me/4917683425546`
- Email Patryka (do konfiguracji w env): `kontakt.kontakt125@protonmail.com`

---

## 10. Zasoby

- Zdjęcie Patryka: `public/patryk.jpg` (skopiowane z Downloads)
- Facebook 1: Praca w Niemczech (2k fanów)
- Facebook 2: Polskie Centrum Finansowe (400 fanów)

---

## 11. Zmienne środowiskowe (.env.local)

```
NEXT_PUBLIC_WHATSAPP_NUMBER=4917683425546
RESEND_API_KEY=...
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...
ADMIN_PASSWORD=...
CONTACT_EMAIL=kontakt.kontakt125@protonmail.com
```

---

## 12. Kolejność wdrożenia

1. Scaffolding projektu Next.js + Tailwind + TypeScript
2. Komponenty UI (design system: kolory, typografia, animacje)
3. Strona główna `/pl` — wszystkie sekcje
4. Formularz + API route + Supabase + Resend
5. Strona `/pl/faq` i `/pl/o-mnie`
6. Wersja ukraińska `/ua` (tłumaczenie)
7. Panel `/admin`
8. SEO (meta, hreflang, sitemap)
9. Deploy na Vercel + domena tanipradwniemczech.de

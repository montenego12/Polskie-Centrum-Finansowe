# TaniPrad — strony miejskie (programmatic SEO) — Design

Data: 2026-07-02

## Kontekst

PCF (`finansewniemczech.de`) ma już 55 stron miejskich (`/pcf/pl/{miasto}`) generowanych programistycznie dla SEO, oparte na wspólnej liście `GERMAN_CITIES` (`src/lib/pcf-cities.ts`). TaniPrad (`tanipradwniemczech.de`) obecnie ma tylko 3 strony: home, `/faq`, `/about`, w pl i ua. Celem jest replikacja tego samego wzorca dla TaniPrad — strony miejskie promujące zmianę dostawcy prądu/gazu, per miasto, w obu językach serwisu (pl, ua).

## Zakres

- 55 miast × 2 języki (pl, ua) = **110 nowych stron statycznych** pod `/{lang}/{miasto}`.
- Reużycie istniejących komponentów strony głównej (`Hero`, `LeadForm`, `StatsBar`, `HowItWorks`, `ComparisonTable`, `Reviews`, `Nav`, `Footer`, `WhatsAppChat`) zamiast budowania nowego układu od zera.
- Dodanie unikalnej treści per miasto, żeby uniknąć thin/duplicate content w oczach Google — bez tego 110 stron różniących się tylko jednym nagłówkiem może nie zostać zaindeksowanych.

## Ryzyko: thin content

Gdyby strona miejska różniła się od strony głównej wyłącznie podmienionym H1, Google może potraktować wszystkie 110 stron jako niemal identyczne i pominąć większość z indeksu — cała robota SEO poszłaby na marne. Mitygacja (analogicznie do PCF): każda strona dostaje minimum dwa unikalne bloki treści wspominające miasto (sekcja "dlaczego {miasto}" + mini-FAQ), plus unikalny JSON-LD z `areaServed`.

## Zmiany w danych

**`src/lib/pcf-cities.ts`** (plik już współdzielony między PCF i TaniPrad — bez zmiany nazwy pliku, poza zakresem tego zadania):

```ts
export interface CityData {
  name: string
  slug: string
  state: string
  locative: string        // polski przypadek miejscownik, istniejące pole
  namePolish?: string      // istniejące pole
  nameUkrainian?: string   // NOWE — ukraiński egzonim/transliteracja miasta
}
```

`nameUkrainian` uzupełniane dla wszystkich 55 miast. Używane w konstrukcji **"у місті {nameUkrainian ?? name}"** zamiast odmiany przez przypadek (miejscownik) — to częsta, naturalna praktyka w ukraińskim dla obcych nazw własnych i pozwala uniknąć błędów gramatycznych przy ręcznym tworzeniu 55 form miejscownika.

## Routing

**`src/app/[lang]/[miasto]/page.tsx`** (nowy plik), wzorowany na `src/app/pcf/[lang]/[miasto]/page.tsx`:

- `generateStaticParams()` → iloczyn kartezjański `GERMAN_CITIES × ['pl', 'ua']` (110 kombinacji)
- `dynamicParams = false` — nieznany slug/język → `notFound()`
- `generateMetadata({ params })` — title/description/keywords per miasto i język, wzorce inline w pliku (tak jak w PCF), nie w centralnym systemie i18n

## Zmiany w komponentach współdzielonych

**`src/components/Hero.tsx`** — dwa nowe opcjonalne propsy, zero zmian w zachowaniu domyślnym:

```ts
interface HeroProps {
  t: Translations['hero']
  tForm: Translations['form']
  lang: Lang
  titleAccentOverride?: string   // NOWE
  prefillCity?: string           // NOWE
}
```

- `titleAccentOverride` podmienia `t.titleAccent` w renderowanym `<h1>` (np. PL: `"w Niemczech?"` → `city.locative + '?'`; UA: `"у Німеччині?"` → `` `у місті ${city.nameUkrainian ?? city.name}?` ``). Gdy `undefined` (strona główna) — bez zmian.
- `prefillCity` przekazywany do `LeadForm`.

**`src/components/LeadForm.tsx`** — nowy opcjonalny prop `prefillCity?: string`, ustawia `defaultValue` na polu `city` (`<input name="city" defaultValue={prefillCity} .../>`). Domyślnie `undefined` → zachowanie bez zmian.

Pozostałe komponenty (`StatsBar`, `HowItWorks`, `ComparisonTable`, `Reviews`, `Nav`, `Footer`, `WhatsAppChat`) — **bez zmian**, reużyte jeden do jednego jak na stronie głównej.

## Unikalna treść per strona (nowa, tylko w `[miasto]/page.tsx`)

1. **Hero** (opisany wyżej) — unikalny H1 + prefill formularza.
2. **Sekcja "Dlaczego {miasto}"** — 4-6 kafelków tekstowych generowanych z szablonu wspominającego nazwę miasta (wzorowane na PCF "WHY US"), inline w komponencie strony, nie w i18n.
3. **Mini-FAQ** — 4-5 pytań/odpowiedzi z miastem wstrzykniętym w treść (wzorzec `q: (city) => ...` z PCF `[miasto]/page.tsx`).
4. **JSON-LD** — osobny blok `FinancialService` z `areaServed: { "@type": "City", name: city.name }`, analogiczny do PCF, oprócz istniejącego globalnego `JsonLd` (bez zmian).
5. **Siatka linków do innych miast** — ~30 losowych/pozostałych miast z linkami `/{lang}/{slug}`, SEO interlinking (jak w PCF).

## SEO — sitemap

`src/app/sitemap.ts` — dodanie 110 URL (`https://tanipradwniemczech.de/{lang}/{slug}`) do istniejącej tablicy `tpUrls`, priorytet niższy niż strona główna (np. 0.7, spójnie z PCF).

## Edge cases

- Nieznany slug miasta → `notFound()` (identycznie jak PCF).
- Brak `nameUkrainian` dla któregoś miasta → fallback na `city.name` (łacińska nazwa niemiecka) w konstrukcji "у місті X" — nie blokuje builda.
- Strona główna (`/pl`, `/ua`) i pozostałe istniejące strony (`/faq`, `/about`) — zero zmian w zachowaniu, propsy nowe są opcjonalne.

## Testowanie / weryfikacja

- `npx tsc --noEmit` — brak błędów typów.
- `npx next build` — build generuje 110 statycznych stron `/{lang}/{miasto}`, bez błędów.
- Ręczna weryfikacja: każda strona ma dokładnie jeden `<h1>`, poprawny `canonical`, unikalny JSON-LD z `areaServed`.
- Test lokalny w przeglądarce: `/pl/berlin`, `/ua/berlin` — sprawdzić prefill pola miasta w formularzu i poprawność ukraińskiego tekstu.

## Poza zakresem (świadomie)

- Zmiana nazwy pliku `pcf-cities.ts` na coś neutralnego (np. `german-cities.ts`) — wymagałoby aktualizacji importów w 9+ plikach PCF, nie wnosi wartości biznesowej teraz.
- Tłumaczenie treści `ComparisonTable`/`Reviews`/`HowItWorks` per miasto — te sekcje pozostają generyczne (widget-like), tak jak w PCF.
- Strony miejskie dla DE (TaniPrad nie obsługuje `de` w ogóle, brak takiej strony głównej).

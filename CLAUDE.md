# Konwencja sesji
- `"Dzień dobry"` — wczytaj kontekst z `logs/daily_summaries/` (ostatni plik) + memory
- `"Wrap Up"` — zapisz podsumowanie dnia do `logs/daily_summaries/YYYY-MM-DD.md` + zaktualizuj CLAUDE.md + memory

## Format Wrap Up
```markdown
# Session Summary — YYYY-MM-DD

## Co zrobiliśmy
- [lista zmian]

## Do zrobienia (następna sesja)
- [ ] zadanie 1
- [ ] zadanie 2

## Stan plików
- `ścieżka/plik` — status
```

---

## Kompetencje i projekty Patryka

### Tworzenie stron internetowych

Buduję nowoczesne strony internetowe od podstaw z wykorzystaniem AI oraz nowoczesnego stacku technologicznego.

#### Preferowany stack
* Next.js · React · TypeScript · Tailwind CSS · Vercel · AI-assisted development

#### Standard pracy
* Projektowanie struktury strony od zera
* Tworzenie architektury projektu
* Budowa komponentów UI
* Optymalizacja SEO, szybkości, responsywność (mobile-first)
* Integracja formularzy i automatyzacji
* Wdrożenie na Vercel, skalowalna architektura

#### Typy projektów
Strony firmowe, landing pages, usługowe, sklepy, B2B, marki premium, wellness, home & garden

---

## Zasady współpracy AI

1. Zakładaj budowę od zera w Next.js + TypeScript + Tailwind CSS
2. Projektuj nowoczesny, premium design
3. Myśl jak właściciel biznesu, nie tylko programista
4. Priorytetem jest konwersja i sprzedaż
5. Strona gotowa do wdrożenia na Vercel
6. Twórz pełną strukturę projektu wraz z komponentami
7. Uwzględniaj SEO już na etapie projektowania
8. Proponuj rozwiązania skalowalne dla przyszłego rozwoju marki

---

# TANIPRAD — Projekt strony internetowej

## Aktualny stan (na 2026-09-18)

Dwa produkty na jednym repo Next.js/TypeScript/Tailwind (`montenego12/Polskie-Centrum-Finansowe` na GitHub, wdrożenie Vercel):

- **TaniPrad w Niemczech** (tanipradwniemczech.de) — zmiana dostawcy prądu/gazu, WhatsApp + zdjęcie rachunku. Meta Pixel (`1769016521096458`) zainstalowany i działa na żywo (zdarzenia PageView/Lead/Contact, bez danych osobowych w payloadzie). Odświeżony branding: fonty Fraunces (nagłówki) + Manrope (body), nowe logo/favicon (ciemny kwadrat + czerwona błyskawica), usunięte wszystkie wzmianki "Partner Teleson GmbH".
- **PCF — Polskie Centrum Finansowe** (finansewniemczech.de, `/pcf/*`) — Patryk jako niezależny doradca DVAG.

Twarda zasada: żadnych fabrykowanych opinii klientów (nazwisko + miasto + kwota) w reklamach/treściach — narusza niemieckie prawo UWG. (Opinie obecnie na stronie TaniPrad są prawdziwe, potwierdzone przez Patryka.)

**Kampania Meta Ads TaniPrad — AKTYWNA i wydaje realne pieniądze (patrz memory `taniprad-meta-ads-strategia`):** portfolio firmowe **"Tani prąd i gaz w Niemczech"** (business_id 1808050286990434), konto reklamowe **"TaniPrad Ads"** (EUR, act=1075894921824145). Kampania "TaniPrad - Ruch - PL/UA - wrzesień 2026" → zestaw "zestaw reklam Tani Prad i Gaz" → **4 aktywne reklamy** (karuzela, reklama + ja, rachunek + telefon, Rolka z muzyka). Cel wyników: "Zmaksymalizuj liczbę wyświetleń strony docelowej" (świadomie NIE "Konwersje" — za mało zdarzeń Lead na razie; przełączyć gdy uzbiera się ~15-50 Lead/tydzień). Automatyzacja Claude in Chrome w tym projekcie odblokowana za zgodą Patryka.

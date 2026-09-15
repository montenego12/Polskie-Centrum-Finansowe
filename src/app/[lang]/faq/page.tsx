import { getTranslations, type Lang } from '@/lib/i18n'
import { Nav } from '@/components/Nav'
import { FaqAccordion } from '@/components/FaqAccordion'
import { Footer } from '@/components/Footer'
import { StickyWhatsApp } from '@/components/StickyWhatsApp'
import type { Metadata } from 'next'

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
    { q: 'Що таке Grundversorger і чи потрібно там залишатися?', a: "Grundversorger — це місцевий постачальник за замовчуванням, зазвичай дорожчий. Ви не зобов'язані там залишатися." },
    { q: 'Чи можу я змінити постачальника якщо знімаю квартиру?', a: 'Так, якщо у вас є прямий договір з постачальником (Direktvertrag). Ми разом перевіримо вашу ситуацію.' },
    { q: 'Коли набудуть чинності нові тарифи?', a: 'Нові тарифи зазвичай починають діяти протягом 4–6 тижнів після підписання договору.' },
    { q: 'Що якщо новий постачальник збанкрутує?', a: 'У Німеччині діє принцип Grundversorgung — місцевий постачальник зобов\'язаний забезпечити постачання. Ви не залишитеся без електрики.' },
    { q: 'Чи можу я змінити і електрику, і газ одночасно?', a: 'Так. Можемо змінити обох постачальників одночасно, що часто дає кращі умови.' },
    { q: 'Як часто варто перевіряти пропозиції?', a: 'Рекомендую перевіряти кожні 12 місяців або після закінчення поточного договору.' },
    { q: 'Як відбувається розрахунок при зміні?', a: 'Старий постачальник виставляє кінцевий рахунок після зняття показань лічильника. Новий починає виставляти рахунки з дати переходу.' },
    { q: 'Чи законна зміна постачальника?', a: 'Так, 100%. Зміна постачальника енергії — право кожного споживача в Німеччині (§ 41a EnWG).' },
  ],
}

interface Props { params: Promise<{ lang: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params
  const title = lang === 'ua'
    ? 'Часті запитання про зміну постачальника електрики та газу | Tani Prąd'
    : 'Najczęstsze pytania o zmianę dostawcy prądu i gazu | Tani Prąd'
  const description = lang === 'ua'
    ? 'Відповіді на найпоширеніші запитання про зміну постачальника електрики та газу в Німеччині — безкоштовно, вашою мовою.'
    : 'Odpowiedzi na najczęstsze pytania o zmianę dostawcy prądu i gazu w Niemczech — bezpłatnie, w Twoim języku.'
  return {
    metadataBase: new URL('https://tanipradwniemczech.de'),
    title,
    description,
    alternates: {
      canonical: `https://tanipradwniemczech.de/${lang}/faq`,
    },
    openGraph: {
      title,
      description,
      url: `https://tanipradwniemczech.de/${lang}/faq`,
      siteName: 'Tani Prąd w Niemczech',
      locale: lang === 'ua' ? 'uk_UA' : 'pl_PL',
      type: 'website',
    },
  }
}

export default async function FaqPage({ params }: Props) {
  const { lang: langStr } = await params
  const lang = langStr as Lang
  const t = getTranslations(lang)
  const extra = faqExtra[lang] ?? faqExtra.pl
  const fullFaq = { ...t.faq, items: [...t.faq.items, ...extra] }

  return (
    <>
      <Nav t={t.nav} lang={lang} />
      <main>
        <FaqAccordion t={fullFaq} lang={lang} />
      </main>
      <Footer t={t.footer} lang={lang} />
      <StickyWhatsApp />
    </>
  )
}

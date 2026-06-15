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
                {l === 'pl' ? 'PL' : 'UA'}
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

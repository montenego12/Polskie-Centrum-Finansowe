'use client'
import { useRouter, usePathname } from 'next/navigation'
import { useState } from 'react'
import type { Lang, Translations } from '@/lib/i18n'

interface NavProps { t: Translations['nav']; lang: Lang }

export function Nav({ t, lang }: NavProps) {
  const router = useRouter()
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  function switchLang(newLang: Lang) {
    const newPath = pathname.replace(`/${lang}`, `/${newLang}`)
    router.push(newPath)
    setOpen(false)
  }

  const waNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER

  return (
    <nav className="sticky top-0 z-50 border-b border-gold/15 bg-dark/85 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-gold to-gold-600 text-lg">
            ⚡
          </div>
          <span className="text-base font-extrabold">
            Tani Prąd <span className="text-gold">w Niemczech</span>
          </span>
        </div>

        {/* Desktop */}
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
            href={`https://wa.me/${waNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg bg-wa px-5 py-2 text-xs font-bold text-white transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-wa/30"
          >
            💬 {t.whatsapp}
          </a>
        </div>

        {/* Mobile — hamburger + lang switcher */}
        <div className="flex items-center gap-3 md:hidden">
          <div className="flex gap-1 rounded-lg border border-white/10 bg-white/5 p-1">
            {(['pl', 'ua'] as Lang[]).map(l => (
              <button
                key={l}
                onClick={() => switchLang(l)}
                className={`rounded-md px-2.5 py-1 text-xs font-bold transition ${
                  l === lang ? 'bg-gold text-dark' : 'text-white/50 hover:text-white'
                }`}
              >
                {l === 'pl' ? 'PL' : 'UA'}
              </button>
            ))}
          </div>
          <button
            onClick={() => setOpen(!open)}
            className="flex h-9 w-9 flex-col items-center justify-center gap-1.5 rounded-lg border border-white/10 bg-white/5"
            aria-label="Menu"
          >
            <span className={`block h-0.5 w-5 bg-white transition-all ${open ? 'translate-y-2 rotate-45' : ''}`} />
            <span className={`block h-0.5 w-5 bg-white transition-all ${open ? 'opacity-0' : ''}`} />
            <span className={`block h-0.5 w-5 bg-white transition-all ${open ? '-translate-y-2 -rotate-45' : ''}`} />
          </button>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      {open && (
        <div className="border-t border-white/5 bg-dark/95 px-6 pb-5 pt-4 md:hidden">
          <div className="flex flex-col gap-1">
            {(['howItWorks', 'about', 'reviews', 'faq'] as const).map(key => (
              <a
                key={key}
                href={`#${key}`}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-3 text-sm text-white/70 transition hover:bg-white/5 hover:text-gold"
              >
                {t[key]}
              </a>
            ))}
            <a
              href={`https://wa.me/${waNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-xl bg-wa py-3 text-center text-sm font-bold text-white"
            >
              💬 {t.whatsapp}
            </a>
          </div>
        </div>
      )}
    </nav>
  )
}

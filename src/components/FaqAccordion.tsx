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

'use client'
import { useState } from 'react'
import type { PcfTranslations, Lang } from '@/lib/i18n/pcf'

interface Props { t: PcfTranslations['faq']; lang: Lang; preview?: boolean }

export function PcfFaqAccordion({ t, lang, preview = false }: Props) {
  const [open, setOpen] = useState<number | null>(null)
  const items = preview ? t.items.slice(0, 4) : t.items

  return (
    <section id="faq" className="bg-black px-6 py-20 md:px-12">
      <div className="mx-auto max-w-3xl">
        <p className="mb-2 text-center text-xs font-bold uppercase tracking-widest text-[#c9a227]">{t.label}</p>
        {preview
          ? <h2 className="mb-10 text-center text-3xl font-black text-white">{t.title}</h2>
          : <h1 className="mb-10 text-center text-3xl font-black text-white">{t.title}</h1>}
        <div className="flex flex-col gap-3">
          {items.map((item, i) => (
            <div key={i} className={`overflow-hidden rounded-xl border transition ${open === i ? 'border-[#c9a227]' : 'border-white/10 hover:border-[#c9a227]/50'}`}>
              <button onClick={() => setOpen(open === i ? null : i)}
                className="flex w-full items-center justify-between px-5 py-4 text-left text-sm font-bold text-white">
                <span>{item.q}</span>
                <span className={`ml-4 flex-shrink-0 text-[#c9a227] transition-transform ${open === i ? 'rotate-180' : ''}`}>▼</span>
              </button>
              {open === i && (
                <p className="border-t border-[#c9a227]/30 px-5 pb-5 pt-4 text-sm leading-relaxed text-gray-400">{item.a}</p>
              )}
            </div>
          ))}
        </div>
        {preview && (
          <div className="mt-8 text-center">
            <a href={`/pcf/${lang}/faq`} className="text-sm font-bold text-[#c9a227] underline underline-offset-4 hover:text-white">{t.more}</a>
          </div>
        )}
      </div>
    </section>
  )
}

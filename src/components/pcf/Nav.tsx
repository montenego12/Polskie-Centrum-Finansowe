'use client'
import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import type { PcfTranslations, Lang } from '@/lib/i18n/pcf'

interface Props { t: PcfTranslations['nav']; lang: Lang }

const MENU_LABEL = { pl: ['Otwórz menu', 'Zamknij menu'], ua: ['Відкрити меню', 'Закрити меню'], de: ['Menü öffnen', 'Menü schließen'] } as const

export function PcfNav({ t, lang }: Props) {
  const [open, setOpen] = useState(false)
  const base = `/pcf/${lang}`
  const tpBase = `https://tanipradwniemczech.de/${lang}`
  const waNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '4917683425546'
  const [openLabel, closeLabel] = MENU_LABEL[lang] ?? MENU_LABEL.pl

  return (
    <nav className="sticky top-0 z-50 border-b border-white/10 bg-[#0a0a0a]">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3 md:px-12">
        <Link href={base} className="flex items-center gap-3">
          <Image src="/pcf-photo.jpg" alt="Polskie Centrum Finansowe w Niemczech" width={64} height={64} className="rounded-lg object-cover" />
          <div className="hidden lg:block">
            <div className="text-sm font-black leading-tight text-white">Polskie Centrum Finansowe</div>
            <div className="text-[10px] text-[#c9a227] leading-tight tracking-wide">w Niemczech · Patryk Kukliński</div>
          </div>
        </Link>

        {/* Desktop links */}
        <div className="hidden items-center gap-3 lg:flex mr-4">
          <Link href={`${base}#oferta`} className="text-xs font-medium text-white/70 transition hover:text-[#c9a227]">{t.offer}</Link>
          <Link href={`${base}/ubezpieczenia`} className="text-xs font-medium text-white/70 transition hover:text-[#c9a227]">{t.insurance}</Link>
          <Link href={`${base}/kredyty`} className="text-xs font-medium text-white/70 transition hover:text-[#c9a227]">{t.loans}</Link>
          <Link href={`${base}/rozliczenie-podatkowe`} className="text-xs font-medium text-[#c9a227] transition hover:text-[#b8891e]">{t.taxes}</Link>
          <Link href={`${base}/o-nas`} className="text-xs font-medium text-white/70 transition hover:text-[#c9a227]">{t.about}</Link>
          <Link href={`${base}/faq`} className="text-xs font-medium text-white/70 transition hover:text-[#c9a227]">{t.faq}</Link>
        </div>

        {/* Desktop actions */}
        <div className="hidden shrink-0 items-center gap-3 lg:flex">
          <div className="flex items-center gap-1 rounded-lg border border-white/15 px-2 py-1.5">
            {([['pl','pl'],['de','de'],['ua','ua']] as const).map(([l, code]) => (
              <Link key={l} href={`/pcf/${l}`}
                className={`flex items-center rounded px-1.5 py-0.5 transition bg-white/10 ${lang === l ? 'ring-1 ring-[#c9a227]' : 'opacity-50 hover:opacity-90'}`}>
                <Image src={`https://flagcdn.com/20x15/${code}.png`} alt={l.toUpperCase()} width={20} height={15} className="rounded-[2px]" />
              </Link>
            ))}
          </div>
          <a href={tpBase} className="rounded-lg border border-white/15 px-2 py-1.5 text-[10px] font-bold text-white/50 hover:border-white/30 hover:text-white/70 transition whitespace-nowrap">
            {t.switchTo}
          </a>
          <a href={`https://wa.me/${waNumber}`} target="_blank" rel="noopener noreferrer"
            className="rounded-lg bg-[#c9a227] px-4 py-2 text-xs font-bold uppercase tracking-wide text-black transition hover:bg-[#b8891e] whitespace-nowrap">
            {t.whatsapp}
          </a>
        </div>

        {/* Mobile */}
        <div className="relative z-10 flex items-center gap-2 lg:hidden">
          <div className="flex items-center gap-1">
            {([['pl','pl'],['de','de'],['ua','ua']] as const).map(([l, code]) => (
              <Link key={l} href={`/pcf/${l}`}
                className={`flex items-center rounded px-1 py-1 transition bg-white/10 ${lang === l ? 'ring-1 ring-[#c9a227]' : 'opacity-40'}`}>
                <Image src={`https://flagcdn.com/20x15/${code}.png`} alt={l.toUpperCase()} width={20} height={15} className="rounded-[2px]" />
              </Link>
            ))}
          </div>
          <button
            type="button"
            onClick={() => setOpen(prev => !prev)}
            aria-label={open ? closeLabel : openLabel}
            aria-expanded={open}
            className="relative z-10 flex h-11 w-11 cursor-pointer flex-col items-center justify-center gap-1.5 rounded-lg border border-white/15 bg-transparent">
            {open ? (
              <>
                <span className="h-0.5 w-5 translate-y-[3px] rotate-45 bg-white/70" />
                <span className="h-0.5 w-5 -translate-y-[3px] -rotate-45 bg-white/70" />
              </>
            ) : (
              <>
                <span className="h-0.5 w-5 bg-white/70" />
                <span className="h-0.5 w-5 bg-white/70" />
                <span className="h-0.5 w-5 bg-white/70" />
              </>
            )}
          </button>
        </div>
      </div>

      <div className={`border-t border-white/10 bg-[#0a0a0a] px-6 py-4 lg:hidden ${open ? 'block' : 'hidden'}`}>
        <div className="flex flex-col gap-3">
          <Link href={`${base}#oferta`} onClick={() => setOpen(false)} className="text-sm font-medium text-white/70">{t.offer}</Link>
          <Link href={`${base}/ubezpieczenia`} onClick={() => setOpen(false)} className="text-sm font-medium text-white/70">{t.insurance}</Link>
          <Link href={`${base}/kredyty`} onClick={() => setOpen(false)} className="text-sm font-medium text-white/70">{t.loans}</Link>
          <Link href={`${base}/rozliczenie-podatkowe`} onClick={() => setOpen(false)} className="text-sm font-bold text-[#c9a227]">{t.taxes}</Link>
          <Link href={`${base}/o-nas`} onClick={() => setOpen(false)} className="text-sm font-medium text-white/70">{t.about}</Link>
          <Link href={`${base}/faq`} onClick={() => setOpen(false)} className="text-sm font-medium text-white/70">{t.faq}</Link>
          <hr className="border-white/10" />
          <a href={tpBase} className="text-sm font-bold text-white/30">{t.switchTo}</a>
          <a href={`https://wa.me/${waNumber}`} target="_blank" rel="noopener noreferrer"
            className="rounded-xl bg-[#c9a227] py-3.5 text-center text-sm font-bold uppercase tracking-wide text-black">
            {t.whatsapp}
          </a>
        </div>
      </div>
    </nav>
  )
}

import type { PcfTranslations, Lang } from '@/lib/i18n/pcf'
import { HeroSlideshow } from './HeroSlideshow'

interface Props { t: PcfTranslations['hero']; lang: Lang }

export function PcfHero({ t }: Props) {
  const waNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '4917683425546'
  return (
    <section className="relative overflow-hidden px-6 py-16 md:py-24 md:px-12">
      <HeroSlideshow />
      <div className="absolute inset-0 bg-black/60" />
      <div className="relative z-10 mx-auto max-w-3xl text-center">
          <p className="mb-5 text-xs font-bold uppercase tracking-widest text-[#c9a227]">{t.badge}</p>
          <h1 className="mb-5 text-4xl font-black leading-tight text-white md:text-5xl lg:text-6xl">
            {t.title}<br />
            <span className="text-[#c9a227]">{t.titleAccent}</span>
          </h1>
          <p className="mb-8 text-base leading-relaxed text-gray-300 max-w-xl mx-auto">{t.subtitle}</p>
          <ul className="mb-10 flex flex-col gap-3 max-w-md mx-auto text-left">
            {t.checks.map((check, i) => (
              <li key={i} className="flex items-center gap-3">
                <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-[#c9a227] text-[11px] font-black text-black">✓</span>
                <span className="text-sm text-gray-200">{check}</span>
              </li>
            ))}
          </ul>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href={`https://wa.me/${waNumber}`} target="_blank" rel="noopener noreferrer"
              className="inline-block rounded-lg bg-[#c9a227] px-8 py-4 text-sm font-extrabold uppercase tracking-wide text-black transition hover:bg-[#b8891e] hover:-translate-y-0.5">
              {t.cta}
            </a>
            <a href={`https://wa.me/${waNumber}`} target="_blank" rel="noopener noreferrer"
              className="inline-block rounded-lg border-2 border-white/50 px-8 py-4 text-sm font-bold text-white transition hover:bg-white hover:text-black">
              💬 WhatsApp
            </a>
          </div>
          <p className="mt-4 text-xs text-gray-500">{t.ctaWa}</p>
      </div>
    </section>
  )
}

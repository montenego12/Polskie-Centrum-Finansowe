import Image from 'next/image'
import type { PcfTranslations } from '@/lib/i18n/pcf'

interface Props { t: PcfTranslations['about']; standalone?: boolean }

export function PcfAbout({ t, standalone = false }: Props) {
  const NameTag = standalone ? 'h1' : 'h2'
  return (
    <section id="about" className="bg-black px-6 py-20 md:px-12">
      <div className="mx-auto grid max-w-6xl gap-16 md:grid-cols-2 items-center">
        <div className="flex justify-center">
          <div className="relative">
            <div className="relative h-80 w-64 overflow-hidden rounded-2xl border-2 border-[#c9a227]/60 shadow-xl">
              <Image src="/pcf-hero.jpg" alt={t.imgAlt} fill className="object-cover object-center" />
            </div>
            <div className="absolute -bottom-2.5 -right-2.5 rounded-xl bg-[#c9a227] px-4 py-2.5 text-xs font-extrabold text-black shadow-lg">
              📍 Magdeburg, DE
            </div>
          </div>
        </div>
        <div>
          <p className="mb-2 text-xs font-bold uppercase tracking-widest text-[#c9a227]">{t.label}</p>
          <NameTag className="mb-1 text-2xl font-black text-white">{t.name}</NameTag>
          <p className="mb-1 text-sm font-semibold text-[#c9a227]">{t.role}</p>
          <p className="mb-5 text-xs text-gray-500">📍 {t.address}</p>
          <blockquote className="mb-6 border-l-4 border-[#c9a227] pl-5 text-lg font-bold leading-relaxed text-white">
            „{t.quote}”
          </blockquote>
          <p className="mb-8 text-sm leading-relaxed text-gray-400">{t.desc}</p>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {t.benefits.map((b, i) => (
              <div key={i} className="flex gap-3 rounded-xl border border-white/10 bg-white/5 p-4 transition hover:border-[#c9a227]/40">
                <span className="mt-0.5 text-xl flex-shrink-0">{b.icon}</span>
                <div>
                  <p className="text-xs font-bold text-white">{b.title}</p>
                  <p className="text-[10px] text-gray-500 leading-relaxed">{b.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

import Image from 'next/image'
import type { Translations } from '@/lib/i18n'

export function About({ t, standalone = false }: { t: Translations['about']; standalone?: boolean }) {
  const NameTag = standalone ? 'h1' : 'h2'
  return (
    <section id="about" className="border-y border-white/5 bg-white/[0.02] px-6 py-20 md:px-12">
      <div className="mx-auto grid max-w-6xl gap-16 md:grid-cols-2 items-center">
        <div className="flex justify-center">
          <div className="relative">
            <div className="relative h-80 w-64 overflow-hidden rounded-2xl border border-gold/20 shadow-[0_40px_80px_rgba(0,0,0,0.5)] animate-float">
              <Image src="/patryk.jpg" alt={t.imgAlt} fill className="object-cover object-top" />
            </div>
            <div className="absolute -bottom-2.5 -right-2.5 rounded-xl bg-gradient-to-br from-gold to-gold-600 px-4 py-2.5 text-xs font-extrabold text-dark shadow-[0_8px_24px_rgba(251,211,141,0.3)]">
              ⚡ {t.badge}
            </div>
          </div>
        </div>

        <div>
          <p className="mb-2 text-xs font-bold uppercase tracking-widest text-gold">{t.label}</p>
          <NameTag className="mb-1 text-xl font-black">{t.name}</NameTag>
          <p className="mb-5 text-xs text-gold">{t.role}</p>
          <blockquote className="mb-5 border-l-2 border-gold pl-5 text-lg font-bold leading-relaxed">
            „{t.quote}”
          </blockquote>
          <p className="mb-6 text-sm leading-relaxed text-white/60">{t.desc}</p>
          <div className="grid grid-cols-2 gap-3.5">
            {t.benefits.map((b, i) => (
              <div key={i} className="flex gap-3 rounded-xl border border-white/7 bg-white/3 p-3.5 transition hover:border-gold/30 hover:translate-x-1">
                <span className="mt-0.5 text-xl flex-shrink-0">{b.icon}</span>
                <div>
                  <p className="text-xs font-bold">{b.title}</p>
                  <p className="text-[10px] text-white/50 leading-relaxed">{b.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

import type { Translations } from '@/lib/i18n'
import type { Lang } from '@/lib/i18n'
import { LeadForm } from './LeadForm'

interface HeroProps { t: Translations['hero']; tForm: Translations['form']; lang: Lang }

export function Hero({ t, tForm, lang }: HeroProps) {
  return (
    <section className="relative overflow-hidden bg-[linear-gradient(135deg,#0a0f1e_0%,#0d1b3e_50%,#0a1628_100%)] bg-[length:400%_400%] animate-gradientShift px-6 py-15 md:px-12 md:py-20 min-h-[60vh] flex items-center">
      {/* Orbs */}
      <div className="absolute -top-24 -right-24 h-[500px] w-[500px] rounded-full bg-brand opacity-15 blur-[80px] animate-orbFloat" />
      <div className="absolute bottom-0 left-[10%] h-[400px] w-[400px] rounded-full bg-gold opacity-[0.08] blur-[80px] animate-orbFloat [animation-delay:-4s]" />
      <div className="absolute top-[40%] -left-12 h-[300px] w-[300px] rounded-full bg-green-400 opacity-[0.06] blur-[80px] animate-orbFloat [animation-delay:-2s]" />

      <div className="relative z-10 mx-auto grid w-full max-w-6xl gap-16 md:grid-cols-2 items-center">
        {/* Left */}
        <div>
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-4 py-1.5 text-xs font-semibold text-gold animate-fadeInUp">
            <span className="h-1.5 w-1.5 rounded-full bg-gold animate-pulse" />
            {t.badge}
          </div>

          <h1 className="mb-4 text-4xl font-black leading-tight md:text-5xl animate-fadeInUp [animation-delay:0.1s]">
            {t.title} <span className="text-gold">{t.titleAccent}</span>
          </h1>

          <p className="mb-7 text-base leading-relaxed text-white/65 animate-fadeInUp [animation-delay:0.2s]">
            {t.subtitle} <strong className="text-xl text-gold">300 €</strong>.{' '}
            {t.subtitleSuffix}
          </p>

          <ul className="flex flex-col gap-3 animate-fadeInUp [animation-delay:0.3s]">
            {t.checks.map((check, i) => (
              <li key={i} className="flex items-center gap-3 text-sm text-white/80">
                <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-green-500 to-green-700 text-xs">✓</span>
                {check}
              </li>
            ))}
          </ul>
        </div>

        {/* Right — Form */}
        <div className="animate-fadeInUp [animation-delay:0.2s]">
          <LeadForm t={t} tForm={tForm} lang={lang} />
        </div>
      </div>
    </section>
  )
}

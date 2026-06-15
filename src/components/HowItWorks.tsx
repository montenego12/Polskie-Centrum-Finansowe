import type { Translations } from '@/lib/i18n'

export function HowItWorks({ t }: { t: Translations['howItWorks'] }) {
  return (
    <section id="howItWorks" className="px-6 py-20 md:px-12">
      <div className="mx-auto max-w-6xl">
        <p className="mb-2 text-center text-xs font-bold uppercase tracking-widest text-gold">{t.label}</p>
        <h2 className="mb-12 text-center text-3xl font-black">
          {t.heading} <span className="text-gold">{t.title}</span>
        </h2>
        <div className="grid gap-5 md:grid-cols-4">
          {t.steps.map((step, i) => (
            <div
              key={i}
              className={`relative overflow-hidden rounded-2xl border p-6 transition-all duration-300 animate-borderGlow hover:-translate-y-1.5 hover:shadow-2xl ${
                i === 3
                  ? 'border-green-500/20 hover:border-green-500/50 hover:shadow-green-500/10'
                  : 'border-white/8 hover:border-gold/40'
              }`}
            >
              <span className="absolute right-4 top-3 text-5xl font-black text-gold/10 leading-none select-none">
                {i + 1}
              </span>
              <div className="mb-3 text-3xl">{step.icon}</div>
              <h3 className="mb-2 text-sm font-bold">{step.title}</h3>
              <p className="text-xs leading-relaxed text-white/50">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

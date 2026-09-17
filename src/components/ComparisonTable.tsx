import type { Translations } from '@/lib/i18n'

export function ComparisonTable({ t }: { t: Translations['comparison'] }) {
  return (
    <section className="border-y border-white/5 bg-white/[0.02] px-6 py-20 md:px-12">
      <div className="mx-auto max-w-3xl">
        <p className="mb-2 text-center text-xs font-bold uppercase tracking-widest text-gold">{t.subtitle}</p>
        <h2 className="font-display mb-10 text-center text-2xl font-black md:text-3xl">{t.title}</h2>
        <div className="overflow-hidden rounded-2xl border border-white/10">
          <div className="grid grid-cols-3 gap-px bg-white/10">
            <div className="bg-dark px-4 py-3 text-xs font-bold text-white/40" />
            <div className="bg-dark px-4 py-3 text-center text-xs font-bold text-gold">{t.us}</div>
            <div className="bg-dark px-4 py-3 text-center text-xs font-bold text-white/40">{t.them}</div>
          </div>
          {t.rows.map((row, i) => (
            <div key={i} className="grid grid-cols-3 gap-px bg-white/5">
              <div className="bg-dark px-4 py-3.5 text-xs text-white/70">{row}</div>
              <div className="flex items-center justify-center bg-dark px-4 py-3.5 text-base text-green-400">✅</div>
              <div className="flex items-center justify-center bg-dark px-4 py-3.5 text-base text-red-400">❌</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

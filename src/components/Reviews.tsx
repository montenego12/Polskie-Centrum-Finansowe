import type { Translations } from '@/lib/i18n'

export function Reviews({ t }: { t: Translations['reviews'] }) {
  return (
    <section id="reviews" className="px-6 py-20 md:px-12">
      <div className="mx-auto max-w-6xl">
        <p className="mb-2 text-center text-xs font-bold uppercase tracking-widest text-gold">{t.label}</p>
        <h2 className="mb-12 text-center text-3xl font-black">
          <span className="text-gold">{t.title}</span>
        </h2>
        <div className="grid gap-5 md:grid-cols-3">
          {t.items.map((r, i) => (
            <div key={i} className="rounded-2xl border border-white/8 bg-white/3 p-6 transition hover:-translate-y-1 hover:shadow-2xl">
              <div className="mb-3 tracking-widest text-gold">★★★★★</div>
              <p className="mb-4 text-sm italic leading-relaxed text-white/70">"{r.text}"</p>
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-brand to-brand-900 text-sm">
                  👤
                </div>
                <div>
                  <p className="text-xs font-bold">{r.name}</p>
                  <p className="text-[10px] text-white/40">{r.city}</p>
                </div>
                <span className="ml-auto rounded-full border border-green-500/20 bg-green-500/10 px-2 py-0.5 text-[10px] font-bold text-green-400">
                  {r.savings}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

import type { Translations } from '@/lib/i18n'

export function ProvidersCarousel({ t }: { t: Translations['providers'] }) {
  const doubled = [...t.names, ...t.names]

  return (
    <section className="overflow-hidden border-b border-white/5 py-14">
      <p className="mb-8 px-6 text-center text-sm font-bold text-white/70">{t.title}</p>
      <div className="flex gap-8 animate-scrollX whitespace-nowrap">
        {doubled.map((name, i) => (
          <div
            key={i}
            className="inline-flex h-12 min-w-[120px] items-center justify-center rounded-lg border border-white/10 bg-white/5 px-6 text-sm font-bold text-white/60"
          >
            {name}
          </div>
        ))}
      </div>
    </section>
  )
}

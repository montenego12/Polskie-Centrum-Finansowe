import type { Translations } from '@/lib/i18n'

export function StatsBar({ stats }: { stats: Translations['stats'] }) {
  return (
    <div className="grid grid-cols-2 gap-px bg-gold/10 border-y border-gold/10 md:grid-cols-4">
      {stats.map((s, i) => (
        <div key={i} className="bg-dark px-6 py-6 text-center">
          <div className="text-3xl font-black text-gold leading-none mb-1">{s.value}</div>
          <div className="text-xs text-white/50">{s.label}</div>
        </div>
      ))}
    </div>
  )
}

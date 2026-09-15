import type { PcfTranslations } from '@/lib/i18n/pcf'

interface Props { t: PcfTranslations['insurance'] }

export function PcfInsuranceList({ t }: Props) {
  return (
    <section className="bg-gray-300 px-6 py-20 md:px-12">
      <div className="mx-auto max-w-6xl">
        <p className="mb-2 text-center text-xs font-bold uppercase tracking-widest text-[#c9a227]">{t.label}</p>
        <h1 className="mb-3 text-center text-3xl font-black text-gray-900">
          {t.title} <span className="text-[#c9a227]">{t.titleAccent}</span>
        </h1>
        <p className="mb-12 text-center text-sm text-gray-500 max-w-2xl mx-auto">{t.subtitle}</p>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {t.items.map((item, i) => (
            <div key={i} className="rounded-2xl border border-gray-200 bg-gray-200 p-5 shadow-sm hover:shadow-md hover:border-[#c9a227]/40 transition-all">
              <div className="mb-3 flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0d1b3e]/5 text-xl">{item.icon}</span>
                <div>
                  <h3 className="text-sm font-bold text-gray-900">{item.name}</h3>
                  <p className="text-[10px] text-gray-400 italic">{item.german}</p>
                </div>
              </div>
              <p className="text-xs leading-relaxed text-gray-500">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

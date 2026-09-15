import type { PcfTranslations } from '@/lib/i18n/pcf'

interface Props { t: PcfTranslations['loans']; extras: PcfTranslations['extras'] }

export function PcfLoansList({ t, extras }: Props) {
  return (
    <>
      <section className="bg-gray-300 px-6 py-20 md:px-12">
        <div className="mx-auto max-w-6xl">
          <p className="mb-2 text-center text-xs font-bold uppercase tracking-widest text-[#c9a227]">{t.label}</p>
          <h1 className="mb-3 text-center text-3xl font-black text-gray-900">
            {t.title} <span className="text-[#c9a227]">{t.titleAccent}</span>
          </h1>
          <p className="mb-12 text-center text-sm text-gray-500 max-w-2xl mx-auto">{t.subtitle}</p>
          <div className="grid gap-5 sm:grid-cols-2">
            {t.items.map((item, i) => (
              <div key={i} className="rounded-2xl border border-gray-200 bg-gray-200 p-6 shadow-sm hover:shadow-md transition-all">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#0d1b3e]/5 text-2xl">{item.icon}</div>
                <h3 className="mb-2 text-base font-black text-gray-900">{item.name}</h3>
                <p className="text-sm leading-relaxed text-gray-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gray-300 px-6 py-20 md:px-12">
        <div className="mx-auto max-w-6xl">
          <p className="mb-2 text-center text-xs font-bold uppercase tracking-widest text-[#c9a227]">{extras.label}</p>
          <h2 className="mb-12 text-center text-3xl font-black text-gray-900">
            {extras.title} <span className="text-[#0d1b3e]">{extras.titleAccent}</span>
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {extras.items.map((item, i) => (
              <div key={i} className="rounded-2xl border border-gray-200 bg-gray-200 p-5 shadow-sm hover:shadow-md transition-all">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-[#0d1b3e]/5 text-xl">{item.icon}</div>
                <h3 className="mb-1.5 text-sm font-bold text-gray-900">{item.name}</h3>
                <p className="text-xs leading-relaxed text-gray-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

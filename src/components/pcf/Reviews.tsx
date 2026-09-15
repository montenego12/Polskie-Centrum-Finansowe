import type { PcfTranslations } from '@/lib/i18n/pcf'

interface Props { t: PcfTranslations['reviews'] }

export function PcfReviews({ t }: Props) {
  return (
    <section className="bg-gray-300 px-6 py-20 md:px-12">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 flex flex-col items-center gap-6 text-center sm:flex-row sm:justify-between sm:text-left">
          <div>
            <p className="mb-2 text-xs font-bold uppercase tracking-widest text-[#c9a227]">{t.label}</p>
            <h2 className="text-3xl font-black text-black">{t.title}</h2>
          </div>
          <div className="flex flex-col items-center gap-1 rounded-2xl border-2 border-[#c9a227] bg-black px-8 py-5">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => <span key={i} className="text-[#c9a227] text-xl">★</span>)}
            </div>
            <p className="text-3xl font-black text-white">{t.rating}</p>
            <p className="text-xs font-semibold text-gray-400">{t.ratingCount}</p>
          </div>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {t.items.map((r, i) => (
            <div key={i} className="flex flex-col rounded-2xl border-2 border-gray-200 bg-gray-200 p-7 transition hover:border-[#c9a227]">
              <div className="mb-4 flex gap-0.5">
                {[...Array(5)].map((_, j) => <span key={j} className="text-[#c9a227]">★</span>)}
              </div>
              <p className="mb-6 flex-1 text-sm leading-relaxed text-gray-700">„{r.text}”</p>
              <div className="flex items-center gap-3 border-t-2 border-gray-100 pt-4">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-black text-sm font-black text-[#c9a227]">
                  {r.name.charAt(0)}
                </div>
                <div>
                  <p className="text-xs font-bold text-black">{r.name}</p>
                  <p className="text-[10px] text-gray-500">{r.city} · {r.service}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

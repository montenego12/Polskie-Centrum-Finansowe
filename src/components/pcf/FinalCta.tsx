import type { PcfTranslations } from '@/lib/i18n/pcf'

interface Props { t: PcfTranslations['finalCta'] }

export function PcfFinalCta({ t }: Props) {
  const waNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '4917683425546'
  return (
    <section className="bg-gray-300 px-6 py-24 md:px-12 text-center border-y-2 border-gray-100">
      <p className="mb-3 text-xs font-bold uppercase tracking-widest text-[#c9a227]">{t.label}</p>
      <h2 className="mb-3 text-3xl font-black text-black md:text-4xl">
        {t.title} <span className="text-[#c9a227]">{t.titleAccent}</span>
      </h2>
      <p className="mb-10 text-base text-gray-600">{t.subtitle}</p>
      <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
        <a href={`https://wa.me/${waNumber}`} target="_blank" rel="noopener noreferrer"
          className="rounded-xl bg-[#25d366] px-9 py-5 text-base font-extrabold text-white shadow-lg transition hover:-translate-y-0.5">
          {t.wa}
        </a>
        <a href="mailto:patryk.kuk@pm.me"
          className="rounded-xl border-2 border-black bg-white px-9 py-5 text-base font-bold text-black transition hover:bg-black hover:text-white">
          {t.email}
        </a>
      </div>
    </section>
  )
}

import type { PcfTranslations } from '@/lib/i18n/pcf'
import Image from 'next/image'

const PARTNERS = [
  { name: 'Allianz', img: '/logo-allianz.png' },
  { name: 'Generali', img: '/logo-generali.svg' },
  { name: 'Santander', img: '/logo-santander.png' },
  { name: 'DVAG', img: '/logo-dvag.svg' },
  { name: 'Badenia', img: '/logo-badenia.svg' },
  { name: 'Deutsche Bank', img: '/logo-deutsche-bank.svg' },
  { name: 'Advocard', img: '/logo-advocard.svg' },
  { name: 'BKK Linde', img: '/logo-bkk-linde.png' },
  { name: 'Commerzbank', img: '/logo-commerzbank.svg' },
]

interface Props { t: PcfTranslations['trust'] }

export function PcfTrust({ t }: Props) {
  return (
    <section className="bg-gray-300 px-6 py-20 md:px-12">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-16 md:grid-cols-2 items-start">
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-widest text-[#c9a227]">{t.label}</p>
            <h2 className="mb-8 text-2xl font-black leading-tight text-black md:text-3xl">{t.title}</h2>
            <ul className="flex flex-col divide-y divide-gray-200">
              {t.points.map((point, i) => (
                <li key={i} className="flex items-start gap-4 py-4 first:pt-0 last:pb-0">
                  <span className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-[#c9a227] text-[11px] font-black text-black">✓</span>
                  <span className="text-sm leading-relaxed text-gray-700">{point}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="mb-6 text-xs font-bold uppercase tracking-widest text-[#c9a227]">{t.partnersLabel}</p>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {PARTNERS.map((p, i) => (
                <div key={i} className="flex items-center justify-center rounded-xl border-2 border-gray-300 bg-gray-200 p-4 transition hover:border-[#c9a227]" style={{ minHeight: 80 }}>
                  <div className="relative h-10 w-full">
                    <Image src={p.img} alt={p.name} fill sizes="(max-width: 640px) 40vw, (max-width: 1024px) 25vw, 15vw" className="object-contain" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

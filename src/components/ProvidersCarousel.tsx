import Image from 'next/image'
import type { Translations } from '@/lib/i18n'

const PROVIDER_LOGOS = [
  { name: 'Vattenfall', file: 'vattenfall.webp' },
  { name: 'RheinEnergie', file: 'rheinenergie.png' },
  { name: 'eprimo', file: 'eprimo.png' },
  { name: 'enviaM', file: 'enviam.png' },
  { name: 'eins', file: 'eins.png' },
]

export function ProvidersCarousel({ t }: { t: Translations['providers'] }) {
  const doubled = [...PROVIDER_LOGOS, ...PROVIDER_LOGOS]

  return (
    <section className="overflow-hidden border-b border-white/5 py-14">
      <p className="mb-8 px-6 text-center text-sm font-bold text-white/70">{t.title}</p>
      <div className="flex w-max animate-scrollX">
        {doubled.map((logo, i) => (
          <div
            key={i}
            className="mr-6 inline-flex h-16 w-44 flex-shrink-0 items-center justify-center rounded-xl bg-white px-5 py-3"
          >
            <Image
              src={`/providers/${logo.file}`}
              alt={logo.name}
              width={140}
              height={40}
              className="h-9 w-auto object-contain mix-blend-multiply"
            />
          </div>
        ))}
      </div>
    </section>
  )
}

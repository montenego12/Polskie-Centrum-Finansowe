import Link from 'next/link'
import Image from 'next/image'
import type { PcfTranslations, Lang } from '@/lib/i18n/pcf'

const SERVICE_IMAGES = [
  'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=600&h=320&fit=crop',
  'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&h=320&fit=crop',
  'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&h=320&fit=crop',
  'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&h=320&fit=crop',
  'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600&h=320&fit=crop',
  'https://images.unsplash.com/photo-1568992687947-868a62a9f521?w=600&h=320&fit=crop',
]

interface Props { t: PcfTranslations['services']; lang: Lang }

export function PcfServicesOverview({ t, lang }: Props) {
  return (
    <section id="oferta" className="bg-gray-300 px-6 py-20 md:px-12">
      <div className="mx-auto max-w-6xl">
        <p className="mb-3 text-center text-xs font-bold uppercase tracking-widest text-[#c9a227]">{t.label}</p>
        <h2 className="mb-3 text-center text-3xl font-black text-black md:text-4xl">{t.title}</h2>
        <p className="mb-12 text-center text-sm text-gray-500">{t.titleAccent}</p>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {t.categories.map((cat, i) => (
            <div key={i} className="flex flex-col rounded-2xl bg-gray-200 shadow-sm border border-gray-200 overflow-hidden transition hover:shadow-md hover:-translate-y-0.5">
              <div className="relative h-48 w-full">
                <Image
                  src={SERVICE_IMAGES[i]}
                  alt={cat.title}
                  fill
                  priority={i < 2}
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </div>
              <div className="flex flex-col flex-1 p-6">
                <h3 className="mb-2 text-lg font-black text-black">{cat.title}</h3>
                <p className="mb-5 text-sm leading-relaxed text-gray-500 flex-1">{cat.desc}</p>
                <Link
                  href={`/pcf/${lang}/${cat.href}`}
                  className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wide text-[#c9a227] hover:underline"
                >
                  {cat.cta} →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

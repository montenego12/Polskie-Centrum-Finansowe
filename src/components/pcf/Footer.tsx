import Link from 'next/link'
import type { PcfTranslations, Lang } from '@/lib/i18n/pcf'

interface Props { t: PcfTranslations['footer']; lang: Lang }

export function PcfFooter({ t, lang }: Props) {
  const base = `/pcf/${lang}`
  return (
    <footer className="bg-black px-6 py-12 md:px-12">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-8 md:grid-cols-3 pb-10 border-b border-white/10">
          <div>
            <p className="mb-2 text-sm font-black text-white">Polskie Centrum Finansowe</p>
            <p className="text-xs text-[#c9a227]">w Niemczech</p>
            <p className="mt-3 text-xs text-gray-500 leading-relaxed">📍 {t.address}</p>
          </div>
          <div>
            <p className="mb-4 text-xs font-bold uppercase tracking-widest text-[#c9a227]">Oferta</p>
            <ul className="flex flex-col gap-2">
              <li><Link href={`${base}/ubezpieczenia`} className="text-xs text-gray-400 hover:text-white transition">Ubezpieczenia</Link></li>
              <li><Link href={`${base}/kredyty`} className="text-xs text-gray-400 hover:text-white transition">Kredyty i finansowanie</Link></li>
              <li><Link href={`${base}/bankowosc`} className="text-xs text-gray-400 hover:text-white transition">Bankowość osobista</Link></li>
              <li><Link href={`${base}/inwestycje`} className="text-xs text-gray-400 hover:text-white transition">Inwestycje i Bausparkasse</Link></li>
            </ul>
          </div>
          <div>
            <p className="mb-4 text-xs font-bold uppercase tracking-widest text-[#c9a227]">Informacje</p>
            <ul className="flex flex-col gap-2">
              <li><Link href={`${base}/o-nas`} className="text-xs text-gray-400 hover:text-white transition">O nas</Link></li>
              <li><Link href={`${base}/faq`} className="text-xs text-gray-400 hover:text-white transition">FAQ</Link></li>
              <li><Link href={`${base}/polityka-prywatnosci`} className="text-xs text-gray-400 hover:text-white transition">{t.privacy}</Link></li>
              <li><Link href={`${base}/impressum`} className="text-xs text-gray-400 hover:text-white transition">{t.impressum}</Link></li>
              <li><Link href={`/${lang}`} className="text-xs font-bold text-[#c9a227] hover:text-white transition">{t.switchTo}</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-gray-600">{t.rights}</p>
          <div className="flex items-center gap-2">
            {(['pl', 'de', 'ua'] as const).filter(l => l !== lang).map(l => (
              <Link key={l} href={`/pcf/${l}`} className="text-xs font-bold text-gray-600 hover:text-[#c9a227] transition">
                {l.toUpperCase()}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

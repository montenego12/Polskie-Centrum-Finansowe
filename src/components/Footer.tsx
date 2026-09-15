import type { Translations, Lang } from '@/lib/i18n'

export function Footer({ t, lang }: { t: Translations['footer']; lang: Lang }) {
  const pcfLang = lang === 'ua' ? 'ua' : 'pl'
  return (
    <footer className="border-t border-white/5 bg-[#060a14] px-6 py-7 md:px-12">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <p className="text-xs text-white/30">{t.rights}</p>
        <div className="flex flex-wrap gap-5">
          <a href="https://www.facebook.com/groups/pracawniemczech" target="_blank" rel="noopener noreferrer" className="text-xs text-white/30 transition hover:text-gold">📘 {t.fb1}</a>
          <a href="https://www.facebook.com/CentrumUbezpieczeniow/" target="_blank" rel="noopener noreferrer" className="text-xs text-white/30 transition hover:text-gold">📘 {t.fb2}</a>
          <a href={`https://finansewniemczech.de/pcf/${pcfLang}/polityka-prywatnosci`} className="text-xs text-white/30 transition hover:text-gold">{t.privacy}</a>
          <a href={`https://finansewniemczech.de/pcf/${pcfLang}/impressum`} className="text-xs text-white/30 transition hover:text-gold">{t.impressum}</a>
        </div>
      </div>
    </footer>
  )
}

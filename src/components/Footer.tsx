import type { Translations } from '@/lib/i18n'

export function Footer({ t }: { t: Translations['footer'] }) {
  return (
    <footer className="border-t border-white/5 bg-[#060a14] px-6 py-7 md:px-12">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <p className="text-xs text-white/30">{t.rights}</p>
        <div className="flex flex-wrap gap-5">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-xs text-white/30 transition hover:text-gold">📘 {t.fb1}</a>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-xs text-white/30 transition hover:text-gold">📘 {t.fb2}</a>
          <a href="/privacy" className="text-xs text-white/30 transition hover:text-gold">{t.privacy}</a>
          <a href="/impressum" className="text-xs text-white/30 transition hover:text-gold">{t.impressum}</a>
        </div>
      </div>
    </footer>
  )
}

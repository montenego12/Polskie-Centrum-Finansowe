'use client'
import type { Translations } from '@/lib/i18n'

export function FinalCta({ t }: { t: Translations['finalCta'] }) {
  const waNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '4917683425546'

  return (
    <section className="border-t border-gold/10 bg-gradient-to-br from-brand/10 to-gold/5 px-6 py-24 md:px-12 text-center">
      <p className="mb-2 text-xs font-bold uppercase tracking-widest text-gold">{t.label}</p>
      <h2 className="font-display mb-3 text-3xl font-black md:text-4xl">
        {t.title} <span className="text-gold">{t.titleAccent}</span>
      </h2>
      <p className="mb-10 text-base text-white/60">{t.subtitle}</p>
      <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
        <a
          href={`https://wa.me/${waNumber}`}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => window.fbq?.('track', 'Contact')}
          className="rounded-xl bg-wa px-9 py-5 text-base font-extrabold text-white shadow-[0_8px_32px_rgba(37,211,102,0.3)] transition hover:-translate-y-0.5 hover:shadow-[0_16px_40px_rgba(37,211,102,0.4)]"
        >
          {t.wa}
        </a>
        <a
          href="#hero"
          className="rounded-xl border border-white/15 bg-white/5 px-9 py-5 text-base font-bold transition hover:bg-white/10 hover:border-white/30"
        >
          {t.form}
        </a>
      </div>
    </section>
  )
}

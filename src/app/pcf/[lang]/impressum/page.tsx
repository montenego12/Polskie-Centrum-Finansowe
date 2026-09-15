import { getPcfTranslations, VALID_PCF_LANGS, type Lang } from '@/lib/i18n/pcf'
import { notFound } from 'next/navigation'
import { PcfNav } from '@/components/pcf/Nav'
import { PcfFooter } from '@/components/pcf/Footer'
import type { Metadata } from 'next'

interface Props { params: Promise<{ lang: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params
  return {
    title: 'Impressum — Polskie Centrum Finansowe w Magdeburgu',
    robots: { index: false },
  }
}

export default async function ImpressumPage({ params }: Props) {
  const { lang: langStr } = await params
  const lang = langStr as Lang
  if (!VALID_PCF_LANGS.includes(lang)) notFound()
  const t = getPcfTranslations(lang)

  return (
    <>
      <PcfNav t={t.nav} lang={lang} />
      <main className="min-h-screen px-6 py-20 md:px-12">
        <div className="mx-auto max-w-2xl">
          <p className="mb-2 text-xs font-bold uppercase tracking-widest text-[#c9a227]">Informacje prawne</p>
          <h1 className="mb-10 text-3xl font-black text-gray-900">Impressum</h1>

          <div className="space-y-8 text-sm leading-relaxed text-gray-700">

            <section>
              <h2 className="mb-3 text-base font-black text-gray-900">Angaben gemäß § 5 TMG</h2>
              <p className="font-semibold text-gray-900">Patryk Błażej Kukliński</p>
              <p>Halberstädter Str. 29A</p>
              <p>39112 Magdeburg</p>
              <p>Deutschland</p>
            </section>

            <section>
              <h2 className="mb-3 text-base font-black text-gray-900">Tätigkeitsbereich</h2>
              <p>Allfinanz Deutsche Vermögensberatung (DVAG)</p>
            </section>

            <section>
              <h2 className="mb-3 text-base font-black text-gray-900">Kontakt</h2>
              <p>E-Mail: <a href="mailto:patryk.kuk@pm.me" className="text-[#c9a227] hover:underline">patryk.kuk@pm.me</a></p>
              <p>Telefon / WhatsApp: <a href="tel:+4917683425546" className="text-[#c9a227] hover:underline">+49 176 83425546</a></p>
            </section>

            <section>
              <h2 className="mb-3 text-base font-black text-gray-900">Aufsichtsbehörde</h2>
              <p>Deutsche Vermögensberatung AG (DVAG), Wilhelm-Leuschner-Straße 24, 60329 Frankfurt am Main</p>
            </section>

            <section>
              <h2 className="mb-3 text-base font-black text-gray-900">Haftungsausschluss</h2>
              <p className="text-gray-500">
                Die Inhalte dieser Website wurden mit größtmöglicher Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte wird keine Gewähr übernommen. Als Diensteanbieter sind wir gemäß § 7 Abs. 1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich.
              </p>
            </section>

            <div className="border-t border-gray-200 pt-6 text-xs text-gray-400">
              <p>© {new Date().getFullYear()} Patryk Kukliński · Polskie Centrum Finansowe w Niemczech</p>
            </div>
          </div>
        </div>
      </main>
      <PcfFooter t={t.footer} lang={lang} />
    </>
  )
}

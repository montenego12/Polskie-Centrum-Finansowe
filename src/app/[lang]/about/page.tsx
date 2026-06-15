import { getTranslations, type Lang } from '@/lib/i18n'
import { Nav } from '@/components/Nav'
import { About } from '@/components/About'
import { FinalCta } from '@/components/FinalCta'
import { Footer } from '@/components/Footer'
import { StickyWhatsApp } from '@/components/StickyWhatsApp'

interface Props { params: Promise<{ lang: string }> }

export default async function AboutPage({ params }: Props) {
  const { lang: langStr } = await params
  const lang = langStr as Lang
  const t = getTranslations(lang)
  return (
    <>
      <Nav t={t.nav} lang={lang} />
      <main className="pt-10">
        <About t={t.about} />
        <FinalCta t={t.finalCta} />
      </main>
      <Footer t={t.footer} />
      <StickyWhatsApp />
    </>
  )
}

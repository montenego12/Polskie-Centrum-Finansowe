import { ImageResponse } from 'next/og'
import { getPcfTranslations, type Lang } from '@/lib/i18n/pcf'

export const runtime = 'edge'
export const alt = 'Polskie Centrum Finansowe w Niemczech'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function OgImage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: langStr } = await params
  const lang = langStr as Lang
  const t = getPcfTranslations(lang)

  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          background: 'linear-gradient(135deg, #0a0f1e 0%, #0d1b3e 50%, #0a1628 100%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'sans-serif',
          padding: '60px',
          position: 'relative',
        }}
      >
        {/* Gold accent bar */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 6, background: '#c9a227' }} />

        {/* Monogram badge */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 72,
          height: 72,
          borderRadius: 20,
          background: 'rgba(201,162,39,0.15)',
          border: '2px solid #c9a227',
          marginBottom: 24,
        }}>
          <span style={{ fontSize: 30, fontWeight: 900, color: '#c9a227', letterSpacing: -1 }}>PCF</span>
        </div>

        {/* Badge */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          background: 'rgba(201,162,39,0.15)',
          border: '1px solid rgba(201,162,39,0.4)',
          borderRadius: 100,
          padding: '8px 20px',
          marginBottom: 32,
        }}>
          <span style={{ fontSize: 14, color: '#c9a227', fontWeight: 600, letterSpacing: 1 }}>
            {t.hero.badge}
          </span>
        </div>

        {/* Main headline */}
        <div style={{
          fontSize: 52,
          fontWeight: 900,
          color: '#ffffff',
          textAlign: 'center',
          lineHeight: 1.15,
          marginBottom: 20,
        }}>
          {t.hero.title}{' '}
          <span style={{ color: '#c9a227' }}>{t.hero.titleAccent}</span>
        </div>

        {/* Subtitle */}
        <div style={{
          fontSize: 22,
          color: 'rgba(255,255,255,0.65)',
          textAlign: 'center',
          marginBottom: 40,
          maxWidth: 820,
        }}>
          {t.about.role}
        </div>

        {/* Stats row */}
        <div style={{ display: 'flex', gap: 40 }}>
          {t.stats.slice(0, 4).map((s, i) => (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <span style={{ fontSize: 32, fontWeight: 900, color: '#c9a227' }}>{s.value}</span>
              <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', marginTop: 4 }}>{s.label}</span>
            </div>
          ))}
        </div>

        {/* Domain */}
        <div style={{
          position: 'absolute',
          bottom: 30,
          fontSize: 16,
          color: 'rgba(255,255,255,0.3)',
          letterSpacing: 1,
        }}>
          finansewniemczech.de
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  )
}

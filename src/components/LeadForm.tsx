'use client'
import { useState, useRef } from 'react'
import type { Translations } from '@/lib/i18n'
import type { Lang } from '@/lib/i18n'
import { validateLead, type EnergyType } from '@/lib/validate-lead'

interface LeadFormProps { t: Translations['hero']; tForm: Translations['form']; lang: Lang }

export function LeadForm({ t, tForm, lang }: LeadFormProps) {
  const [type, setType] = useState<EnergyType[]>([])
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const formRef = useRef<HTMLFormElement>(null)

  function toggleType(val: EnergyType) {
    setType(prev => prev.includes(val) ? prev.filter(t => t !== val) : [...prev, val])
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    type.forEach(t => fd.append('type', t))
    fd.set('language', lang)

    const input = {
      name: fd.get('name') as string,
      phone: fd.get('phone') as string,
      email: fd.get('email') as string,
      city: fd.get('city') as string,
      type,
      language: lang,
    }

    const validation = validateLead(input)
    if (!validation.ok) {
      setErrors(validation.errors as Record<string, string>)
      return
    }

    setErrors({})
    setStatus('sending')

    const res = await fetch('/api/leads', { method: 'POST', body: fd })
    setStatus(res.ok ? 'success' : 'error')
    if (res.ok) {
      formRef.current?.reset()
      window.fbq?.('track', 'Lead')
    }
  }

  if (status === 'success') {
    return (
      <div className="glass glass-top relative rounded-2xl p-8 text-center">
        <div className="mb-4 text-5xl">✅</div>
        <p className="text-lg font-bold text-gold">{tForm.success}</p>
      </div>
    )
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="glass glass-top relative rounded-2xl p-8">
      <p className="mb-1.5 text-center text-sm font-bold">
        📋 <span className="text-gold">{t.formTitle}</span>
      </p>
      <p className="mb-5 text-center text-xs text-white/50">{t.formSubtitle}</p>

      <div className="mb-2.5 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
        <Field name="name" placeholder={t.fields.name} error={errors.name} />
        <Field name="phone" placeholder={t.fields.phone} error={errors.phone} />
      </div>
      <Field name="email" placeholder={t.fields.email} error={errors.email} className="mb-2.5" />
      <Field name="city" placeholder={t.fields.city} error={errors.city} className="mb-2.5" />

      <div className="mb-2.5 grid grid-cols-2 gap-2.5">
        {(['electricity', 'gas'] as EnergyType[]).map(val => (
          <button
            key={val}
            type="button"
            onClick={() => toggleType(val)}
            className={`rounded-xl border py-2.5 text-xs transition ${
              type.includes(val)
                ? 'border-gold bg-gold/10 text-gold'
                : 'border-white/12 bg-white/6 text-white/50 hover:border-gold/50 hover:text-gold'
            }`}
          >
            {val === 'electricity' ? t.fields.electricity : t.fields.gas}
          </button>
        ))}
      </div>
      {errors.type && <p className="mb-2 text-xs text-red-400">{errors.type}</p>}

      <label className="mb-3.5 flex cursor-pointer flex-col items-center rounded-xl border border-dashed border-white/15 px-4 py-3 text-center text-xs text-white/40 transition hover:border-gold hover:text-gold">
        <span>{t.fields.upload}</span>
        <span className="mt-1 opacity-60">{t.fields.uploadHint}</span>
        <input type="file" name="bill" accept=".jpg,.jpeg,.png,.pdf" className="hidden" />
      </label>

      <button
        type="submit"
        disabled={status === 'sending'}
        className="relative mb-2.5 w-full overflow-hidden rounded-xl bg-cta py-4 text-sm font-extrabold tracking-wide text-white animate-pulse disabled:opacity-70"
      >
        <span className="relative z-10">{status === 'sending' ? tForm.sending : t.cta}</span>
        <span className="absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,rgba(255,255,255,0.15)_50%,transparent_100%)] bg-[length:200%_auto] animate-shimmer" />
      </button>

      <a
        href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '4917683425546'}`}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => window.fbq?.('track', 'Contact')}
        className="block w-full rounded-xl border border-wa/30 bg-wa/10 py-3.5 text-center text-xs font-bold text-wa transition hover:bg-wa/20"
      >
        💬 {t.ctaWa}
      </a>

      {status === 'error' && <p className="mt-2 text-center text-xs text-red-400">{tForm.error}</p>}
    </form>
  )
}

function Field({ name, placeholder, error, className = '' }: {
  name: string; placeholder: string; error?: string; className?: string
}) {
  return (
    <div className={className}>
      <input
        name={name}
        placeholder={placeholder}
        className="w-full rounded-xl border border-white/12 bg-white/6 px-3.5 py-3 text-xs text-white/50 outline-none transition placeholder:text-white/40 focus:border-gold focus:bg-white/8 focus:text-white"
      />
      {error && <p className="mt-1 text-xs text-red-400">{error}</p>}
    </div>
  )
}

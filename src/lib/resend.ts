import { Resend } from 'resend'

interface LeadEmailData {
  name: string
  phone: string
  email: string
  city: string
  type: string[]
  language: string
  billAttachment?: { filename: string; content: Buffer } | null
}

export async function sendLeadEmail(lead: LeadEmailData) {
  const resend = new Resend(process.env.RESEND_API_KEY)
  const typeLabel = lead.type.map(t => t === 'electricity' ? '⚡ Prąd' : '🔥 Gaz').join(', ')
  const lang = lead.language === 'ua' ? '🇺🇦 Ukraiński' : '🇵🇱 Polski'

  await resend.emails.send({
    from: 'Tani Prąd w Niemczech <onboarding@resend.dev>',
    to: process.env.CONTACT_EMAIL!,
    subject: `🔔 Nowy lead: ${lead.name} — ${lead.city} (${typeLabel})`,
    html: `
      <div style="font-family:sans-serif;max-width:500px;margin:0 auto">
        <h2 style="color:#0d1b3e">Nowe zgłoszenie z formularza</h2>
        <table style="width:100%;border-collapse:collapse">
          <tr><td style="padding:8px 0;color:#888">Imię i nazwisko</td><td style="padding:8px 0;font-weight:bold">${lead.name}</td></tr>
          <tr><td style="padding:8px 0;color:#888">Telefon</td><td style="padding:8px 0;font-weight:bold"><a href="tel:${lead.phone}">${lead.phone}</a></td></tr>
          <tr><td style="padding:8px 0;color:#888">Email</td><td style="padding:8px 0"><a href="mailto:${lead.email}">${lead.email}</a></td></tr>
          <tr><td style="padding:8px 0;color:#888">Miasto</td><td style="padding:8px 0">${lead.city}</td></tr>
          <tr><td style="padding:8px 0;color:#888">Typ energii</td><td style="padding:8px 0">${typeLabel}</td></tr>
          <tr><td style="padding:8px 0;color:#888">Język</td><td style="padding:8px 0">${lang}</td></tr>
          <tr><td style="padding:8px 0;color:#888">Rachunek</td><td style="padding:8px 0">${lead.billAttachment ? '✅ Załączony poniżej' : '—'}</td></tr>
        </table>
        <div style="margin-top:24px">
          <a href="https://wa.me/${lead.phone.replace(/\s/g, '')}" style="background:#25d366;color:#fff;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:bold">
            💬 Napisz na WhatsApp
          </a>
        </div>
      </div>
    `,
    attachments: lead.billAttachment ? [lead.billAttachment] : [],
  })
}

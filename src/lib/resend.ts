import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

interface LeadEmailData {
  name: string
  phone: string
  email: string
  city: string
  type: string[]
  language: string
  billUrl?: string | null
}

export async function sendLeadEmail(lead: LeadEmailData) {
  const typeLabel = lead.type.map(t => t === 'electricity' ? '⚡ Prąd' : '🔥 Gaz').join(', ')
  const billLine = lead.billUrl ? `\nRachunek: ${lead.billUrl}` : ''

  await resend.emails.send({
    from: 'Tani Prąd w Niemczech <noreply@tanipradwniemczech.de>',
    to: process.env.CONTACT_EMAIL!,
    subject: `🔔 Nowy lead: ${lead.name} (${lead.city})`,
    text: [
      `Imię: ${lead.name}`,
      `Telefon: ${lead.phone}`,
      `Email: ${lead.email}`,
      `Miasto: ${lead.city}`,
      `Typ: ${typeLabel}`,
      `Język: ${lead.language}`,
      billLine,
    ].filter(Boolean).join('\n'),
  })
}

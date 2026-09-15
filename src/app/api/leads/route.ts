import { NextRequest, NextResponse } from 'next/server'
import { validateLead, type EnergyType, type Language } from '@/lib/validate-lead'
import { sendLeadEmail } from '@/lib/resend'

export async function POST(request: NextRequest) {
  const formData = await request.formData()

  const rawType = formData.getAll('type') as string[]
  const input = {
    name: (formData.get('name') as string) ?? '',
    phone: (formData.get('phone') as string) ?? '',
    email: (formData.get('email') as string) ?? '',
    city: (formData.get('city') as string) ?? '',
    type: rawType as EnergyType[],
    language: ((formData.get('language') as string) ?? 'pl') as Language,
  }

  const validation = validateLead(input)
  if (!validation.ok) {
    return NextResponse.json({ errors: validation.errors }, { status: 400 })
  }

  const billFile = formData.get('bill') as File | null
  let billAttachment: { filename: string; content: Buffer } | null = null
  if (billFile && billFile.size > 0) {
    billAttachment = {
      filename: billFile.name,
      content: Buffer.from(await billFile.arrayBuffer()),
    }
  }

  try {
    await sendLeadEmail({ ...input, billAttachment })
  } catch (err) {
    console.error('Resend error:', err)
    return NextResponse.json({ error: String(err) }, { status: 500 })
  }

  return NextResponse.json({ ok: true }, { status: 201 })
}

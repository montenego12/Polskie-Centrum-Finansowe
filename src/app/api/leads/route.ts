import { NextRequest, NextResponse } from 'next/server'
import { validateLead, type EnergyType, type Language } from '@/lib/validate-lead'
import { createServerClient } from '@/lib/supabase/server'
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

  const supabase = createServerClient()
  let billUrl: string | null = null

  const billFile = formData.get('bill') as File | null
  if (billFile && billFile.size > 0) {
    const ext = billFile.name.split('.').pop()
    const path = `bills/${Date.now()}.${ext}`
    const { error } = await supabase.storage.from('bills').upload(path, billFile)
    if (!error) {
      const { data } = supabase.storage.from('bills').getPublicUrl(path)
      billUrl = data.publicUrl
    }
  }

  const { data, error } = await supabase
    .from('leads')
    .insert({ ...input, bill_url: billUrl, status: 'new' })
    .select('id')

  if (error || !data?.[0]) {
    return NextResponse.json({ error: 'Database error' }, { status: 500 })
  }

  await sendLeadEmail({ ...input, billUrl }).catch(console.error)

  return NextResponse.json({ id: data[0].id }, { status: 201 })
}

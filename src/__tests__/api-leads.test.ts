/** @jest-environment node */
import { POST } from '@/app/api/leads/route'
import { NextRequest } from 'next/server'

jest.mock('@/lib/supabase/server', () => ({
  createServerClient: () => ({
    storage: {
      from: () => ({
        upload: jest.fn().mockResolvedValue({ data: { path: 'test/bill.jpg' }, error: null }),
        getPublicUrl: jest.fn().mockReturnValue({ data: { publicUrl: 'https://example.com/bill.jpg' } }),
      }),
    },
    from: () => ({
      insert: jest.fn().mockReturnValue({
        select: jest.fn().mockResolvedValue({ data: [{ id: 'uuid-123' }], error: null }),
      }),
    }),
  }),
}))

jest.mock('@/lib/resend', () => ({
  sendLeadEmail: jest.fn().mockResolvedValue(undefined),
}))

function makeFormRequest(overrides: Record<string, string> = {}) {
  const data = new FormData()
  data.set('name', overrides.name ?? 'Jan Kowalski')
  data.set('phone', overrides.phone ?? '+49123456789')
  data.set('email', overrides.email ?? 'jan@example.com')
  data.set('city', overrides.city ?? 'Berlin')
  data.set('type', overrides.type ?? 'electricity')
  data.set('language', overrides.language ?? 'pl')
  return new NextRequest('http://localhost/api/leads', { method: 'POST', body: data })
}

describe('POST /api/leads', () => {
  it('returns 201 for valid lead', async () => {
    const res = await POST(makeFormRequest())
    expect(res.status).toBe(201)
    const body = await res.json()
    expect(body.id).toBe('uuid-123')
  })

  it('returns 400 for missing name', async () => {
    const res = await POST(makeFormRequest({ name: '' }))
    expect(res.status).toBe(400)
    const body = await res.json()
    expect(body.errors.name).toBeDefined()
  })

  it('returns 400 for invalid phone', async () => {
    const res = await POST(makeFormRequest({ phone: '0123' }))
    expect(res.status).toBe(400)
  })

  it('returns 400 for invalid email', async () => {
    const res = await POST(makeFormRequest({ email: 'bademail' }))
    expect(res.status).toBe(400)
  })
})

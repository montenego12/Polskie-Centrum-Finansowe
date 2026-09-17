import { validateLead, type LeadInput } from '@/lib/validate-lead'

const valid: LeadInput = {
  name: 'Jan Kowalski',
  phone: '+49123456789',
  email: 'jan@example.com',
  city: 'Berlin',
  type: ['electricity'],
  language: 'pl',
}

describe('validateLead', () => {
  it('passes valid input', () => {
    expect(validateLead(valid)).toEqual({ ok: true, errors: {} })
  })

  it('requires name', () => {
    const result = validateLead({ ...valid, name: '' })
    expect(result.ok).toBe(false)
    expect(result.errors.name).toBeDefined()
  })

  it('requires phone', () => {
    const result = validateLead({ ...valid, phone: '' })
    expect(result.ok).toBe(false)
    expect(result.errors.phone).toBeDefined()
  })

  it('accepts phone without country code', () => {
    const result = validateLead({ ...valid, phone: '512345678' })
    expect(result.ok).toBe(true)
  })

  it('accepts Polish phone number', () => {
    const result = validateLead({ ...valid, phone: '+48512345678' })
    expect(result.ok).toBe(true)
  })

  it('rejects too short phone number', () => {
    const result = validateLead({ ...valid, phone: '12345' })
    expect(result.ok).toBe(false)
    expect(result.errors.phone).toBeDefined()
  })

  it('requires valid email', () => {
    const result = validateLead({ ...valid, email: 'notanemail' })
    expect(result.ok).toBe(false)
    expect(result.errors.email).toBeDefined()
  })

  it('requires city', () => {
    const result = validateLead({ ...valid, city: '' })
    expect(result.ok).toBe(false)
    expect(result.errors.city).toBeDefined()
  })

  it('requires at least one energy type', () => {
    const result = validateLead({ ...valid, type: [] })
    expect(result.ok).toBe(false)
    expect(result.errors.type).toBeDefined()
  })

  it('accepts both energy types', () => {
    const result = validateLead({ ...valid, type: ['electricity', 'gas'] })
    expect(result.ok).toBe(true)
  })
})

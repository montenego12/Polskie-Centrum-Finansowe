export type EnergyType = 'electricity' | 'gas'
export type Language = 'pl' | 'ua'

export interface LeadInput {
  name: string
  phone: string
  email: string
  city: string
  type: EnergyType[]
  language: Language
  billFile?: File | null
}

export interface ValidationResult {
  ok: boolean
  errors: Partial<Record<keyof LeadInput, string>>
}

export function validateLead(input: LeadInput): ValidationResult {
  const errors: Partial<Record<keyof LeadInput, string>> = {}

  if (!input.name.trim()) errors.name = 'Imię jest wymagane'
  if (!input.phone.trim()) {
    errors.phone = 'Telefon jest wymagany'
  } else if (!/^\+?\d{7,15}$/.test(input.phone.replace(/[\s-]/g, ''))) {
    errors.phone = 'Nieprawidłowy numer telefonu'
  }
  if (!input.email.trim()) {
    errors.email = 'Email jest wymagany'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.email)) {
    errors.email = 'Nieprawidłowy format email'
  }
  if (!input.city.trim()) errors.city = 'Miasto jest wymagane'
  if (!input.type.length) errors.type = 'Wybierz prąd lub gaz'

  return { ok: Object.keys(errors).length === 0, errors }
}

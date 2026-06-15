import type { Lang, Translations } from './types'
import { pl } from './pl'
import { ua } from './ua'

const translations: Record<Lang, Translations> = { pl, ua }

export function getTranslations(lang: string): Translations {
  return translations[(lang as Lang)] ?? translations.pl
}

export { type Lang, type Translations }

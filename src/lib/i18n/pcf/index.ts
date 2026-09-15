export type { PcfTranslations, Lang } from './types'
export { pcfPl } from './pl'
export { pcfUa } from './ua'
export { pcfDe } from './de'

import { pcfPl } from './pl'
import { pcfUa } from './ua'
import { pcfDe } from './de'
import type { Lang } from './types'

export function getPcfTranslations(lang: string) {
  if (lang === 'ua') return pcfUa
  if (lang === 'de') return pcfDe
  return pcfPl
}

export const VALID_PCF_LANGS: Lang[] = ['pl', 'ua', 'de']

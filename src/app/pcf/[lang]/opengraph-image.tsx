import { readFile } from 'node:fs/promises'
import { join } from 'node:path'

export const alt = 'Polskie Centrum Finansowe w Niemczech'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function OgImage() {
  const data = await readFile(join(process.cwd(), 'public', 'pcf-og-image.png'))
  return new Response(new Uint8Array(data), {
    headers: { 'Content-Type': 'image/png' },
  })
}

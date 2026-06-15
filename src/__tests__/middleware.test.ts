/**
 * @jest-environment node
 */
import { middleware } from '@/middleware'
import { NextRequest } from 'next/server'

function makeRequest(path: string, cookie?: string) {
  const req = new NextRequest(`http://localhost${path}`)
  if (cookie) req.cookies.set('admin_auth', cookie)
  return req
}

describe('middleware', () => {
  it('redirects / to /pl', async () => {
    const res = await middleware(makeRequest('/'))
    expect(res.status).toBe(307)
    expect(res.headers.get('location')).toBe('http://localhost/pl')
  })

  it('redirects /ua to /ua (no redirect needed)', async () => {
    const res = await middleware(makeRequest('/ua'))
    expect(res).toBeUndefined()
  })

  it('redirects /admin without cookie to /admin/login', async () => {
    const res = await middleware(makeRequest('/admin'))
    expect(res.status).toBe(307)
    expect(res.headers.get('location')).toContain('/admin/login')
  })

  it('allows /admin with valid cookie', async () => {
    process.env.ADMIN_PASSWORD = 'valid'
    const res = await middleware(makeRequest('/admin', 'valid'))
    expect(res).toBeUndefined()
  })
})

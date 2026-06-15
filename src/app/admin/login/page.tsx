'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminLogin() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const res = await fetch('/api/admin/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    })
    if (res.ok) {
      router.push('/admin')
    } else {
      setError('Nieprawidłowe hasło')
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-dark px-4">
      <form onSubmit={handleSubmit} className="w-full max-w-sm rounded-2xl border border-white/10 bg-white/5 p-8">
        <h1 className="mb-6 text-center text-xl font-black">🔐 Panel admina</h1>
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="Hasło"
          className="mb-3 w-full rounded-xl border border-white/12 bg-white/6 px-4 py-3 text-sm text-white outline-none focus:border-gold"
        />
        {error && <p className="mb-3 text-xs text-red-400">{error}</p>}
        <button type="submit" className="w-full rounded-xl bg-brand py-3 text-sm font-bold text-white">
          Zaloguj się
        </button>
      </form>
    </div>
  )
}

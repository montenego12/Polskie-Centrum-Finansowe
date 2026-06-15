import { createServerClient } from '@/lib/supabase/server'

const STATUS_LABELS: Record<string, string> = {
  new: '🔵 Nowy',
  contacted: '🟡 Kontakt',
  converted: '🟢 Klient',
  closed: '⚫ Zamknięty',
}

export default async function AdminPage() {
  const supabase = createServerClient()
  const { data: leads } = await supabase
    .from('leads')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <div className="min-h-screen bg-dark p-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-2xl font-black">⚡ Panel Leadów</h1>
          <span className="rounded-full bg-gold/10 border border-gold/20 px-4 py-1.5 text-xs font-bold text-gold">
            {leads?.length ?? 0} leadów
          </span>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-white/10">
          <table className="w-full text-sm">
            <thead className="border-b border-white/10 bg-white/5">
              <tr>
                {['Data', 'Imię', 'Telefon', 'Email', 'Miasto', 'Typ', 'Język', 'Status', 'Rachunek'].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-bold uppercase text-white/40">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {leads?.map(lead => (
                <tr key={lead.id} className="border-b border-white/5 transition hover:bg-white/3">
                  <td className="px-4 py-3 text-xs text-white/50">
                    {new Date(lead.created_at).toLocaleDateString('pl-PL')}
                  </td>
                  <td className="px-4 py-3 font-medium">{lead.name}</td>
                  <td className="px-4 py-3">
                    <a href={`tel:${lead.phone}`} className="text-gold hover:underline">{lead.phone}</a>
                  </td>
                  <td className="px-4 py-3 text-white/70">{lead.email}</td>
                  <td className="px-4 py-3 text-white/70">{lead.city}</td>
                  <td className="px-4 py-3">
                    {lead.type?.map((t: string) => (
                      <span key={t} className="mr-1 text-xs">{t === 'electricity' ? '⚡' : '🔥'}</span>
                    ))}
                  </td>
                  <td className="px-4 py-3 text-xs uppercase text-white/50">{lead.language}</td>
                  <td className="px-4 py-3">
                    <span className="text-xs">{STATUS_LABELS[lead.status] ?? lead.status}</span>
                  </td>
                  <td className="px-4 py-3">
                    {lead.bill_url && (
                      <a href={lead.bill_url} target="_blank" rel="noopener noreferrer" className="text-xs text-brand hover:underline">
                        📎 Rachunek
                      </a>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

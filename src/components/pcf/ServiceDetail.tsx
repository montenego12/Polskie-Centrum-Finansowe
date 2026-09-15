interface ServiceItem {
  icon: string
  name: string
  german?: string
  desc: string
}

interface Props {
  label: string
  title: string
  titleAccent: string
  subtitle: string
  items: ServiceItem[]
  note?: string
}

export function PcfServiceDetail({ label, title, titleAccent, subtitle, items, note }: Props) {
  return (
    <section className="bg-gray-300 px-6 py-20 md:px-12">
      <div className="mx-auto max-w-6xl">
        <p className="mb-2 text-center text-xs font-bold uppercase tracking-widest text-[#c9a227]">{label}</p>
        <h1 className="mb-3 text-center text-3xl font-black text-gray-900 md:text-4xl">
          {title} <span className="text-[#c9a227]">{titleAccent}</span>
        </h1>
        <p className="mb-12 mx-auto max-w-2xl text-center text-sm leading-relaxed text-gray-500">{subtitle}</p>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => (
            <div key={i} className="rounded-2xl border border-gray-200 bg-gray-200 p-5 shadow-sm transition-all hover:border-[#c9a227]/40 hover:shadow-md">
              <div className="mb-3 flex items-center gap-3">
                <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-[#c9a227]/10 text-xl">{item.icon}</span>
                <div>
                  <h3 className="text-sm font-bold text-gray-900">{item.name}</h3>
                  {item.german && <p className="text-[10px] italic text-gray-400">{item.german}</p>}
                </div>
              </div>
              <p className="text-xs leading-relaxed text-gray-500">{item.desc}</p>
            </div>
          ))}
        </div>
        {note && (
          <div className="mt-10 rounded-2xl border border-[#c9a227]/30 bg-[#c9a227]/5 p-6">
            <p className="text-center text-sm leading-relaxed text-gray-700">{note}</p>
          </div>
        )}
      </div>
    </section>
  )
}

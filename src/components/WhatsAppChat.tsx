'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'

export function WhatsAppChat() {
  const [visible, setVisible] = useState(false)
  const [closed, setClosed] = useState(false)
  const waNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 7000)
    return () => clearTimeout(timer)
  }, [])

  if (closed || !visible) return null

  return (
    <div className="fixed bottom-24 right-4 z-50 w-[min(288px,calc(100vw-2rem))] animate-fadeInUp">
      {/* Bubble */}
      <div className="relative rounded-2xl border border-white/10 bg-[#0d1b3e]/95 p-4 shadow-[0_16px_48px_rgba(0,0,0,0.6)] backdrop-blur-xl">
        {/* Close */}
        <button
          onClick={() => setClosed(true)}
          className="absolute right-3 top-3 flex h-5 w-5 items-center justify-center rounded-full text-white/40 transition hover:text-white/80 text-xs"
        >
          ✕
        </button>

        {/* Header */}
        <div className="mb-3 flex items-center gap-3">
          <div className="relative h-10 w-10 flex-shrink-0 overflow-hidden rounded-full border-2 border-wa">
            <Image src="/patryk.jpg" alt="Patryk" fill className="object-cover object-top" />
          </div>
          <div>
            <p className="text-xs font-bold">Patryk Kuklinski</p>
            <div className="flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-wa" />
              <p className="text-[10px] text-white/50">dostępny teraz</p>
            </div>
          </div>
        </div>

        {/* Message bubble */}
        <div className="mb-3 rounded-xl rounded-tl-none bg-white/8 px-3.5 py-2.5 text-xs leading-relaxed text-white/80">
          Cześć! 👋 Mogę sprawdzić ile możesz zaoszczędzić na prądzie lub gazie w Niemczech.
          <br /><br />
          <span className="text-gold font-semibold">Napisz do mnie — odpowiem w kilka minut.</span>
        </div>

        {/* CTA */}
        <a
          href={`https://wa.me/${waNumber}?text=Cześć Patryk, chcę sprawdzić ile mogę zaoszczędzić na energii.`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-wa py-2.5 text-xs font-bold text-white transition hover:brightness-110"
        >
          <span className="text-base">💬</span>
          Napisz na WhatsApp
        </a>
      </div>

      {/* Arrow pointing to WA button */}
      <div className="absolute -bottom-2 right-8 h-3 w-3 rotate-45 border-b border-r border-white/10 bg-[#0d1b3e]/95" />
    </div>
  )
}

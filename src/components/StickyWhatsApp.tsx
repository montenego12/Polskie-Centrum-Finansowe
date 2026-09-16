'use client'
import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'

const MESSAGES = [
  'Dzień dobry! Masz pytanie dotyczące finansów w Niemczech? Chętnie pomogę 😊',
  'Cześć! Bezpłatna konsultacja — napisz, a odpowiem w ciągu godziny.',
  'Szukasz ubezpieczenia lub kredytu w Niemczech? Jestem tu, by pomóc!',
  'Dzień dobry! Doradztwo finansowe po polsku — bez ukrytych kosztów.',
  'Masz pytanie? Napisz śmiało — konsultacja jest całkowicie bezpłatna.',
  'Pomagam w sprawach finansowych w Niemczech. Napisz — odpowiadam szybko!',
  'Cześć! Sprawdź, jak mogę pomóc Ci zaoszczędzić na ubezpieczeniu.',
  'Dzień dobry! Chętnie omówię Twoje opcje finansowe — bezpłatnie i po polsku.',
  'Masz wątpliwości co do ubezpieczenia lub kredytu? Napisz do mnie!',
  'Cześć! Pomagam znaleźć najlepsze rozwiązania finansowe w Niemczech 💡',
  'Dzień dobry! Bezpłatna konsultacja czeka — napisz kiedy masz chwilę.',
  'Szukasz oszczędności na ubezpieczeniu zdrowotnym? Mogę pomóc!',
  'Cześć! Chcesz wiedzieć, ile możesz odzyskać z podatku? Napisz do mnie.',
  'Dzień dobry! Doradztwo bez zobowiązań — zapraszam do kontaktu 😊',
  'Masz nowe ubezpieczenie lub stare do zmiany? Sprawdzę co jest lepsze.',
  'Cześć! Kredyt, Bausparkasse, inwestycje — odpowiem na każde pytanie.',
  'Dzień dobry! W czym mogę Ci dziś pomóc? Napisz — jestem dostępny.',
  'Czy wiesz, że możesz odzyskać podatek nawet za ostatnie 4 lata? Napisz!',
  'Cześć! Jeden WhatsApp — i wszystkie sprawy finansowe w Niemczech z głowy.',
  'Dzień dobry! Pomagam szybko i po polsku — napisz, a zobaczysz 😊',
]

interface Props {
  message?: string
}

const SESSION_KEY = 'wa_popup_shown'

export function StickyWhatsApp({ message }: Props) {
  const [open, setOpen] = useState(false)
  const [randomMsg] = useState(() => MESSAGES[Math.floor(Math.random() * MESSAGES.length)])
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const waNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '4917683425546'
  const bubbleText = message ?? randomMsg
  const waText = encodeURIComponent('Dzień dobry! Chciałbym skorzystać z bezpłatnej konsultacji.')

  useEffect(() => {
    const isDev = process.env.NODE_ENV === 'development'
    const alreadyShown = !isDev && sessionStorage.getItem(SESSION_KEY)
    if (alreadyShown) return
    timerRef.current = setTimeout(() => {
      setOpen(true)
      sessionStorage.setItem(SESSION_KEY, '1')
    }, 5000)
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [])

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {open && (
        <div
          className="w-[calc(100vw-3rem)] max-w-72 rounded-2xl bg-gray-100 shadow-2xl border border-gray-200 overflow-hidden"
          style={{ animation: 'slideUp 0.35s ease-out' }}
        >
          <style>{`@keyframes slideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }`}</style>
          <div className="flex items-center gap-3 bg-[#25d366] px-4 py-3">
            <div className="relative h-10 w-10 flex-shrink-0 overflow-hidden rounded-full border-2 border-white/30">
              <Image src="/pcf-photo.jpg" alt="Patryk" fill sizes="40px" className="object-cover" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-white leading-tight">Patryk Kukliński</p>
              <p className="text-[10px] text-white/80 leading-tight">Polskie Centrum Finansowe</p>
            </div>
            <button
              onClick={() => setOpen(false)}
              aria-label="Zamknij"
              className="text-white/70 hover:text-white text-lg leading-none"
            >
              ✕
            </button>
          </div>

          <div className="p-4">
            <div className="rounded-xl rounded-tl-none bg-white px-4 py-3 text-sm leading-relaxed text-gray-700 shadow-sm">
              {bubbleText}
            </div>
            <p className="mt-1 text-[10px] text-gray-400">Patryk · teraz</p>
          </div>

          <div className="px-4 pb-4">
            <a
              href={`https://wa.me/${waNumber}?text=${waText}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => window.fbq?.('track', 'Contact')}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#25d366] py-3 text-sm font-bold text-white transition hover:bg-[#20c55e]"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              Napisz na WhatsApp
            </a>
          </div>
        </div>
      )}

      <button
        onClick={() => setOpen(!open)}
        aria-label="Czat WhatsApp"
        className="flex h-14 w-14 items-center justify-center rounded-full bg-[#25d366] text-2xl text-white shadow-[0_8px_32px_rgba(37,211,102,0.5)] transition hover:scale-110 hover:bg-[#20c55e]"
      >
        {open ? (
          <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>
        ) : (
          <svg viewBox="0 0 24 24" fill="currentColor" className="h-7 w-7"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
        )}
      </button>
    </div>
  )
}

'use client'

export function StickyWhatsApp() {
  const waNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER
  return (
    <a
      href={`https://wa.me/${waNumber}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-wa text-2xl text-white shadow-[0_8px_32px_rgba(37,211,102,0.5)] animate-waPulse transition hover:scale-110"
    >
      💬
    </a>
  )
}

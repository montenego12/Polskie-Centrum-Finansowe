'use client'
import { useEffect, useState } from 'react'
import Image from 'next/image'

const IMAGES = [
  '/pcf-bg.jpg',
  '/pcf-bg2.jpg',
  '/pcf-bg3.jpg',
  '/pcf-bg4.jpg',
]

export function HeroSlideshow() {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent(c => (c + 1) % IMAGES.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden">
      <div
        className="flex h-full transition-transform duration-700 ease-in-out"
        style={{ width: `${IMAGES.length * 100}%`, transform: `translateX(-${current * (100 / IMAGES.length)}%)` }}
      >
        {IMAGES.map((src, i) => (
          <div key={i} className="relative h-full" style={{ width: `${100 / IMAGES.length}%` }}>
            <Image src={src} alt="" fill className="object-cover object-center" priority={i === 0} />
          </div>
        ))}
      </div>
    </div>
  )
}

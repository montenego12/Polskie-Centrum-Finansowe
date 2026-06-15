'use client'
import { useState, useEffect } from 'react'

interface WeatherDay {
  label: string
  max: number
  min: number
  code: number
}

interface WeatherData {
  city: string
  temp: number
  code: number
  days: WeatherDay[]
}

function weatherIcon(code: number): string {
  if (code === 0) return '☀️'
  if (code <= 3) return '⛅'
  if (code <= 48) return '🌫️'
  if (code <= 67) return '🌧️'
  if (code <= 77) return '❄️'
  if (code <= 82) return '🌦️'
  return '⛈️'
}

function weatherLabel(code: number): string {
  if (code === 0) return 'Słonecznie'
  if (code <= 3) return 'Zachmurzenie'
  if (code <= 48) return 'Mgła'
  if (code <= 67) return 'Deszcz'
  if (code <= 77) return 'Śnieg'
  if (code <= 82) return 'Przelotny deszcz'
  return 'Burza'
}

const DAY_NAMES = ['Nd', 'Pn', 'Wt', 'Śr', 'Cz', 'Pt', 'Sb']

export function WeatherWidget() {
  const [data, setData] = useState<WeatherData | null>(null)
  const [visible, setVisible] = useState(false)
  const [closed, setClosed] = useState(false)
  const [now, setNow] = useState(new Date())

  useEffect(() => {
    const tick = setInterval(() => setNow(new Date()), 60_000)
    return () => clearInterval(tick)
  }, [])

  useEffect(() => {
    async function load() {
      try {
        // IP-based geolocation — no browser permission needed
        const ipRes = await fetch('https://ipapi.co/json/')
        const ip = await ipRes.json()
        const { latitude: lat, longitude: lon, city } = ip

        const weatherRes = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&daily=temperature_2m_max,temperature_2m_min,weathercode&timezone=auto&forecast_days=4`
        )
        const weather = await weatherRes.json()

        const days: WeatherDay[] = [1, 2, 3].map((offset) => ({
          label: DAY_NAMES[new Date(weather.daily.time[offset]).getDay()],
          max: Math.round(weather.daily.temperature_2m_max[offset]),
          min: Math.round(weather.daily.temperature_2m_min[offset]),
          code: weather.daily.weathercode[offset],
        }))

        setData({
          city: city || 'Niemcy',
          temp: Math.round(weather.current_weather.temperature),
          code: weather.current_weather.weathercode,
          days,
        })
        setTimeout(() => setVisible(true), 3000)
      } catch {}
    }
    load()
  }, [])

  if (!data || !visible || closed) return null

  const dateStr = now.toLocaleDateString('pl-DE', {
    weekday: 'short',
    day: '2-digit',
    month: '2-digit',
  })
  const timeStr = now.toLocaleTimeString('pl-DE', { hour: '2-digit', minute: '2-digit' })

  return (
    <div className="fixed bottom-6 left-6 z-40 w-56 animate-fadeInUp select-none">
      <div className="relative rounded-2xl border border-white/10 bg-[#0d1b3e]/90 p-4 shadow-[0_16px_48px_rgba(0,0,0,0.5)] backdrop-blur-xl">
        {/* Close */}
        <button
          onClick={() => setClosed(true)}
          className="absolute right-2.5 top-2.5 flex h-4 w-4 items-center justify-center rounded-full text-[9px] text-white/30 transition hover:text-white/70"
        >
          ✕
        </button>

        {/* Header: date + time */}
        <div className="mb-3 flex items-start justify-between pr-3">
          <p className="text-[10px] text-white/40 capitalize">{dateStr}</p>
          <p className="text-[11px] font-bold text-white/60">{timeStr}</p>
        </div>

        {/* City + current temp */}
        <div className="mb-3 flex items-center gap-3">
          <span className="text-4xl leading-none">{weatherIcon(data.code)}</span>
          <div>
            <p className="text-[11px] font-semibold text-white/70">{data.city}</p>
            <p className="text-2xl font-black text-white leading-tight">{data.temp}°</p>
            <p className="text-[9px] text-white/40">{weatherLabel(data.code)}</p>
          </div>
        </div>

        {/* Divider */}
        <div className="mb-3 h-px bg-white/8" />

        {/* 3-day forecast */}
        <div className="flex justify-between">
          {data.days.map((d) => (
            <div key={d.label} className="flex flex-col items-center gap-0.5">
              <p className="text-[9px] text-white/40 uppercase">{d.label}</p>
              <span className="text-base leading-none">{weatherIcon(d.code)}</span>
              <p className="text-[10px] font-bold text-white">{d.max}°</p>
              <p className="text-[9px] text-white/30">{d.min}°</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

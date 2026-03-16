'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { SLIDES } from '../data/content'

export default function Hero() {
  const [cur, setCur] = useState(0)
  const timer = useRef(null)

  const goTo = useCallback(
    (n) => setCur((n + SLIDES.length) % SLIDES.length),
    []
  )

  const jump = (n) => {
    clearInterval(timer.current)
    goTo(n)
  }

  useEffect(() => {
    timer.current = setInterval(() => goTo(cur + 1), 5500)
    return () => clearInterval(timer.current)
  }, [cur, goTo])

  const scrollTo = (id) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section
      id="hero"
      className="relative h-screen overflow-hidden flex items-center"
    >
      {/* Slides */}
      {SLIDES.map((slide, i) => (
        <div
          key={i}
          className="carousel-slide"
          style={{
            backgroundImage: `url(${slide.img})`,
            opacity: i === cur ? 1 : 0,
            zIndex: i === cur ? 1 : 0,
          }}
        >
          {/* Overlay gradient */}
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(120deg, rgba(9,25,46,0.92) 0%, rgba(9,25,46,0.62) 55%, rgba(9,25,46,0.28) 100%)',
            }}
          />
        </div>
      ))}

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-7 w-full">
        {/* Eyebrow */}
        <div
          className="inline-flex items-center gap-2 border text-xs font-semibold tracking-[2.5px] px-5 py-1.5 rounded-full mb-6 uppercase"
          style={{
            borderColor: 'rgba(212,170,69,0.45)',
            color: '#D4AA45',
          }}
        >
          <span
            className="w-1.5 h-1.5 rounded-full"
            style={{ background: '#D4AA45' }}
          />
          Nairobi, Kenya · Est. 2022
        </div>

        {/* Headline */}
        <h1
          className="font-display text-white leading-[1.08] mb-5"
          style={{ fontSize: 'clamp(40px, 5.5vw, 68px)' }}
        >
          Building Kenya's
          <br />
          <span style={{ color: '#D4AA45' }}>Future Together</span>
        </h1>

        {/* Sub */}
        <p
          className="mb-9 leading-[1.78]"
          style={{
            fontSize: 'clamp(15px, 1.6vw, 18px)',
            color: 'rgba(255,255,255,0.68)',
            maxWidth: 520,
          }}
        >
          Your trusted partner for civil works, road construction, building
          projects and general commodity supplies across Kenya.
        </p>

        {/* Buttons */}
        <div className="flex gap-4 flex-wrap">
          <button
            onClick={() => scrollTo('services')}
            className="px-8 py-3.5 rounded-lg font-bold text-sm tracking-wide transition-all duration-300 hover:-translate-y-0.5 hover:brightness-110"
            style={{ background: '#B8922A', color: '#09192E' }}
          >
            Our Services
          </button>
          <button
            onClick={() => scrollTo('contact')}
            className="px-8 py-3.5 rounded-lg font-medium text-sm text-white border transition-all duration-300 hover:-translate-y-0.5"
            style={{
              borderColor: 'rgba(255,255,255,0.4)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = '#D4AA45'
              e.currentTarget.style.color = '#D4AA45'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.4)'
              e.currentTarget.style.color = '#fff'
            }}
          >
            Get a Free Quote
          </button>
        </div>
      </div>

      {/* Dots + arrows */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-4">
        <div className="flex gap-2.5">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => jump(i)}
              className="h-[7px] rounded-full transition-all duration-300 focus:outline-none"
              style={{
                width: i === cur ? 26 : 7,
                background:
                  i === cur ? '#D4AA45' : 'rgba(255,255,255,0.35)',
              }}
            />
          ))}
        </div>
        <div className="flex gap-2.5">
          {['←', '→'].map((arrow, idx) => (
            <button
              key={arrow}
              onClick={() => jump(idx === 0 ? cur - 1 : cur + 1)}
              className="w-10 h-10 rounded-full border text-white flex items-center justify-center text-base transition-all duration-300 focus:outline-none"
              style={{ borderColor: 'rgba(255,255,255,0.28)', background: 'rgba(255,255,255,0.07)' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#B8922A'
                e.currentTarget.style.borderColor = '#B8922A'
                e.currentTarget.style.color = '#09192E'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.07)'
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.28)'
                e.currentTarget.style.color = '#fff'
              }}
            >
              {arrow}
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}

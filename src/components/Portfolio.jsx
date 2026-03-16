'use client'

import { useState, useEffect, useRef } from 'react'
import { PORTFOLIO, PORTFOLIO_FILTERS } from '../data/content'

export default function Portfolio() {
  const [active, setActive] = useState('all')
  const titleRef = useRef(null)

  useEffect(() => {
    const el = titleRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) el.classList.add('visible') },
      { threshold: 0.1 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  const shown = PORTFOLIO.filter(
    (p) => active === 'all' || p.cat === active
  )

  return (
    <section id="portfolio" className="py-24" style={{ background: '#09192E' }}>
      <div className="max-w-6xl mx-auto px-7">
        {/* Header */}
        <div ref={titleRef} className="reveal mb-2">
          <p
            className="text-[11px] font-bold tracking-[3px] uppercase mb-2.5"
            style={{ color: '#D4AA45' }}
          >
            Our Work
          </p>
          <h2
            className="font-display text-3xl md:text-4xl mb-3"
            style={{ color: '#fff' }}
          >
            Project Portfolio
          </h2>
          <p className="text-[15px] max-w-lg" style={{ color: 'rgba(255,255,255,0.55)' }}>
            Civil works and supply projects delivered across Kenya.
          </p>
        </div>

        {/* Filter tabs */}
        <div className="flex flex-wrap gap-2.5 my-8">
          {PORTFOLIO_FILTERS.map((f) => (
            <button
              key={f.key}
              onClick={() => setActive(f.key)}
              className="px-5 py-2 rounded-full border text-[12px] font-semibold tracking-wide transition-all duration-300 focus:outline-none"
              style={{
                background: active === f.key ? '#B8922A' : 'transparent',
                borderColor: active === f.key ? '#B8922A' : 'rgba(255,255,255,0.22)',
                color: active === f.key ? '#09192E' : 'rgba(255,255,255,0.65)',
              }}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {shown.map((item, i) => (
            <div
              key={`${item.title}-${i}`}
              className="port-card relative rounded-xl overflow-hidden cursor-pointer"
              style={{ aspectRatio: '4/3' }}
            >
              <img
                src={item.img}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-700"
                loading="lazy"
              />
              {/* Overlay */}
              <div
                className="port-overlay absolute inset-0 flex flex-col justify-end p-5"
                style={{
                  background:
                    'linear-gradient(to top, rgba(9,25,46,0.92) 0%, transparent 60%)',
                }}
              >
                <h4 className="text-white text-[14px] font-semibold mb-1">
                  {item.title}
                </h4>
                <span
                  className="text-[11px] tracking-[1px] uppercase"
                  style={{ color: '#D4AA45' }}
                >
                  {PORTFOLIO_FILTERS.find((f) => f.key === item.cat)?.label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

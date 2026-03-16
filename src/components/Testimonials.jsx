'use client'

import { useState, useEffect, useRef } from 'react'
import { TESTIMONIALS } from '../data/content'

export default function Testimonials() {
  const [cur, setCur] = useState(0)
  const [animKey, setAnimKey] = useState(0)
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

  useEffect(() => {
    const t = setInterval(() => {
      setCur((c) => (c + 1) % TESTIMONIALS.length)
      setAnimKey((k) => k + 1)
    }, 6000)
    return () => clearInterval(t)
  }, [])

  const goTo = (i) => {
    setCur(i)
    setAnimKey((k) => k + 1)
  }

  const t = TESTIMONIALS[cur]

  return (
    <section id="testimonials" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-7">
        <div ref={titleRef} className="reveal text-center mb-12">
          <p
            className="text-[11px] font-bold tracking-[3px] uppercase mb-2.5"
            style={{ color: '#B8922A' }}
          >
            Client Feedback
          </p>
          <h2
            className="font-display text-3xl md:text-4xl"
            style={{ color: '#09192E' }}
          >
            What Our Clients Say
          </h2>
        </div>

        {/* Card */}
        <div className="max-w-2xl mx-auto">
          <div
            key={animKey}
            className="testi-animate rounded-2xl p-10"
            style={{ background: '#F5F3EE' }}
          >
            {/* Quote mark */}
            <p
              className="font-display text-[17px] leading-[1.75] italic mb-6"
              style={{ color: '#09192E' }}
            >
              <span
                className="inline-block font-display leading-none align-[-22px] mr-1"
                style={{ fontSize: 52, color: '#B8922A', lineHeight: 0 }}
              >
                &ldquo;
              </span>
              {t.quote}
            </p>

            {/* Author */}
            <div className="flex items-center gap-4">
              <div
                className="w-11 h-11 rounded-full flex items-center justify-center font-bold text-[14px] flex-shrink-0"
                style={{ background: '#09192E', color: '#D4AA45' }}
              >
                {t.initials}
              </div>
              <div>
                <strong className="block text-[14px]" style={{ color: '#09192E' }}>
                  {t.name}
                </strong>
                <small className="text-[12px]" style={{ color: '#7A7065' }}>
                  {t.role}
                </small>
              </div>
            </div>
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-2.5 mt-6">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className="h-[7px] rounded-full transition-all duration-300 focus:outline-none"
                style={{
                  width: i === cur ? 26 : 7,
                  background: i === cur ? '#B8922A' : 'rgba(9,25,46,0.2)',
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

'use client'

import { useEffect, useRef } from 'react'
import { STATS, SERVICES, WHY_US } from '../data/content'

/* ── Reveal wrapper component (safe alternative to hook-in-map) ── */
function RevealBox({ children, delay = 0, className = '' }) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) el.classList.add('visible') },
      { threshold: 0.1 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return (
    <div
      ref={ref}
      className={`reveal ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}

/* ── Stat Strip ─────────────────────────────────────────────────── */
export function StatStrip() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4" style={{ background: '#09192E' }}>
      {STATS.map((s, i) => (
        <div
          key={s.label}
          className="py-7 px-5 text-center"
          style={{ borderRight: i < 3 ? '1px solid rgba(255,255,255,0.08)' : 'none' }}
        >
          <strong
            className="block font-display text-3xl leading-none mb-1.5"
            style={{ color: '#D4AA45' }}
          >
            {s.value}
          </strong>
          <span
            className="text-[11px] tracking-[1.5px] uppercase"
            style={{ color: 'rgba(255,255,255,0.5)' }}
          >
            {s.label}
          </span>
        </div>
      ))}
    </div>
  )
}

/* ── About ──────────────────────────────────────────────────────── */
export function About() {
  return (
    <section id="about" className="py-24" style={{ background: '#F5F3EE' }}>
      <div className="max-w-6xl mx-auto px-7">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-14 items-center">
          {/* Image */}
          <RevealBox>
            <div className="relative rounded-2xl overflow-hidden h-[460px]">
              <img
                src="/images/about-2.jpg"
                alt="Jaafar and Son team on site"
                className="w-full h-full object-cover"
              />
              <div
                className="absolute bottom-5 left-5 rounded-xl px-6 py-4"
                style={{ background: '#09192E', borderLeft: '4px solid #B8922A' }}
              >
                <strong className="block font-display text-2xl" style={{ color: '#D4AA45' }}>
                  2022
                </strong>
                <small
                  className="text-[10px] tracking-[1.5px] uppercase"
                  style={{ color: 'rgba(255,255,255,0.6)' }}
                >
                  Year Established
                </small>
              </div>
            </div>
          </RevealBox>

          {/* Text */}
          <RevealBox delay={150}>
            <div className="flex flex-col gap-5">
              <p className="text-[11px] font-bold tracking-[3px] uppercase" style={{ color: '#B8922A' }}>
                About Us
              </p>
              <h2 className="font-display text-3xl md:text-4xl leading-tight" style={{ color: '#09192E' }}>
                A Trusted Name in Civil Works &amp; Supplies
              </h2>
              <p className="text-[15px] leading-relaxed" style={{ color: '#7A7065' }}>
                Jaafar and Son Limited is a proudly Kenyan company registered under
                the Companies Act 2015 (Reg. No. PVT-3QU7PGX7). Based in Nairobi,
                we combine civil engineering expertise with a robust general supplies division.
              </p>
              <p className="text-[15px] leading-relaxed" style={{ color: '#7A7065' }}>
                From road construction and building projects to the supply of furniture,
                electronics, hardware and everyday commodities — we are your one-stop
                partner for infrastructure and procurement needs across Kenya.
              </p>
              <div className="grid grid-cols-2 gap-4 mt-2">
                {STATS.map((s) => (
                  <div
                    key={s.label}
                    className="bg-white rounded-xl px-5 py-4"
                    style={{ borderLeft: '4px solid #B8922A' }}
                  >
                    <strong className="block font-display text-2xl" style={{ color: '#09192E' }}>
                      {s.value}
                    </strong>
                    <small className="text-[11px] tracking-wide uppercase" style={{ color: '#7A7065' }}>
                      {s.label}
                    </small>
                  </div>
                ))}
              </div>
            </div>
          </RevealBox>
        </div>
      </div>
    </section>
  )
}

/* ── Services ───────────────────────────────────────────────────── */
export function Services() {
  return (
    <section id="services" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-7">
        <RevealBox className="mb-14">
          <p className="text-[11px] font-bold tracking-[3px] uppercase mb-2.5" style={{ color: '#B8922A' }}>
            What We Do
          </p>
          <h2 className="font-display text-3xl md:text-4xl" style={{ color: '#09192E' }}>
            Our Services
          </h2>
          <p className="mt-3 text-[15px] max-w-lg" style={{ color: '#7A7065' }}>
            Two powerful divisions covering all your construction and procurement needs.
          </p>
        </RevealBox>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {SERVICES.map((s, i) => (
            <RevealBox key={s.num} delay={i * 80}>
              <div
                className="svc-card relative rounded-2xl p-8 overflow-hidden transition-all duration-300 border border-transparent hover:-translate-y-1.5 cursor-default group"
                style={{ background: '#F5F3EE' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#fff'
                  e.currentTarget.style.borderColor = '#B8922A'
                  e.currentTarget.style.boxShadow = '0 16px 48px rgba(9,25,46,0.1)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#F5F3EE'
                  e.currentTarget.style.borderColor = 'transparent'
                  e.currentTarget.style.boxShadow = 'none'
                }}
              >
                <div className="text-[11px] font-bold tracking-[2px] mb-4" style={{ color: '#B8922A' }}>
                  {s.num}
                </div>
                <h3 className="text-[17px] font-semibold mb-3" style={{ color: '#09192E' }}>
                  {s.title}
                </h3>
                <p className="text-[13.5px] leading-[1.72]" style={{ color: '#7A7065' }}>
                  {s.desc}
                </p>
              </div>
            </RevealBox>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ── Why Us ─────────────────────────────────────────────────────── */
export function WhyUs() {
  return (
    <section id="why" className="py-24" style={{ background: '#F9F3E3' }}>
      <div className="max-w-6xl mx-auto px-7">
        <RevealBox className="text-center mb-14">
          <p className="text-[11px] font-bold tracking-[3px] uppercase mb-2.5" style={{ color: '#B8922A' }}>
            Why Choose Us
          </p>
          <h2 className="font-display text-3xl md:text-4xl mb-3" style={{ color: '#09192E' }}>
            6 Reasons to Partner With Us
          </h2>
          <p className="text-[15px] mx-auto max-w-lg" style={{ color: '#7A7065' }}>
            Experience, quality and reliability in every project and delivery.
          </p>
        </RevealBox>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {WHY_US.map((r, i) => (
            <RevealBox key={r.num} delay={i * 80}>
              <div
                className="bg-white rounded-2xl p-7 text-center transition-all duration-300 hover:-translate-y-1 border-b-[3px] border-transparent hover:border-[#B8922A] hover:shadow-xl h-full"
              >
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center font-display text-lg mx-auto mb-4"
                  style={{ background: '#09192E', color: '#D4AA45' }}
                >
                  {r.num}
                </div>
                <h3 className="text-[15px] font-semibold mb-2" style={{ color: '#09192E' }}>
                  {r.title}
                </h3>
                <p className="text-[13px] leading-[1.72]" style={{ color: '#7A7065' }}>
                  {r.desc}
                </p>
              </div>
            </RevealBox>
          ))}
        </div>
      </div>
    </section>
  )
}

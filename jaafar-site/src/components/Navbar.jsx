'use client'

import { useState, useEffect } from 'react'
import LogoIcon from './LogoIcon'

const NAV_LINKS = [
  { id: 'about', label: 'About' },
  { id: 'services', label: 'Services' },
  { id: 'portfolio', label: 'Portfolio' },
  { id: 'why', label: 'Why Us' },
  { id: 'contact', label: 'Contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [active, setActive] = useState('')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id)
        })
      },
      { threshold: 0.45 }
    )
    NAV_LINKS.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? 'rgba(9,25,46,0.97)' : 'transparent',
        backdropFilter: scrolled ? 'blur(14px)' : 'none',
        boxShadow: scrolled ? '0 2px 24px rgba(0,0,0,0.25)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(184,146,42,0.2)' : 'none',
      }}
    >
      <div className="max-w-6xl mx-auto px-7 h-16 flex items-center justify-between">
        {/* Brand */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-3 focus:outline-none"
        >
          <LogoIcon size={38} />
          <div className="text-left">
            <span className="block text-[13px] font-semibold text-white tracking-wide leading-tight">
              JAAFAR AND SON LIMITED
            </span>
            <span className="block text-[9px] tracking-[1.8px]" style={{ color: '#D4AA45' }}>
              CIVIL WORKS · GENERAL SUPPLIES
            </span>
          </div>
        </button>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8 list-none">
          {NAV_LINKS.map(({ id, label }) => (
            <li key={id}>
              <button
                onClick={() => scrollTo(id)}
                className="text-[13px] font-medium tracking-wide transition-colors duration-200 focus:outline-none"
                style={{ color: active === id ? '#D4AA45' : 'rgba(255,255,255,0.72)' }}
              >
                {label}
              </button>
            </li>
          ))}
          <li>
            <button
              onClick={() => scrollTo('contact')}
              className="text-[13px] font-bold px-5 py-2 rounded-md transition-all duration-200 hover:brightness-110"
              style={{ background: '#B8922A', color: '#09192E' }}
            >
              Get Quote
            </button>
          </li>
        </ul>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 focus:outline-none p-1"
          onClick={() => setMenuOpen((o) => !o)}
        >
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="block w-6 h-0.5 transition-all duration-300"
              style={{ background: '#D4AA45' }}
            />
          ))}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          className="md:hidden px-7 pb-6 pt-2 flex flex-col gap-4"
          style={{ background: 'rgba(9,25,46,0.98)' }}
        >
          {NAV_LINKS.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              className="text-left text-sm font-medium text-white/80 hover:text-white transition-colors"
            >
              {label}
            </button>
          ))}
          <button
            onClick={() => scrollTo('contact')}
            className="text-sm font-bold px-5 py-2.5 rounded-md w-fit"
            style={{ background: '#B8922A', color: '#09192E' }}
          >
            Get Quote
          </button>
        </div>
      )}
    </nav>
  )
}

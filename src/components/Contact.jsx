'use client'

import { useEffect, useRef } from 'react'
import { CONTACT_INFO } from '../data/content'

const ICONS = {
  Address: (
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
  ),
  Telephone: (
    <path d="M6.62 10.79c1.44 2.83 3.76 5.15 6.59 6.59l2.2-2.2c.28-.28.67-.36 1.02-.25 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
  ),
  Email: (
    <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
  ),
  'Postal Address': (
    <path d="M20 6H4c-1.1 0-2 .9-2 2v9c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-1 11H5c-.55 0-1-.45-1-1V9l8 5 8-5v8c0 .55-.45 1-1 1z" />
  ),
  'Registration No.': (
    <path d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.89 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm-1 7V3.5L18.5 9H13z" />
  ),
}

export default function Contact() {
  const titleRef = useRef(null)
  const cardsRef = useRef(null)
  const mapRef = useRef(null)

  useEffect(() => {
    const observers = []
    ;[titleRef, cardsRef, mapRef].forEach((ref, i) => {
      const el = ref.current
      if (!el) return
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setTimeout(() => el.classList.add('visible'), i * 150)
          }
        },
        { threshold: 0.1 }
      )
      obs.observe(el)
      observers.push(obs)
    })
    return () => observers.forEach((o) => o.disconnect())
  }, [])

  return (
    <section id="contact" className="py-24" style={{ background: '#F5F3EE' }}>
      <div className="max-w-6xl mx-auto px-7">
        {/* Header */}
        <div ref={titleRef} className="reveal text-center mb-14">
          <p
            className="text-[11px] font-bold tracking-[3px] uppercase mb-2.5"
            style={{ color: '#B8922A' }}
          >
            Get In Touch
          </p>
          <h2
            className="font-display text-3xl md:text-4xl mb-3"
            style={{ color: '#09192E' }}
          >
            Contact Us
          </h2>
          <p className="text-[15px] max-w-lg mx-auto" style={{ color: '#7A7065' }}>
            Ready to start a project or request a supply quotation? Reach out
            today and we&apos;ll respond promptly.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[1fr_1.7fr] gap-12 items-start">
          {/* Contact cards */}
          <div ref={cardsRef} className="reveal reveal-delay-1 flex flex-col gap-4">
            {CONTACT_INFO.map((item) => (
              <div
                key={item.label}
                className="bg-white rounded-xl px-6 py-4 flex items-center gap-4 transition-all duration-300 hover:translate-x-1"
                style={{ borderLeft: '4px solid #B8922A' }}
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: '#F9F3E3' }}
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="#09192E"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    {ICONS[item.label]}
                  </svg>
                </div>
                <div>
                  <div
                    className="text-[10px] font-bold tracking-[1.2px] uppercase mb-0.5"
                    style={{ color: '#7A7065' }}
                  >
                    {item.label}
                  </div>
                  <div className="text-[14px]" style={{ color: '#1C1816' }}>
                    {item.value}
                  </div>
                </div>
              </div>
            ))}

            {/* CTA */}
            <div
              className="rounded-xl p-6 mt-2"
              style={{ background: '#09192E' }}
            >
              <p className="text-white text-[15px] font-medium mb-4">
                Ready to get started? Send us your project details.
              </p>
              <a
                href="mailto:virsonlimited@gmail.com"
                className="inline-block px-6 py-3 rounded-lg text-[13px] font-bold transition-all hover:brightness-110"
                style={{ background: '#B8922A', color: '#09192E' }}
              >
                Email Us Now →
              </a>
            </div>
          </div>

          {/* Google Map */}
          <div
            ref={mapRef}
            className="reveal reveal-delay-2 rounded-2xl overflow-hidden"
            style={{
              height: 480,
              boxShadow: '0 8px 32px rgba(9,25,46,0.12)',
            }}
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.818!2d36.8219!3d-1.2833!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f10d665d1d0b5%3A0x5fd56d3e7c0b9d22!2sBiashara%20Street%2C%20Nairobi!5e0!3m2!1sen!2ske!4v1700000000000!5m2!1sen!2ske"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

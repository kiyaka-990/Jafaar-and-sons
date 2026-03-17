import LogoIcon from './LogoIcon'

const SERVICES_LIST = [
  'Road Construction',
  'Building Works',
  'Civil Infrastructure',
  'Office Furniture',
  'Electronics & IT',
  'General Supplies',
]

const QUICK_LINKS = [
  { id: 'about', label: 'About Us' },
  { id: 'services', label: 'Services' },
  { id: 'portfolio', label: 'Portfolio' },
  { id: 'why', label: 'Why Choose Us' },
  { id: 'testimonials', label: 'Testimonials' },
  { id: 'contact', label: 'Contact' },
]

export default function Footer() {
  return (
    <footer style={{ background: '#09192E' }}>
      <div className="max-w-6xl mx-auto px-7 pt-14 pb-8">
        {/* Top grid */}
        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr] gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <LogoIcon size={38} />
              <div>
                <span className="block text-[13px] font-semibold text-white tracking-wide leading-tight">
                  JAAFAR AND SON LIMITED
                </span>
                <span
                  className="block text-[9px] tracking-[1.8px]"
                  style={{ color: '#D4AA45' }}
                >
                  CIVIL WORKS · GENERAL SUPPLIES
                </span>
              </div>
            </div>
            <p
              className="text-[13px] leading-[1.8] max-w-xs"
              style={{ color: 'rgba(255,255,255,0.5)' }}
            >
              A proudly Kenyan company delivering quality civil works and
              reliable general supplies across Kenya since 2022.
            </p>
            {/* Contact mini */}
            <div className="mt-5 flex flex-col gap-2">
              {[
                { icon: '📞', text: '+254 710 104 462' },
                { icon: '✉️', text: 'virsonlimited@gmail.com' },
                { icon: '📍', text: '12th Floor, Bruce House, Standard Street, Starehe, Nairobi' },
              ].map((c) => (
                <div
                  key={c.text}
                  className="flex items-center gap-2 text-[12px]"
                  style={{ color: 'rgba(255,255,255,0.55)' }}
                >
                  <span className="text-[12px]">{c.icon}</span>
                  {c.text}
                </div>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h5
              className="text-[11px] font-bold tracking-[2.5px] uppercase mb-5"
              style={{ color: '#B8922A' }}
            >
              Services
            </h5>
            <ul className="flex flex-col gap-2.5">
              {SERVICES_LIST.map((s) => (
                <li
                  key={s}
                  className="text-[13px] transition-colors duration-200 cursor-default"
                  style={{ color: 'rgba(255,255,255,0.55)' }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = '#D4AA45')
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = 'rgba(255,255,255,0.55)')
                  }
                >
                  {s}
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h5
              className="text-[11px] font-bold tracking-[2.5px] uppercase mb-5"
              style={{ color: '#B8922A' }}
            >
              Quick Links
            </h5>
            <ul className="flex flex-col gap-2.5">
              {QUICK_LINKS.map(({ id, label }) => (
                <li key={id}>
                  <button
                    onClick={() =>
                      document
                        .getElementById(id)
                        ?.scrollIntoView({ behavior: 'smooth' })
                    }
                    className="text-[13px] text-left transition-colors duration-200 focus:outline-none"
                    style={{ color: 'rgba(255,255,255,0.55)' }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.color = '#D4AA45')
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.color = 'rgba(255,255,255,0.55)')
                    }
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div
          className="border-t mb-6"
          style={{ borderColor: 'rgba(255,255,255,0.08)' }}
        />

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-3">
          <span className="text-[12px]" style={{ color: 'rgba(255,255,255,0.38)' }}>
            © 2026{' '}
            <span style={{ color: '#B8922A' }}>Jaafar and Son Limited</span>.
            All rights reserved.
          </span>
          <span className="text-[12px]" style={{ color: 'rgba(255,255,255,0.38)' }}>
            Developed by{' '}
            <span style={{ color: '#B8922A' }}>Asterleigh Systems</span> · Nairobi,
            Kenya
          </span>
        </div>
      </div>
    </footer>
  )
}

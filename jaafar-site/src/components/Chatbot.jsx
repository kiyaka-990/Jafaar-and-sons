'use client'

import { useState, useEffect, useRef } from 'react'

// ── Company Knowledge Base (system prompt) ────────────────────────────────────
const SYSTEM_PROMPT = `You are Jaz, the official AI assistant for Jaafar and Son Limited — a proudly Kenyan civil works and general supplies company based in Nairobi.

## Your Personality
- Friendly, professional and helpful
- Speak in clear, concise English (mix in occasional Swahili greetings like "Karibu!" or "Habari!" to feel local)
- Always represent the company positively
- Be enthusiastic about helping clients
- Keep responses focused and not too long (2-4 sentences usually)
- Use bullet points for lists of services or details

## Company Information

**Company Name:** Jaafar and Son Limited
**Registration Number:** PVT-3QU7PGX7
**Incorporated:** 25 October 2022 under Kenya Companies Act 2015
**Director/Shareholder:** Amina Jafaar Sheikh (1,000 Ordinary Shares)
**Share Capital:** KES 100,000 (1,000 Ordinary Shares @ KES 100 each)

**Location:** Yala Towers, Biashara Street, Starehe, Nairobi, Kenya
**Postal Address:** P.O. Box 38631, 00100 G.P.O. Nairobi
**Phone:** +254 710 104 462
**Email:** virsonlimited@gmail.com
**County:** Nairobi | District: Starehe

## Business Divisions

### Division 1 — Civil Works & Construction
- **Road Construction & Rehabilitation:** Tarmac, murram and gravel roads; drainage, culverts, bridges, road furniture
- **Building Construction:** Residential, commercial, industrial buildings from foundations to complete finishing
- **Civil Infrastructure:** Water supply pipelines, sewer lines, bridges, retaining walls, earthworks
- **Site Preparation & Demolition:** Land clearing, excavation, grading, controlled demolition
- **Renovation & Refurbishment:** Structural repairs, repainting, re-roofing, plumbing/electrical upgrades
- **Project Management:** End-to-end project management, BOQ preparation, contractor evaluation

### Division 2 — General Supplies & Commodities
- **Office & School Furniture:** Desks, chairs, cabinets, shelving, custom office fitouts
- **Electronics & IT Equipment:** Computers, laptops, printers, projectors, CCTV, networking gear
- **Construction Materials:** Cement, steel, timber, tiles, paints, sanitary fittings, hardware
- **Stationery & Consumables:** Paper, pens, toner cartridges, office consumables (bulk supply)
- **Household & Commercial Goods:** Kitchen equipment, appliances, cleaning products, bedding
- **Agricultural Inputs:** Seeds, fertilisers, pesticides, irrigation equipment, farm tools
- **Safety & PPE:** Hard hats, safety boots, reflective jackets, gloves, fire extinguishers
- **Cleaning & Sanitation:** Industrial chemicals, detergents, mops, sanitisers, washroom supplies

## Why Choose Jaafar and Son
1. Fully registered and KRA compliant
2. Quality guarantee — KEBS standards
3. Experienced engineers and procurement team
4. Competitive and transparent pricing
5. On-time, on-budget delivery
6. One-stop solution for construction and supplies

## Client Sectors
- National and county government ministries
- Roads and public works departments
- NGOs and international organisations
- Real estate developers
- Hotels, hospitals, schools
- Private homeowners and businesses

## How to Get a Quote
Clients can contact us via:
- Phone: +254 710 104 462
- Email: virsonlimited@gmail.com
- Visit: Yala Towers, Biashara Street, Starehe, Nairobi

## Chatbot Instructions
- If asked about pricing, explain that quotes are customised per project — direct them to call or email
- If asked something you don't know, offer to connect them with the team
- If asked about competitors, politely stay focused on Jaafar and Son's strengths
- If asked in Swahili, respond in Swahili
- Always end responses that need follow-up with a call-to-action to contact the company
- You can help with: service enquiries, getting quotes, company info, project types, product categories, contact details, general construction/supply advice`

// ── Suggested quick questions ─────────────────────────────────────────────────
const SUGGESTIONS = [
  'What services do you offer?',
  'How do I get a quote?',
  'What areas do you cover?',
  'Do you supply furniture?',
  'Tell me about road construction',
  'Company registration details',
]

// ── Chat bubble component ─────────────────────────────────────────────────────
function ChatBubble({ msg }) {
  const isUser = msg.role === 'user'
  return (
    <div
      className={`flex gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'} items-end mb-4`}
    >
      {/* Avatar */}
      {!isUser && (
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
          style={{ background: '#B8922A', color: '#09192E' }}
        >
          Jaz
        </div>
      )}
      {isUser && (
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
          style={{ background: '#09192E', color: '#D4AA45' }}
        >
          You
        </div>
      )}

      {/* Bubble */}
      <div
        className="max-w-[78%] rounded-2xl px-4 py-3 text-[13.5px] leading-[1.65]"
        style={{
          background: isUser ? '#09192E' : '#F5F3EE',
          color: isUser ? '#fff' : '#1C1816',
          borderBottomRightRadius: isUser ? 4 : undefined,
          borderBottomLeftRadius: !isUser ? 4 : undefined,
        }}
      >
        {msg.content}
      </div>
    </div>
  )
}

// ── Typing indicator ──────────────────────────────────────────────────────────
function TypingIndicator() {
  return (
    <div className="flex gap-3 items-end mb-4">
      <div
        className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
        style={{ background: '#B8922A', color: '#09192E' }}
      >
        Jaz
      </div>
      <div
        className="rounded-2xl px-4 py-3 flex gap-1.5 items-center"
        style={{ background: '#F5F3EE', borderBottomLeftRadius: 4 }}
      >
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="w-2 h-2 rounded-full"
            style={{
              background: '#B8922A',
              animation: `bounce 1.2s ease-in-out ${i * 0.2}s infinite`,
            }}
          />
        ))}
      </div>
    </div>
  )
}

// ── Main Chatbot Component ────────────────────────────────────────────────────
export default function Chatbot() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content:
        'Karibu! 👋 I\'m Jaz, your virtual assistant for Jaafar and Son Limited. I can help you with information about our civil works, general supplies, quotes, and more. How can I help you today?',
    },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [hasGreeted, setHasGreeted] = useState(false)
  const [notification, setNotification] = useState(true)
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  // Focus input when opened
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 100)
      setNotification(false)
      if (!hasGreeted) setHasGreeted(true)
    }
  }, [open])

  const sendMessage = async (text) => {
    const userText = text || input.trim()
    if (!userText || loading) return

    setInput('')
    const newMessages = [...messages, { role: 'user', content: userText }]
    setMessages(newMessages)
    setLoading(true)

    try {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 1000,
          system: SYSTEM_PROMPT,
          messages: newMessages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      })

      const data = await response.json()
      const reply =
        data?.content?.[0]?.text ||
        "I'm sorry, I couldn't process that. Please call us at +254 710 104 462 for immediate assistance."

      setMessages((prev) => [...prev, { role: 'assistant', content: reply }])
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content:
            "I'm having trouble connecting right now. Please reach us directly at +254 710 104 462 or virsonlimited@gmail.com.",
        },
      ])
    } finally {
      setLoading(false)
    }
  }

  const handleKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const clearChat = () => {
    setMessages([
      {
        role: 'assistant',
        content:
          'Karibu! 👋 Chat cleared. How can I help you with Jaafar and Son Limited today?',
      },
    ])
  }

  return (
    <>
      {/* ── Bounce keyframe ── */}
      <style>{`
        @keyframes bounce {
          0%, 80%, 100% { transform: translateY(0); opacity: 0.4; }
          40% { transform: translateY(-6px); opacity: 1; }
        }
        @keyframes chatSlideUp {
          from { opacity: 0; transform: translateY(20px) scale(0.96); }
          to   { opacity: 1; transform: translateY(0)   scale(1);    }
        }
        @keyframes pulseRing {
          0%   { transform: scale(1);    opacity: 0.6; }
          100% { transform: scale(1.55); opacity: 0;   }
        }
        .chat-window { animation: chatSlideUp 0.3s cubic-bezier(.4,0,.2,1) both; }
        .pulse-ring  { animation: pulseRing 1.8s ease-out infinite; }
      `}</style>

      {/* ── Floating Button ── */}
      <div className="fixed bottom-6 right-6 z-[999] flex flex-col items-end gap-3">

        {/* Notification bubble */}
        {notification && !open && (
          <div
            className="text-[12px] font-medium px-4 py-2.5 rounded-2xl shadow-lg max-w-[200px] text-right cursor-pointer"
            style={{ background: '#09192E', color: '#fff', borderBottomRightRadius: 4 }}
            onClick={() => setOpen(true)}
          >
            👋 Hi! Need help? Ask Jaz!
            <div className="text-[10px] mt-0.5" style={{ color: '#D4AA45' }}>
              Jaafar &amp; Son Assistant
            </div>
          </div>
        )}

        {/* Toggle button */}
        <div className="relative">
          {/* Pulse ring */}
          {!open && (
            <div
              className="pulse-ring absolute inset-0 rounded-full"
              style={{ background: '#B8922A' }}
            />
          )}
          <button
            onClick={() => setOpen((o) => !o)}
            className="w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 hover:scale-110 focus:outline-none relative z-10"
            style={{ background: open ? '#09192E' : '#B8922A' }}
            aria-label="Toggle chat"
          >
            {open ? (
              /* Close X */
              <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
              </svg>
            ) : (
              /* Chat icon */
              <svg width="24" height="24" viewBox="0 0 24 24" fill="#09192E">
                <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/>
              </svg>
            )}
          </button>

          {/* Unread dot */}
          {notification && !open && (
            <div
              className="absolute -top-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold"
              style={{ background: '#E53E3E', color: '#fff' }}
            >
              1
            </div>
          )}
        </div>
      </div>

      {/* ── Chat Window ── */}
      {open && (
        <div
          className="chat-window fixed bottom-24 right-6 z-[998] flex flex-col rounded-2xl overflow-hidden shadow-2xl"
          style={{
            width: 'min(380px, calc(100vw - 32px))',
            height: 'min(560px, calc(100vh - 120px))',
            border: '1px solid rgba(184,146,42,0.25)',
          }}
        >
          {/* Header */}
          <div
            className="px-4 py-3.5 flex items-center justify-between flex-shrink-0"
            style={{ background: '#09192E' }}
          >
            <div className="flex items-center gap-3">
              {/* Logo */}
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0"
                style={{ background: '#B8922A', color: '#09192E' }}
              >
                J
              </div>
              <div>
                <div className="text-white text-[13.5px] font-semibold leading-tight">
                  Jaz — Jaafar Assistant
                </div>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block" />
                  <span className="text-[10px]" style={{ color: 'rgba(255,255,255,0.5)' }}>
                    Online · Typically replies instantly
                  </span>
                </div>
              </div>
            </div>
            {/* Clear button */}
            <button
              onClick={clearChat}
              className="text-[10px] px-2.5 py-1 rounded-md transition-all focus:outline-none"
              style={{ color: 'rgba(255,255,255,0.45)', border: '1px solid rgba(255,255,255,0.12)' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#D4AA45')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.45)')}
            >
              Clear
            </button>
          </div>

          {/* Messages */}
          <div
            className="flex-1 overflow-y-auto px-4 pt-4"
            style={{ background: '#FFFFFF' }}
          >
            {messages.map((msg, i) => (
              <ChatBubble key={i} msg={msg} />
            ))}
            {loading && <TypingIndicator />}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick suggestions (only show when few messages) */}
          {messages.length <= 2 && !loading && (
            <div
              className="px-4 py-2 flex flex-wrap gap-1.5 flex-shrink-0"
              style={{ background: '#fff', borderTop: '1px solid #F0ECE4' }}
            >
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  onClick={() => sendMessage(s)}
                  className="text-[11px] px-3 py-1.5 rounded-full transition-all duration-200 focus:outline-none"
                  style={{
                    background: '#F5F3EE',
                    color: '#09192E',
                    border: '1px solid #E8E4DC',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#B8922A'
                    e.currentTarget.style.color = '#09192E'
                    e.currentTarget.style.borderColor = '#B8922A'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = '#F5F3EE'
                    e.currentTarget.style.color = '#09192E'
                    e.currentTarget.style.borderColor = '#E8E4DC'
                  }}
                >
                  {s}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div
            className="px-3 py-3 flex items-end gap-2 flex-shrink-0"
            style={{ background: '#fff', borderTop: '1px solid #F0ECE4' }}
          >
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKey}
              placeholder="Type your message..."
              rows={1}
              disabled={loading}
              className="flex-1 resize-none rounded-xl px-3.5 py-2.5 text-[13.5px] leading-[1.5] focus:outline-none transition-all"
              style={{
                background: '#F5F3EE',
                color: '#1C1816',
                border: '1px solid #E8E4DC',
                maxHeight: 100,
                overflow: 'auto',
              }}
              onFocus={(e) => (e.currentTarget.style.borderColor = '#B8922A')}
              onBlur={(e) => (e.currentTarget.style.borderColor = '#E8E4DC')}
              onInput={(e) => {
                e.target.style.height = 'auto'
                e.target.style.height = Math.min(e.target.scrollHeight, 100) + 'px'
              }}
            />
            <button
              onClick={() => sendMessage()}
              disabled={!input.trim() || loading}
              className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-200 focus:outline-none"
              style={{
                background: input.trim() && !loading ? '#B8922A' : '#E8E4DC',
                cursor: input.trim() && !loading ? 'pointer' : 'not-allowed',
              }}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill={input.trim() && !loading ? '#09192E' : '#AAA'}
              >
                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
              </svg>
            </button>
          </div>

          {/* Powered by footer */}
          <div
            className="text-center py-1.5 text-[10px] flex-shrink-0"
            style={{ background: '#F9F7F2', color: '#9A9080' }}
          >
            Powered by AI · Jaafar and Son Limited © 2024
          </div>
        </div>
      )}
    </>
  )
}

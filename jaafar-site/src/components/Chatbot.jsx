'use client'

import { useState, useEffect, useRef } from 'react'

// ─────────────────────────────────────────────────────────────────────────────
// SMART RESPONSE ENGINE — no API key needed, works offline & on Vercel free tier
// ─────────────────────────────────────────────────────────────────────────────
function getResponse(input) {
  const q = input.toLowerCase().trim()

  // ── Greetings ──
  if (/^(hi|hello|hey|hola|habari|karibu|mambo|niaje|sasa|howdy|good\s*(morning|afternoon|evening|day))/.test(q)) {
    return `Karibu! 👋 Hello! I'm **Jaz**, the virtual assistant for **Jaafar and Son Limited**.\n\nI can help you with:\n• Our civil works & construction services\n• General supplies & products\n• Getting a quote\n• Company information & contacts\n\nWhat would you like to know? 😊`
  }

  // ── Swahili ──
  if (/asante|shukrani|tafadhali|habari yako|nzuri|sawa|poa|mambo/.test(q)) {
    return `Asante sana! 🇰🇪 Karibu kwa Jaafar and Son Limited.\n\nTunafanya kazi za ujenzi na usambazaji wa bidhaa hapa Nairobi.\n\nUnaweza kuandika kwa Kiingereza ili nikusaidie vizuri zaidi. Au piga simu: **+254 710 104 462** 📞`
  }

  // ── Thanks / goodbye ──
  if (/thank|thanks|bye|goodbye|see you|later|great|perfect|awesome|excellent|well done/.test(q)) {
    return `You're welcome! 😊 It was a pleasure helping you.\n\nFor anything else, reach us anytime:\n📞 **+254 710 104 462**\n✉️ **virsonlimited@gmail.com**\n\nHave a great day! 🌟`
  }

  // ── About / company ──
  if (/who (are|is)|about (you|us|company|jaafar)|what is jaafar|tell me about|company (info|profile|detail|background)|overview/.test(q)) {
    return `**Jaafar and Son Limited** is a proudly Kenyan company based in Nairobi.\n\n🏢 **We operate two divisions:**\n1. **Civil Works & Construction** — roads, buildings, infrastructure\n2. **General Supplies** — furniture, electronics, hardware & more\n\n📋 **Key Details:**\n• Reg. No: PVT-3QU7PGX7\n• Established: 25 October 2022\n• Director: Amina Jafaar Sheikh\n• Location: Yala Towers, Biashara Street, Starehe, Nairobi\n\nWe are your trusted **one-stop partner** for construction and procurement across Kenya! 🇰🇪`
  }

  // ── All services ──
  if (/what (do you|services|can you)|all service|^service|offer|provide|what you do|division/.test(q)) {
    return `We offer services across **two divisions**:\n\n🏗️ **Division 1 — Civil Works:**\n• Road construction & rehabilitation\n• Building construction\n• Civil infrastructure (water, sewer, bridges)\n• Site preparation & demolition\n• Renovation & refurbishment\n• Project management\n\n🛒 **Division 2 — General Supplies:**\n• Office & school furniture\n• Electronics & IT equipment\n• Construction materials\n• Stationery & consumables\n• Household & commercial goods\n• Agricultural inputs\n• Safety & PPE gear\n• Cleaning & sanitation supplies\n\nWant details on any specific service? Just ask! 😊`
  }

  // ── Roads ──
  if (/road|highway|tarmac|murram|gravel|culvert|drainage|pavement|bitumen/.test(q)) {
    return `🛣️ **Road Construction & Rehabilitation**\n\nWe handle:\n• New road construction (tarmac, murram, gravel)\n• Road rehabilitation and pothole repairs\n• Drainage — culverts, channels, stormwater\n• Road signage, guard rails and markings\n• Bridges and box culverts\n\nWe work with county governments and private developers.\n\n📞 **+254 710 104 462**\n✉️ **virsonlimited@gmail.com**`
  }

  // ── Buildings ──
  if (/build|house|bungalow|apartment|commercial|warehouse|office block|structural|foundation|roof|finish|plastering|tiling|residential/.test(q)) {
    return `🏠 **Building Construction**\n\nWe construct:\n• Residential houses, bungalows, maisonettes\n• Commercial buildings and office blocks\n• Warehouses and industrial facilities\n• Schools, hospitals and institutional buildings\n\nScope: **foundations → masonry → roofing → finishing → handover**\n\nWe also handle renovations and refurbishments!\n\n📞 **+254 710 104 462**\n✉️ **virsonlimited@gmail.com**`
  }

  // ── Furniture ──
  if (/furniture|desk|chair|cabinet|shelf|office fit|boardroom|school desk|reception/.test(q)) {
    return `🪑 **Office & School Furniture**\n\nWe supply:\n• Executive and visitor chairs\n• Office desks and workstations\n• Boardroom and conference tables\n• Filing cabinets and bookshelves\n• School desks and classroom sets\n• Reception counters\n• Custom office fitouts\n\nWe serve offices, schools, government and hotels.\n\n📞 **+254 710 104 462**\n✉️ **virsonlimited@gmail.com**`
  }

  // ── Electronics / IT ──
  if (/electronic|laptop|computer|printer|projector|cctv|network|router|television|it equipment|scanner|photocopier|ups|monitor/.test(q)) {
    return `💻 **Electronics & IT Equipment**\n\nWe supply:\n• Desktop and laptop computers\n• Printers, photocopiers and scanners\n• Projectors and smart TVs\n• CCTV and security systems\n• Networking switches, routers & cables\n• UPS and power backup systems\n• All IT accessories and consumables\n\nAll products come with full warranty.\n\n📞 **+254 710 104 462**\n✉️ **virsonlimited@gmail.com**`
  }

  // ── Construction materials ──
  if (/cement|steel|timber|tile|paint|hardware|plumbing|pipe|sanitary|iron sheet|building material|aggregate/.test(q)) {
    return `🧱 **Construction Materials & Hardware**\n\nWe supply:\n• Cement (all grades)\n• Steel reinforcement bars\n• Structural timber\n• Roofing sheets and tiles\n• Wall and floor tiles\n• Paints and varnishes\n• Plumbing pipes and fittings\n• Sanitary ware\n• Electrical cables and hardware\n\nBulk orders and delivery available.\n\n📞 **+254 710 104 462**\n✉️ **virsonlimited@gmail.com**`
  }

  // ── PPE / Safety ──
  if (/ppe|safety|hard hat|helmet|boot|jacket|glove|goggle|protective|reflective|fire extinguisher/.test(q)) {
    return `🦺 **Safety & PPE Equipment**\n\nWe supply:\n• Hard hats and safety helmets\n• Safety boots (all sizes)\n• High-visibility reflective jackets\n• Safety gloves (leather and rubber)\n• Goggles and face shields\n• Dust masks and respirators\n• Fire extinguishers\n• Complete PPE kits\n\nIdeal for construction sites and factories.\n\n📞 **+254 710 104 462**\n✉️ **virsonlimited@gmail.com**`
  }

  // ── Agricultural ──
  if (/agri|farm|seed|fertilizer|fertiliser|pesticide|irrigation|crop|harvest/.test(q)) {
    return `🌱 **Agricultural Inputs & Supplies**\n\nWe supply:\n• Certified seeds\n• Fertilisers — CAN, DAP, NPK\n• Pesticides and herbicides\n• Irrigation pipes and sprinklers\n• Hand tools and farm implements\n\nWe serve smallholder and large-scale farmers.\n\n📞 **+254 710 104 462**\n✉️ **virsonlimited@gmail.com**`
  }

  // ── Stationery ──
  if (/stationery|paper|pen|pencil|toner|ink|cartridge|notebook|binder|office supply/.test(q)) {
    return `📎 **Stationery & Office Consumables**\n\nWe supply:\n• A4 and A3 printing paper\n• Pens, pencils and markers\n• Notebooks, binders and folders\n• Toner cartridges and ink\n• Envelopes and mailing supplies\n• All office consumables\n\nBulk institutional supply available.\n\n📞 **+254 710 104 462**\n✉️ **virsonlimited@gmail.com**`
  }

  // ── Cleaning ──
  if (/clean|mop|broom|detergent|sanitizer|sanitiser|disinfect|washroom|hygiene/.test(q)) {
    return `🧹 **Cleaning & Sanitation Supplies**\n\nWe supply:\n• Industrial cleaning chemicals\n• Detergents and disinfectants\n• Mops, brooms and scrubbers\n• Hand sanitisers (bulk)\n• Waste bins and bin bags\n• Washroom consumables\n\nFor offices, hospitals, schools and facilities.\n\n📞 **+254 710 104 462**\n✉️ **virsonlimited@gmail.com**`
  }

  // ── Quote / pricing ──
  if (/quote|price|cost|how much|charge|rate|fee|estimate|bid|tender|proposal/.test(q)) {
    return `💰 **Get a Free Quote**\n\nAll quotes are **customised** based on:\n• Project scope and specifications\n• Quantities required\n• Location and delivery\n• Timeline\n\nTo get your free, no-obligation quote:\n\n📞 **Call:** +254 710 104 462\n✉️ **Email:** virsonlimited@gmail.com\n📍 **Visit:** Yala Towers, Biashara Street, Starehe, Nairobi\n\nWe respond within **24 hours** — urgent? Call us directly! 🚀`
  }

  // ── Contact / location ──
  if (/contact|reach|location|address|where|find you|office|visit|call|email|phone|number/.test(q)) {
    return `📍 **Contact Jaafar and Son Limited**\n\n**Physical Address:**\nYala Towers, Biashara Street, Starehe, Nairobi\n\n**Postal Address:**\nP.O. Box 38631, 00100 G.P.O. Nairobi\n\n📞 **Phone:** +254 710 104 462\n✉️ **Email:** virsonlimited@gmail.com\n\n**Business Hours:**\nMon – Fri: 8:00 AM – 5:00 PM\nSaturday: 9:00 AM – 1:00 PM\n\nWe're happy to arrange a site visit! 🤝`
  }

  // ── Registration / legal ──
  if (/reg|registration|registered|certificate|kra|compliance|legal|incorporated|act|pvt/.test(q)) {
    return `✅ **Company Registration Details**\n\n• **Company Name:** Jaafar and Son Limited\n• **Registration No.:** PVT-3QU7PGX7\n• **Incorporated:** 25 October 2022\n• **Under:** Kenya Companies Act 2015\n• **Director:** Amina Jafaar Sheikh\n• **Share Capital:** KES 100,000\n• **County:** Nairobi | **District:** Starehe\n\nFully KRA compliant. Registration documents available on request for tender purposes. 📄`
  }

  // ── Why choose us ──
  if (/why (choose|use|hire|work with)|advantage|benefit|strength|different|better|best|unique/.test(q)) {
    return `⭐ **Why Choose Jaafar and Son Limited?**\n\n**01. Fully Registered & Compliant**\nKRA registered, Kenya Companies Act 2015.\n\n**02. Quality Guarantee**\nKEBS standards and international benchmarks.\n\n**03. Experienced Team**\nEngineers, project managers and procurement specialists.\n\n**04. Competitive Pricing**\nTransparent quotations, no hidden costs.\n\n**05. Timely Delivery**\nOn-time, on-budget — every project, every time.\n\n**06. One-Stop Solution**\nRoads to furniture — one company handles it all! 🏆\n\n📞 **+254 710 104 462** | ✉️ **virsonlimited@gmail.com**`
  }

  // ── Infrastructure / water ──
  if (/water|sewer|borehole|tank|reservoir|infrastructure|civil infra/.test(q)) {
    return `🚰 **Civil Infrastructure**\n\nWe construct:\n• Water supply pipelines and systems\n• Boreholes and water tanks\n• Elevated storage reservoirs\n• Sewer lines and septic tanks\n• Stormwater drainage channels\n• Retaining walls\n• Bridges and culverts\n\nFor county governments, NGOs and private developers.\n\n📞 **+254 710 104 462**\n✉️ **virsonlimited@gmail.com**`
  }

  // ── Renovation ──
  if (/renovat|refurbish|repair|upgrade|remodel|repaint|rewir/.test(q)) {
    return `🔨 **Renovation & Refurbishment**\n\nWe handle:\n• Structural repairs and strengthening\n• Re-roofing and waterproofing\n• Re-plastering and repainting\n• Plumbing and sanitary upgrades\n• Electrical rewiring\n• Office partitioning\n• Complete interior refurbishment\n\nRestoring buildings to modern standards at competitive rates.\n\n📞 **+254 710 104 462**\n✉️ **virsonlimited@gmail.com**`
  }

  // ── Clients ──
  if (/client|customer|who (do you|have you)|government|ngo|sector|work with|serve/.test(q)) {
    return `🤝 **Our Clients & Sectors**\n\nWe serve:\n• National and county governments\n• Roads and public works departments\n• NGOs and international organisations\n• Real estate developers\n• Hotels, hospitals and schools\n• Private homeowners and businesses\n• Agricultural institutions\n\nFrom small community projects to large government contracts!\n\n📞 **+254 710 104 462**`
  }

  // ── Project management ──
  if (/project manag|supervise|supervision|boq|bill of quantity|tender|contractor/.test(q)) {
    return `📋 **Project Management & Supervision**\n\nWe offer:\n• Design review and tender preparation\n• Bill of Quantities (BOQ) preparation\n• Contractor evaluation and selection\n• Construction supervision and QC\n• Progress reporting and client liaison\n• Final inspection and handover\n\nFull turnkey or supervision-only options available.\n\n📞 **+254 710 104 462**\n✉️ **virsonlimited@gmail.com**`
  }

  // ── Household goods ──
  if (/household|kitchen|appliance|home|domestic|bedding|mattress|curtain/.test(q)) {
    return `🏠 **Household & Commercial Goods**\n\nWe supply:\n• Kitchen equipment and appliances\n• Domestic appliances\n• Bedding and mattresses\n• Curtains, blinds and soft furnishings\n• General household items\n\nIdeal for hotels, hospitals, hostels and institutions.\n\n📞 **+254 710 104 462**\n✉️ **virsonlimited@gmail.com**`
  }

  // ── Default fallback ──
  return `Thanks for your message! 😊 I'm **Jaz**, the Jaafar and Son Limited assistant.\n\nI can help you with:\n• 🏗️ Civil works — roads, buildings, infrastructure\n• 🛒 General supplies — furniture, electronics, hardware\n• 💰 Quotes and pricing\n• 📍 Contact and location\n• 🏢 Company information\n\nCould you rephrase your question or pick a topic above?\n\nFor immediate help:\n📞 **+254 710 104 462** | ✉️ **virsonlimited@gmail.com**`
}

// ── Format **bold** and newlines ──────────────────────────────────────────────
function fmt(text) {
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\n/g, '<br/>')
}

const SUGGESTIONS = [
  'What services do you offer?',
  'How do I get a quote?',
  'Road construction',
  'Office furniture supply',
  'Contact details',
  'Company registration',
]

// ── Chat bubble ───────────────────────────────────────────────────────────────
function Bubble({ msg }) {
  const isUser = msg.role === 'user'
  return (
    <div style={{ display: 'flex', flexDirection: isUser ? 'row-reverse' : 'row', gap: 10, alignItems: 'flex-end', marginBottom: 14, animation: 'msgIn .3s ease both' }}>
      <div style={{ width: 30, height: 30, borderRadius: '50%', background: isUser ? '#09192E' : '#B8922A', color: isUser ? '#D4AA45' : '#09192E', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 800, flexShrink: 0 }}>
        {isUser ? 'You' : 'Jaz'}
      </div>
      <div
        style={{ background: isUser ? '#09192E' : '#F5F3EE', color: isUser ? '#fff' : '#1C1816', borderRadius: 14, borderBottomRightRadius: isUser ? 4 : 14, borderBottomLeftRadius: isUser ? 14 : 4, padding: '10px 13px', fontSize: 13, lineHeight: 1.65, maxWidth: '82%' }}
        dangerouslySetInnerHTML={{ __html: fmt(msg.content) }}
      />
    </div>
  )
}

// ── Typing dots ───────────────────────────────────────────────────────────────
function TypingDots() {
  return (
    <div style={{ display: 'flex', gap: 10, alignItems: 'flex-end', marginBottom: 14 }}>
      <div style={{ width: 30, height: 30, borderRadius: '50%', background: '#B8922A', color: '#09192E', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 800, flexShrink: 0 }}>Jaz</div>
      <div style={{ background: '#F5F3EE', borderRadius: 14, borderBottomLeftRadius: 4, padding: '10px 13px', display: 'flex', gap: 5, alignItems: 'center' }}>
        {[0, 1, 2].map(i => <span key={i} style={{ width: 7, height: 7, borderRadius: '50%', background: '#B8922A', display: 'inline-block', animation: `dots 1.2s ease ${i * 0.2}s infinite` }} />)}
      </div>
    </div>
  )
}

// ── Main component ────────────────────────────────────────────────────────────
export default function Chatbot() {
  const [open, setOpen] = useState(false)
  const [showNotif, setShowNotif] = useState(true)
  const [messages, setMessages] = useState([
    { role: 'assistant', content: "Karibu! 👋 I'm **Jaz**, your virtual assistant for **Jaafar and Son Limited**.\n\nI can help with civil works, general supplies, quotes and more.\n\nHow can I help you today? 😊" }
  ])
  const [input, setInput] = useState('')
  const [thinking, setThinking] = useState(false)
  const [showSugg, setShowSugg] = useState(true)
  const bottomRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [messages, thinking])
  useEffect(() => { if (open) { setShowNotif(false); setTimeout(() => inputRef.current?.focus(), 150) } }, [open])

  const send = (text) => {
    const msg = (text || input).trim()
    if (!msg || thinking) return
    setInput('')
    setShowSugg(false)
    const updated = [...messages, { role: 'user', content: msg }]
    setMessages(updated)
    setThinking(true)
    setTimeout(() => {
      setMessages([...updated, { role: 'assistant', content: getResponse(msg) }])
      setThinking(false)
    }, 400 + Math.random() * 400)
  }

  const clear = () => {
    setMessages([{ role: 'assistant', content: "Karibu! 👋 Chat cleared. How can I help you with Jaafar and Son Limited today? 😊" }])
    setShowSugg(true)
  }

  return (
    <>
      <style>{`
        @keyframes dots{0%,80%,100%{transform:translateY(0);opacity:.35}40%{transform:translateY(-6px);opacity:1}}
        @keyframes slideUp{from{opacity:0;transform:translateY(18px) scale(.96)}to{opacity:1;transform:translateY(0) scale(1)}}
        @keyframes msgIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
        @keyframes pulse{0%{transform:scale(1);opacity:.65}100%{transform:scale(1.55);opacity:0}}
        .chat-win{animation:slideUp .28s cubic-bezier(.4,0,.2,1) both}
        .pulse{animation:pulse 1.8s ease-out infinite}
        .s-btn{font-size:11px;padding:5px 11px;border-radius:50px;background:#F5F3EE;color:#09192E;border:1px solid #E8E4DC;cursor:pointer;transition:all .2s;white-space:nowrap;font-family:inherit}
        .s-btn:hover{background:#B8922A;color:#09192E;border-color:#B8922A}
        #jaz-msgs::-webkit-scrollbar{width:3px}
        #jaz-msgs::-webkit-scrollbar-thumb{background:#D4AA45;border-radius:2px}
      `}</style>

      {/* FAB area */}
      <div style={{ position: 'fixed', bottom: 24, right: 24, zIndex: 9999, display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 10 }}>
        {showNotif && !open && (
          <div onClick={() => setOpen(true)} style={{ background: '#09192E', color: '#fff', fontSize: 12, padding: '10px 14px', borderRadius: 14, borderBottomRightRadius: 4, boxShadow: '0 4px 20px rgba(0,0,0,.22)', cursor: 'pointer', maxWidth: 200, textAlign: 'right', animation: 'msgIn .4s ease both', fontFamily: 'system-ui, sans-serif' }}>
            👋 Hi! Need help? Ask Jaz!
            <div style={{ fontSize: 10, color: '#D4AA45', marginTop: 2 }}>Jaafar &amp; Son Assistant</div>
          </div>
        )}
        <div style={{ position: 'relative' }}>
          {!open && <div className="pulse" style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: '#B8922A' }} />}
          <button onClick={() => setOpen(o => !o)} style={{ width: 56, height: 56, borderRadius: '50%', background: open ? '#09192E' : '#B8922A', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 24px rgba(184,146,42,.4)', transition: 'all .3s', position: 'relative', zIndex: 1 }}>
            {open
              ? <svg width="22" height="22" viewBox="0 0 24 24" fill="white"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>
              : <svg width="24" height="24" viewBox="0 0 24 24" fill="#09192E"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/></svg>
            }
          </button>
          {showNotif && !open && (
            <div style={{ position: 'absolute', top: -4, right: -4, width: 16, height: 16, background: '#E53E3E', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, fontWeight: 700, color: '#fff' }}>1</div>
          )}
        </div>
      </div>

      {/* Chat window */}
      {open && (
        <div className="chat-win" style={{ position: 'fixed', bottom: 96, right: 24, zIndex: 9998, width: 'min(372px, calc(100vw - 32px))', height: 'min(560px, calc(100vh - 120px))', display: 'flex', flexDirection: 'column', borderRadius: 18, overflow: 'hidden', boxShadow: '0 12px 48px rgba(9,25,46,.22)', border: '1px solid rgba(184,146,42,.22)', fontFamily: "'Segoe UI', system-ui, sans-serif" }}>

          {/* Header */}
          <div style={{ background: '#09192E', padding: '12px 14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#B8922A', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 14, color: '#09192E', flexShrink: 0 }}>J</div>
              <div>
                <div style={{ color: '#fff', fontSize: 13, fontWeight: 600, lineHeight: 1.2 }}>Jaz — Jaafar Assistant</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginTop: 2 }}>
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#48BB78', display: 'inline-block' }} />
                  <span style={{ fontSize: 10, color: 'rgba(255,255,255,.5)' }}>Online · Replies instantly</span>
                </div>
              </div>
            </div>
            <button onClick={clear} style={{ fontSize: 10, color: 'rgba(255,255,255,.4)', background: 'transparent', border: '1px solid rgba(255,255,255,.12)', padding: '4px 9px', borderRadius: 6, cursor: 'pointer', fontFamily: 'inherit' }}>Clear</button>
          </div>

          {/* Messages */}
          <div id="jaz-msgs" style={{ flex: 1, overflowY: 'auto', padding: '14px 14px 8px', background: '#fff' }}>
            {messages.map((m, i) => <Bubble key={i} msg={m} />)}
            {thinking && <TypingDots />}
            <div ref={bottomRef} />
          </div>

          {/* Suggestions */}
          {showSugg && (
            <div style={{ padding: '8px 14px 6px', display: 'flex', flexWrap: 'wrap', gap: 6, borderTop: '1px solid #F0ECE4', background: '#fff', flexShrink: 0 }}>
              {SUGGESTIONS.map(s => <button key={s} className="s-btn" onClick={() => send(s)}>{s}</button>)}
            </div>
          )}

          {/* Input */}
          <div style={{ padding: 10, display: 'flex', gap: 8, alignItems: 'flex-end', borderTop: '1px solid #F0ECE4', background: '#fff', flexShrink: 0 }}>
            <textarea
              ref={inputRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send() } }}
              placeholder="Type your message..."
              rows={1}
              disabled={thinking}
              style={{ flex: 1, resize: 'none', borderRadius: 12, border: '1px solid #E8E4DC', background: '#F5F3EE', padding: '9px 13px', fontSize: 13, lineHeight: 1.5, outline: 'none', maxHeight: 90, overflow: 'auto', color: '#1C1816', fontFamily: 'inherit', transition: 'border .2s' }}
              onFocus={e => (e.target.style.borderColor = '#B8922A')}
              onBlur={e => (e.target.style.borderColor = '#E8E4DC')}
              onInput={e => { e.target.style.height = 'auto'; e.target.style.height = Math.min(e.target.scrollHeight, 90) + 'px' }}
            />
            <button
              onClick={() => send()}
              disabled={!input.trim() || thinking}
              style={{ width: 38, height: 38, borderRadius: 10, border: 'none', background: input.trim() && !thinking ? '#B8922A' : '#E8E4DC', cursor: input.trim() && !thinking ? 'pointer' : 'not-allowed', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'all .2s' }}
            >
              <svg width="17" height="17" viewBox="0 0 24 24" fill={input.trim() && !thinking ? '#09192E' : '#AAA'}>
                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
              </svg>
            </button>
          </div>

          {/* Footer */}
          <div style={{ textAlign: 'center', padding: '5px', fontSize: 10, color: '#9A9080', background: '#F9F7F2', flexShrink: 0 }}>
            Jaafar and Son Limited © 2024 · Powered by Jaz AI
          </div>
        </div>
      )}
    </>
  )
}

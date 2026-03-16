'use client'

import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import { StatStrip, About, Services, WhyUs } from '../components/Sections'
import Portfolio from '../components/Portfolio'
import Testimonials from '../components/Testimonials'
import Contact from '../components/Contact'
import Footer from '../components/Footer'
import Chatbot from '../components/Chatbot'

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <StatStrip />
      <About />
      <Services />
      <Portfolio />
      <WhyUs />
      <Testimonials />
      <Contact />
      <Footer />
      {/* AI Chatbot — floats over all sections */}
      <Chatbot />
    </main>
  )
}

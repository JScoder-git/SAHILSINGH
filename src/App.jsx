import { useEffect, useRef, useState } from 'react'
import Lenis from 'lenis'
import { gsap, ScrollTrigger } from './lib/gsap'

import Preloader from './components/Preloader'
import CustomCursor from './components/CustomCursor'
import ParticlesBg from './components/ParticlesBg'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Contact from './components/Contact'
import Footer from './components/Footer'

import 'lenis/dist/lenis.css'
import './index.css'

function App() {
  const appRef = useRef(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    window.history.scrollRestoration = 'manual'
    window.scrollTo(0, 0)

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })

    lenis.on('scroll', ScrollTrigger.update)
    const ticker = (time) => lenis.raf(time * 1000)
    gsap.ticker.add(ticker)
    gsap.ticker.lagSmoothing(0)

    const onClick = (e) => {
      const link = e.target.closest('a[href^="#"]')
      if (!link) return
      const href = link.getAttribute('href')
      if (!href || href === '#') return
      const target = document.querySelector(href)
      if (!target) return
      e.preventDefault()
      gsap.to(window, { duration: 1.05, scrollTo: { y: href, offsetY: 70 }, ease: 'power3.inOut' })
    }

    document.addEventListener('click', onClick)

    const progress = document.querySelector('.scroll-progress')
    const st = ScrollTrigger.create({
      start: 0,
      end: 'max',
      onUpdate: (self) => {
        gsap.set(progress, { scaleX: self.progress })
      },
    })

    return () => {
      document.removeEventListener('click', onClick)
      gsap.ticker.remove(ticker)
      st.kill()
      lenis.destroy()
    }
  }, [])

  useEffect(() => {
    if (!ready) return
    const id = requestAnimationFrame(() => ScrollTrigger.refresh())
    return () => cancelAnimationFrame(id)
  }, [ready])

  return (
    <div ref={appRef} className="app">
      <Preloader onComplete={() => setReady(true)} />
      <div className="scroll-progress" />
      <div className="grain" />
      <CustomCursor />
      <ParticlesBg />
      <Navbar ready={ready} />
      <main>
        <Hero ready={ready} />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

export default App

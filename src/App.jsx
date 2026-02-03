import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from '@studio-freight/lenis'

import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Contact from './components/Contact'
import ParticlesBg from './components/ParticlesBg'
import Footer from './components/Footer'
import CustomCursor from './components/CustomCursor'

import './index.css'

gsap.registerPlugin(ScrollTrigger)

function App() {
  const appRef = useRef(null)

  useEffect(() => {
    // Force scroll to top on refresh
    window.history.scrollRestoration = 'manual'
    window.scrollTo(0, 0)

    // Initialize ultra-smooth scroll
    const lenis = new Lenis({
      duration: 1.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      lerp: 0.1,
      infinite: false,
    })

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    // Connect Lenis to GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update)

    // Page Intro Animation - Ultra Premium
    const introTl = gsap.timeline()

    // Initial state
    gsap.set('.intro-panel', { yPercent: 0 })
    gsap.set('.intro-logo', { scale: 0.8, opacity: 0 })
    gsap.set('.intro-progress-bar', { scaleX: 0 })

    introTl
      .to('.intro-logo', {
        opacity: 1,
        scale: 1,
        duration: 1.2,
        ease: "power4.out"
      })
      .to('.intro-progress-bar', {
        scaleX: 1,
        duration: 2,
        ease: "power2.inOut"
      }, "-=0.5")
      .to('.intro-logo', {
        y: -50,
        opacity: 0,
        filter: "blur(20px)",
        duration: 0.8,
        ease: "power4.in"
      }, "+=0.2")
      .to('.intro-progress-bg', {
        opacity: 0,
        duration: 0.4
      }, "-=0.4")
      .to('.panel-1', {
        yPercent: -100,
        duration: 1,
        ease: "expo.inOut"
      })
      .to('.panel-2', {
        yPercent: -100,
        duration: 1,
        ease: "expo.inOut"
      }, "-=0.8")
      .to('#page-intro', {
        display: 'none'
      })

    // Magnetic buttons effect
    const magneticButtons = document.querySelectorAll('.btn, .social-link, .nav-link')
    magneticButtons.forEach(btn => {
      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect()
        const x = e.clientX - rect.left - rect.width / 2
        const y = e.clientY - rect.top - rect.height / 2

        gsap.to(btn, {
          x: x * 0.35,
          y: y * 0.35,
          duration: 0.4,
          ease: "power2.out"
        })
      })

      btn.addEventListener('mouseleave', () => {
        gsap.to(btn, {
          x: 0,
          y: 0,
          duration: 0.6,
          ease: "elastic.out(1, 0.3)"
        })
      })
    })

    // Reveal animation for section titles
    const initSectionReveals = () => {
      const sectionElements = document.querySelectorAll('.section-title h2, .section-title p')
      sectionElements.forEach(el => {
        gsap.fromTo(el,
          { y: 30, opacity: 0 },
          {
            scrollTrigger: {
              trigger: el,
              start: 'top 96%',
              toggleActions: 'play none none reverse',
            },
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power2.out",
            force3D: true,
            immediateRender: false
          }
        )
      })
    }

    // Refresh ScrollTrigger after all animations are done
    introTl.eventCallback("onComplete", () => {
      initSectionReveals()
      ScrollTrigger.refresh()
    })

    return () => {
      lenis.destroy()
    }
  }, [])

  return (
    <div ref={appRef} className="app">
      <div id="page-intro">
        <div className="intro-content">
          <div className="intro-logo">
            <span className="logo-text">SAHIL</span>
            <div className="logo-glow"></div>
          </div>
          <div className="intro-progress-bg">
            <div className="intro-progress-bar"></div>
          </div>
        </div>
        <div className="intro-panel panel-1"></div>
        <div className="intro-panel panel-2"></div>
      </div>
      <CustomCursor />
      <ParticlesBg />
      <Navbar />
      <main>
        <Hero />
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

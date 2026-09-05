import { useRef } from 'react'
import { gsap, SplitText, useGSAP } from '../lib/gsap'
import { heroStats, marqueeItems, profile } from '../data'
import './Hero.css'

const Hero = ({ ready }) => {
  const heroRef = useRef(null)

  useGSAP(
    (context, contextSafe) => {
      if (!ready) return

      const mm = gsap.matchMedia()

      mm.add('(prefers-reduced-motion: reduce)', () => {
        gsap.set('.hero-line, .hero-copy, .hero-cta, .hero-stats, .hero-marquee', { autoAlpha: 1, y: 0 })
      })

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        // Hide in the same layout pass so the final state never paints before the intro.
        gsap.set('.hero-line, .hero-copy, .hero-cta .btn, .hero-stat, .hero-marquee', { autoAlpha: 0 })

        const run = contextSafe(() => {
          const split = SplitText.create('.hero-line', {
            type: 'words,chars',
            smartWrap: true,
            aria: 'auto',
            charsClass: 'char',
          })

          gsap.set('.hero-line', { autoAlpha: 1 })

          const tl = gsap.timeline({ defaults: { ease: 'power4.out' } })
          tl.fromTo(
            split.chars,
            { yPercent: 130, rotateX: -40 },
            { yPercent: 0, rotateX: 0, stagger: 0.018, duration: 1.15 }
          )
            .fromTo('.hero-copy', { y: 30, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.8 }, '-=0.55')
            .fromTo(
              '.hero-cta .btn',
              { y: 24, autoAlpha: 0 },
              { y: 0, autoAlpha: 1, stagger: 0.08, duration: 0.7 },
              '-=0.5'
            )
            .fromTo(
              '.hero-stat',
              { y: 20, autoAlpha: 0 },
              { y: 0, autoAlpha: 1, stagger: 0.08, duration: 0.6 },
              '-=0.45'
            )
            .fromTo('.hero-marquee', { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.8 }, '-=0.4')
        })

        // Run sync when fonts are already in so React StrictMode cannot queue two intros.
        if (document.fonts?.status === 'loaded') run()
        else if (document.fonts?.ready) document.fonts.ready.then(run)
        else run()

        gsap.to('.hero-visual', {
          y: 120,
          autoAlpha: 0.15,
          ease: 'none',
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1.2,
          },
        })
      })

      return () => mm.revert()
    },
    { scope: heroRef, dependencies: [ready], revertOnUpdate: true }
  )

  return (
    <section id="hero" ref={heroRef} className="hero">
      <div className="hero-visual">
        <p className="hero-eyebrow">
          <span className="dot" /> Available for selected work
        </p>

        <h1 className="hero-title">
          <span className="hero-line">Software</span>
          <span className="hero-line italic">development</span>
          <span className="hero-line">Engineer</span>
        </h1>

        <div className="hero-bottom">
          <p className="hero-copy">
            {profile.name} — {profile.location}. Shipped{' '}
            <a href="https://tudoor.co" target="_blank" rel="noreferrer" data-cursor="Live">
              TUDOOR
            </a>{' '}
            solo, and built SURYACON with a 20+ engineer team.
          </p>

          <div className="hero-cta">
            <a href="#projects" className="btn btn-primary" data-cursor="View">
              View work
            </a>
            <a href="#contact" className="btn btn-ghost">
              Let’s talk
            </a>
          </div>
        </div>

        <div className="hero-stats">
          {heroStats.map((stat) => (
            <div key={stat.label} className="hero-stat">
              <strong>{stat.value}</strong>
              <span>{stat.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="hero-marquee" aria-hidden="true">
        <div className="marquee-track">
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span key={`${item}-${i}`}>
              {item} <i>×</i>
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Hero

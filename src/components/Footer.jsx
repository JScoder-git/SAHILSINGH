import { useRef } from 'react'
import { gsap, useGSAP } from '../lib/gsap'
import { revealUp } from '../lib/reveal'
import { profile } from '../data'
import './Footer.css'

const Footer = () => {
  const footerRef = useRef(null)
  const year = new Date().getFullYear()

  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        revealUp('.footer-grid p', { trigger: '.footer-grid', y: 24, stagger: 0.08, start: 'top 92%' })
        revealUp('.footer-cols > div', { trigger: '.footer-cols', y: 26, stagger: 0.1, start: 'top 92%' })
        revealUp('.footer-bottom p', { trigger: '.footer-bottom', y: 18, stagger: 0.1, duration: 0.5, start: 'top 96%' })
      })

      return () => mm.revert()
    },
    { scope: footerRef }
  )

  return (
    <footer ref={footerRef} className="footer">
      <div className="footer-marquee" aria-hidden="true">
        <div className="footer-track">
          {Array.from({ length: 8 }).map((_, i) => (
            <span key={i}>
              Sahil Singh <em>—</em>
            </span>
          ))}
        </div>
      </div>

      <div className="container footer-grid">
        <div>
          <p>Software Development Engineer</p>
          <p>Offline-first systems, Electron ERPs, live products.</p>
        </div>
        <div className="footer-cols">
          <div>
            <h4>Navigate</h4>
            <a href="#about">About</a>
            <a href="#experience">Work</a>
            <a href="#projects">Projects</a>
            <a href="#contact">Contact</a>
          </div>
          <div>
            <h4>Connect</h4>
            <a href={profile.resume} target="_blank" rel="noreferrer">
              Resume
            </a>
            <a href={`mailto:${profile.email}`}>Email</a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer">
              LinkedIn
            </a>
            <a href={profile.github} target="_blank" rel="noreferrer">
              GitHub
            </a>
            <a href="https://tudoor.co" target="_blank" rel="noreferrer">
              TUDOOR
            </a>
          </div>
        </div>
      </div>

      <div className="container footer-bottom">
        <p>© {year} {profile.name}</p>
        <p>Chandigarh · Built with React + GSAP</p>
      </div>
    </footer>
  )
}

export default Footer

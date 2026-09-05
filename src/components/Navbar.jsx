import { useRef, useState } from 'react'
import { gsap, useGSAP } from '../lib/gsap'
import { navLinks, profile } from '../data'
import './Navbar.css'

const Navbar = ({ ready }) => {
  const navRef = useRef(null)
  const [open, setOpen] = useState(false)
  const [time, setTime] = useState('')

  useGSAP(
    () => {
      const tick = () => {
        setTime(
          new Date().toLocaleTimeString('en-IN', {
            timeZone: 'Asia/Kolkata',
            hour: '2-digit',
            minute: '2-digit',
          })
        )
      }
      tick()
      const id = setInterval(tick, 30000)

      if (ready) {
        gsap.from('.nav-bar', { y: -40, autoAlpha: 0, duration: 0.9, ease: 'power4.out' })
      }

      return () => clearInterval(id)
    },
    { scope: navRef, dependencies: [ready] }
  )

  useGSAP(
    () => {
      const overlay = navRef.current?.querySelector('.nav-overlay')
      if (!overlay) return
      if (open) {
        gsap.set(overlay, { display: 'flex' })
        gsap.fromTo(overlay, { yPercent: -100 }, { yPercent: 0, duration: 0.7, ease: 'expo.inOut' })
        gsap.fromTo(
          '.overlay-link',
          { yPercent: 110 },
          { yPercent: 0, duration: 0.8, stagger: 0.06, ease: 'power4.out', delay: 0.2 }
        )
      } else {
        gsap.to(overlay, {
          yPercent: -100,
          duration: 0.55,
          ease: 'expo.inOut',
          onComplete: () => gsap.set(overlay, { display: 'none' }),
        })
      }
    },
    { scope: navRef, dependencies: [open] }
  )

  const go = (e, href) => {
    e.preventDefault()
    setOpen(false)
    gsap.to(window, { duration: 1.1, scrollTo: { y: href, offsetY: 70 }, ease: 'power3.inOut' })
  }

  return (
    <header ref={navRef} className="nav-wrap">
      <nav className="nav-bar">
        <a href="#hero" className="nav-mark" onClick={(e) => go(e, '#hero')} data-cursor="Home">
          SS
        </a>

        <div className="nav-meta">
          <span>Chandigarh</span>
          <span className="nav-time">{time}</span>
        </div>

        <div className="nav-desktop">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className="nav-item" onClick={(e) => go(e, link.href)}>
              {link.name}
            </a>
          ))}
          <a href={profile.resume} className="btn btn-primary nav-resume" target="_blank" rel="noreferrer" data-cursor="CV">
            Resume
          </a>
        </div>

        <button
          className={`nav-burger ${open ? 'is-open' : ''}`}
          onClick={() => setOpen((v) => !v)}
          aria-label="Menu"
        >
          <span />
          <span />
        </button>
      </nav>

      <div className="nav-overlay">
        <div className="overlay-links">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className="overlay-link" onClick={(e) => go(e, link.href)}>
              <em>{link.index}</em>
              <span>{link.name}</span>
            </a>
          ))}
        </div>
        <div className="overlay-foot">
          <a href={profile.resume} target="_blank" rel="noreferrer">
            Resume
          </a>
          <a href={profile.email && `mailto:${profile.email}`}>{profile.email}</a>
          <a href={profile.github} target="_blank" rel="noreferrer">
            GitHub
          </a>
        </div>
      </div>
    </header>
  )
}

export default Navbar

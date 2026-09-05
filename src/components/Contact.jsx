import { useRef, useState, useEffect } from 'react'
import { gsap, ScrollTrigger, SplitText, useGSAP } from '../lib/gsap'
import { revealTrigger, revealUp, whenFontsReady } from '../lib/reveal'
import { profile } from '../data'
import { FaEnvelope, FaGithub, FaLinkedin, FaMapMarkerAlt, FaPhone } from 'react-icons/fa'
import './Contact.css'

const Contact = () => {
  const sectionRef = useRef(null)
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [status, setStatus] = useState({ type: '', message: '' })

  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        let cleanup

        whenFontsReady(() => {
          const split = SplitText.create('.contact-giant', {
            type: 'chars',
            aria: 'auto',
            mask: 'chars',
          })

          gsap.fromTo(
            split.chars,
            { yPercent: 120, rotate: 5 },
            {
              yPercent: 0,
              rotate: 0,
              stagger: 0.03,
              duration: 1,
              ease: 'power4.out',
              scrollTrigger: revealTrigger('.contact-giant', 'top 85%'),
            }
          )

          cleanup = () => split.revert()
          ScrollTrigger.refresh()
        })

        revealUp('.contact-index', { trigger: '.contact-index', y: 16, duration: 0.5, start: 'top 92%' })

        gsap.fromTo(
          '.contact-card, .contact-form',
          { y: 44, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            stagger: 0.12,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: revealTrigger('.contact-grid', 'top 82%'),
          }
        )

        revealUp('.contact-list li', { trigger: '.contact-list', y: 18, stagger: 0.07, duration: 0.5, start: 'top 90%' })
        revealUp('.contact-form label, .contact-form .btn', {
          trigger: '.contact-form',
          y: 20,
          stagger: 0.07,
          duration: 0.55,
          start: 'top 85%',
        })

        return () => cleanup?.()
      })

      return () => mm.revert()
    },
    { scope: sectionRef }
  )

  useEffect(() => {
    if (!status.message) return
    const t = setTimeout(() => setStatus({ type: '', message: '' }), 5000)
    return () => clearTimeout(t)
  }, [status])

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setStatus({ type: '', message: '' })
    try {
      const response = await fetch('https://formsubmit.co/ajax/sahilserrka058@gmail.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          ...formData,
          _subject: `Portfolio Contact: ${formData.subject}`,
        }),
      })
      if (!response.ok) throw new Error('Failed')
      setStatus({ type: 'success', message: 'Message sent. I’ll get back soon.' })
      setFormData({ name: '', email: '', subject: '', message: '' })
    } catch {
      setStatus({ type: 'error', message: `Couldn’t send. Email me at ${profile.email}` })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" ref={sectionRef} className="section contact">
      {status.message && (
        <div className={`toast ${status.type}`}>
          <strong>{status.type === 'success' ? 'Sent' : 'Error'}</strong>
          <span>{status.message}</span>
        </div>
      )}

      <div className="container">
        <p className="section-index contact-index">05 — Contact</p>
        <a href={`mailto:${profile.email}`} className="contact-giant" data-cursor="Mail">
          Let’s talk
        </a>

        <div className="contact-grid">
          <div className="contact-card">
            <p>
              Open to product engineering roles and collaborations. If you want an offline-first system or a
              sharp React team, write.
            </p>
            <ul className="contact-list">
              <li>
                <FaEnvelope />
                <a href={`mailto:${profile.email}`}>{profile.email}</a>
              </li>
              <li>
                <FaPhone />
                <a href={profile.phoneHref}>{profile.phone}</a>
              </li>
              <li>
                <FaMapMarkerAlt />
                <span>{profile.location}</span>
              </li>
            </ul>
            <div className="contact-socials">
              <a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
                <FaLinkedin />
              </a>
              <a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub">
                <FaGithub />
              </a>
              <a href={profile.githubAlt} target="_blank" rel="noreferrer" aria-label="GitHub alt">
                <FaGithub />
              </a>
            </div>
          </div>

          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <label>
                Name
                <input name="name" value={formData.name} onChange={handleChange} required placeholder="Your name" />
              </label>
              <label>
                Email
                <input type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="you@studio.com" />
              </label>
            </div>
            <label>
              Subject
              <input name="subject" value={formData.subject} onChange={handleChange} required placeholder="A new product, a team, a brief" />
            </label>
            <label>
              Message
              <textarea name="message" rows="5" value={formData.message} onChange={handleChange} required placeholder="Tell me what you’re building." />
            </label>
            <button className="btn btn-primary" type="submit" disabled={isSubmitting} data-cursor="Send">
              {isSubmitting ? 'Sending…' : 'Send message'}
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}

export default Contact

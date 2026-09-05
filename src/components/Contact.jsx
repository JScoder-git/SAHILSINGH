import { useRef, useState, useEffect } from 'react'
import { gsap, SplitText, useGSAP } from '../lib/gsap'
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
      document.fonts.ready.then(() => {
        const split = SplitText.create('.contact-giant', {
          type: 'chars',
          aria: 'auto',
        })
        gsap.from(split.chars, {
          yPercent: 120,
          stagger: 0.03,
          duration: 1,
          ease: 'power4.out',
          scrollTrigger: { trigger: '.contact-giant', start: 'top 85%' },
        })
      })

      gsap.from('.contact-card, .contact-form', {
        y: 40,
        autoAlpha: 0,
        stagger: 0.12,
        duration: 0.8,
        scrollTrigger: { trigger: '.contact-grid', start: 'top 80%' },
      })
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
        <p className="section-index">05 — Contact</p>
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

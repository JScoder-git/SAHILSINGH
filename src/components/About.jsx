import { useRef } from 'react'
import { gsap, SplitText, useGSAP } from '../lib/gsap'
import { about, profile } from '../data'
import ProfilePicture from '../assets/Profile Picture.png'
import './About.css'

const About = () => {
  const sectionRef = useRef(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        document.fonts.ready.then(() => {
          const split = SplitText.create('.about-heading', {
            type: 'words,lines',
            aria: 'auto',
            mask: 'lines',
          })

          gsap.from(split.words, {
            yPercent: 120,
            stagger: 0.04,
            duration: 1,
            ease: 'power4.out',
            scrollTrigger: { trigger: '.about-heading', start: 'top 82%' },
          })
        })

        gsap.from('.about-photo img', {
          yPercent: 18,
          scale: 1.18,
          duration: 1.4,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.about-photo', start: 'top 80%' },
        })

        gsap.from('.about-photo', {
          clipPath: 'inset(18% 18% 18% 18%)',
          duration: 1.3,
          ease: 'power4.inOut',
          scrollTrigger: { trigger: '.about-photo', start: 'top 80%' },
        })

        gsap.from('.about-copy p', {
          y: 28,
          autoAlpha: 0,
          stagger: 0.12,
          duration: 0.8,
          scrollTrigger: { trigger: '.about-copy', start: 'top 80%' },
        })

        gsap.from('.about-chip', {
          y: 20,
          autoAlpha: 0,
          stagger: 0.06,
          duration: 0.55,
          scrollTrigger: { trigger: '.about-chips', start: 'top 88%' },
        })
      })

      return () => mm.revert()
    },
    { scope: sectionRef }
  )

  return (
    <section id="about" ref={sectionRef} className="section about">
      <div className="container">
        <div className="section-head">
          <div>
            <p className="section-index">01 — About</p>
            <h2 className="section-title">The work.</h2>
          </div>
          <p className="section-kicker">Systems, teams, and products that stay online when the network does not.</p>
        </div>

        <div className="about-grid">
          <div className="about-photo">
            <img src={ProfilePicture} alt={profile.name} />
            <span className="about-badge">Open to work</span>
          </div>

          <div className="about-copy">
            <h3 className="about-heading">{about.heading}</h3>
            {about.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}

            <div className="about-chips">
              {about.tags.map((tag) => (
                <span key={tag.label} className="about-chip">
                  <em>{tag.icon}</em>
                  {tag.label}
                </span>
              ))}
            </div>

            <div className="about-actions">
              <a href={`mailto:${profile.email}`} className="btn btn-primary" data-cursor="Mail">
                Get in touch
              </a>
              <a href={profile.linkedin} target="_blank" rel="noreferrer" className="btn btn-ghost" data-cursor="Open">
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About

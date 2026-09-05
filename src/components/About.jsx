import { useRef } from 'react'
import { gsap, ScrollTrigger, SplitText, useGSAP } from '../lib/gsap'
import { drift, revealHead, revealTrigger, revealUp, whenFontsReady } from '../lib/reveal'
import { about, profile } from '../data'
import ProfilePicture from '../assets/Profile Picture.png'
import './About.css'

const About = () => {
  const sectionRef = useRef(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const root = sectionRef.current
        let cleanup

        whenFontsReady(() => {
          const headCleanup = revealHead(root)

          const split = SplitText.create('.about-heading', {
            type: 'words,lines',
            aria: 'auto',
            mask: 'lines',
          })

          gsap.fromTo(
            split.words,
            { yPercent: 120 },
            {
              yPercent: 0,
              stagger: 0.04,
              duration: 1,
              ease: 'power4.out',
              scrollTrigger: revealTrigger('.about-heading', 'top 82%'),
            }
          )

          cleanup = () => {
            headCleanup()
            split.revert()
          }

          ScrollTrigger.refresh()
        })

        gsap.fromTo(
          '.about-photo',
          { clipPath: 'inset(18% 18% 18% 18%)' },
          {
            clipPath: 'inset(0% 0% 0% 0%)',
            duration: 1.3,
            ease: 'power4.inOut',
            scrollTrigger: revealTrigger('.about-photo', 'top 80%'),
          }
        )

        // Slow zoom-out on entry, then a continuous parallax inside the frame.
        gsap.fromTo(
          '.about-photo img',
          { scale: 1.18 },
          {
            scale: 1,
            duration: 1.4,
            ease: 'power3.out',
            scrollTrigger: revealTrigger('.about-photo', 'top 80%'),
          }
        )
        drift(root.querySelector('.about-photo img'), {
          from: -5,
          to: 5,
          trigger: root.querySelector('.about-photo'),
        })

        revealUp('.about-copy p', { trigger: '.about-copy', y: 28, stagger: 0.12, duration: 0.8, start: 'top 80%' })
        revealUp('.about-chip', { trigger: '.about-chips', y: 20, stagger: 0.06, duration: 0.55, start: 'top 88%' })
        revealUp('.about-actions > *', { trigger: '.about-actions', y: 20, stagger: 0.08, duration: 0.6, start: 'top 92%' })

        return () => cleanup?.()
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
              <span className="about-badge">Open to work</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About

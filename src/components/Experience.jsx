import { useRef } from 'react'
import { gsap, useGSAP } from '../lib/gsap'
import { revealTrigger, revealUp } from '../lib/reveal'
import { experiences } from '../data'
import './Experience.css'

const CARD_BITS = '.exp-top, .exp-period, h3, .exp-company, li, .exp-tech'

const Experience = () => {
  const sectionRef = useRef(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      const pin = sectionRef.current.querySelector('.exp-pin')
      const track = sectionRef.current.querySelector('.exp-track')
      const fill = sectionRef.current.querySelector('.exp-progress-fill')

      const getDistance = () => Math.max(0, track.scrollWidth - window.innerWidth)

      mm.add('(min-width: 901px) and (prefers-reduced-motion: no-preference)', () => {
        const scrollTween = gsap.to(track, {
          x: () => -getDistance(),
          ease: 'none',
          scrollTrigger: {
            trigger: pin,
            pin: true,
            scrub: 1,
            start: 'top top',
            end: () => `+=${getDistance() + window.innerHeight * 0.6}`,
            invalidateOnRefresh: true,
            anticipatePin: 1,
            onUpdate: (self) => {
              gsap.set(fill, { scaleX: self.progress })
            },
          },
        })

        // Cards react to the horizontal travel, so they animate both ways.
        gsap.utils.toArray('.exp-card').forEach((card) => {
          const tl = gsap.timeline({
            scrollTrigger: {
              containerAnimation: scrollTween,
              trigger: card,
              start: 'left 92%',
              toggleActions: 'play none none reverse',
            },
          })

          tl.fromTo(
            card,
            { autoAlpha: 0.25, scale: 0.96 },
            { autoAlpha: 1, scale: 1, duration: 0.6, ease: 'power3.out' }
          ).fromTo(
            card.querySelectorAll(CARD_BITS),
            { y: 26, autoAlpha: 0 },
            { y: 0, autoAlpha: 1, duration: 0.55, stagger: 0.05, ease: 'power3.out' },
            '-=0.4'
          )
        })
      })

      mm.add('(max-width: 900px)', () => {
        gsap.fromTo(
          '.exp-card',
          { y: 32, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            stagger: 0.1,
            duration: 0.7,
            ease: 'power3.out',
            scrollTrigger: revealTrigger(track, 'top 82%'),
          }
        )
      })

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        revealUp('.exp-head .section-index, .exp-head .section-title, .exp-head .section-kicker', {
          trigger: '.exp-head',
          y: 22,
          stagger: 0.08,
          duration: 0.65,
          start: 'top 90%',
        })
      })

      return () => mm.revert()
    },
    { scope: sectionRef }
  )

  return (
    <section id="experience" ref={sectionRef} className="experience">
      <div className="exp-pin">
        <div className="container exp-head">
          <div className="section-head">
            <div>
              <p className="section-index">03 — Experience</p>
              <h2 className="section-title">Selected roles.</h2>
            </div>
            <p className="section-kicker">Scroll sideways through the work — TUDOOR first, then the path in.</p>
          </div>
        </div>

        <div className="exp-viewport">
          <div className="exp-track">
            {experiences.map((exp) => (
              <article key={exp.index} className="exp-card">
                <div className="exp-top">
                  <div className={`exp-logo${exp.logoFit === 'contain' ? ' is-contain' : ''}`} style={{ background: exp.logoBg }}>
                    <img src={exp.logo} alt={`${exp.company} logo`} />
                  </div>
                  <div className="exp-meta">
                    <span className="exp-num">{exp.index}</span>
                    <span className="exp-type">{exp.type}</span>
                  </div>
                </div>
                <p className="exp-period">{exp.period}</p>
                <h3>{exp.role}</h3>
                <p className="exp-company">
                  {exp.company}
                  <span> · {exp.location}</span>
                </p>
                <ul>
                  {exp.description.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <div className="exp-tech">
                  {exp.tech.map((t) => (
                    <span key={t}>{t}</span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="container exp-progress" aria-hidden="true">
          <span>Scroll</span>
          <div className="exp-progress-bar">
            <div className="exp-progress-fill" />
          </div>
          <span>Roles</span>
        </div>
      </div>
    </section>
  )
}

export default Experience

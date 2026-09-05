import { useRef } from 'react'
import { gsap, ScrollTrigger, useGSAP } from '../lib/gsap'
import { revealHead, revealTrigger, whenFontsReady } from '../lib/reveal'
import { skillRows } from '../data'
import './Skills.css'

const Skills = () => {
  const sectionRef = useRef(null)

  useGSAP(
    () => {
      const root = sectionRef.current
      const mm = gsap.matchMedia()

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        let cleanup

        whenFontsReady(() => {
          cleanup = revealHead(root, 'top 88%')
          ScrollTrigger.refresh()
        })

        gsap.fromTo(
          '.skill-row',
          { y: 40, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            stagger: 0.12,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: revealTrigger(root, 'top 78%'),
          }
        )

        // Rows slide against each other as you scroll, in both directions.
        gsap.utils.toArray('.skill-row').forEach((row, i) => {
          gsap.fromTo(
            row,
            { xPercent: i % 2 ? 3 : -3 },
            {
              xPercent: i % 2 ? -3 : 3,
              ease: 'none',
              scrollTrigger: {
                trigger: root,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1,
              },
            }
          )
        })

        return () => cleanup?.()
      })

      return () => mm.revert()
    },
    { scope: sectionRef }
  )

  return (
    <section id="skills" ref={sectionRef} className="section skills">
      <div className="container">
        <div className="section-head">
          <div>
            <p className="section-index">02 — Stack</p>
            <h2 className="section-title">Tools I ship with.</h2>
          </div>
          <p className="section-kicker">Frontend, desktop, APIs, and the sync layer in between.</p>
        </div>
      </div>

      <div className="skill-rows">
        {skillRows.map((row, i) => (
          <div key={i} className={`skill-row ${i % 2 ? 'is-reverse' : ''}`}>
            <div className="skill-track">
              {[...row, ...row, ...row].map((item, idx) => (
                <span key={`${item}-${idx}`} className="skill-pill">
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Skills

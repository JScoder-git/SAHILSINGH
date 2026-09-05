import { useRef } from 'react'
import { gsap, useGSAP } from '../lib/gsap'
import { skillRows } from '../data'
import './Skills.css'

const Skills = () => {
  const sectionRef = useRef(null)

  useGSAP(
    () => {
      gsap.from('.skill-row', {
        y: 40,
        autoAlpha: 0,
        stagger: 0.12,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
      })
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

import { useRef } from 'react'
import { gsap, useGSAP } from '../lib/gsap'
import { projects } from '../data'
import './Projects.css'

const Projects = () => {
  const sectionRef = useRef(null)

  useGSAP(
    () => {
      const wrap = sectionRef.current.querySelector('.projects-scroll')
      const cards = gsap.utils.toArray(sectionRef.current.querySelectorAll('.project-card'))
      if (!wrap || cards.length < 2) return

      cards.forEach((card, i) => {
        const fromLeft = i % 2 === 1
        gsap.set(card, {
          zIndex: 10 + i,
          xPercent: i === 0 ? 0 : fromLeft ? -105 : 105,
          yPercent: 0,
          rotate: 0,
        })
      })

      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: wrap,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.65,
          invalidateOnRefresh: true,
        },
      })

      cards.forEach((card, i) => {
        if (i === 0) return

        const seated = cards[i - 1]
        const fromLeft = i % 2 === 1

        tl.to(
          card,
          {
            xPercent: 0,
            duration: 1,
            ease: 'power2.inOut',
          },
          i
        )

        tl.to(
          seated,
          {
            xPercent: fromLeft ? 115 : -115,
            yPercent: fromLeft ? -8 : -6,
            rotate: fromLeft ? 18 : -18,
            duration: 0.7,
            ease: 'power3.in',
          },
          i + 0.28
        )
      })
    },
    { scope: sectionRef }
  )

  return (
    <section id="projects" ref={sectionRef} className="projects">
      <div className="projects-scroll" style={{ '--cards': projects.length }}>
        <div className="projects-sticky">
          <div className="container">
            <div className="section-head">
              <div>
                <p className="section-index">04 — Projects</p>
                <h2 className="section-title">Selected work.</h2>
              </div>
              <p className="section-kicker">Live products, ERP systems, and an open-source sync engine.</p>
            </div>
          </div>

          <div className="projects-stack is-deck">
            {projects.map((project) => (
              <article key={project.title} className="project-card" style={{ '--accent': project.color }}>
                <div
                  className={`project-shot ${project.imageFit === 'contain' ? 'is-logo' : ''}`}
                  style={project.imageBg ? { background: project.imageBg } : undefined}
                >
                  {project.wordmark ? (
                    <div className="project-wordmark">
                      <strong>{project.wordmark}</strong>
                      <span>India</span>
                    </div>
                  ) : (
                    <img src={project.image} alt={project.title} />
                  )}
                </div>
                <div className="project-body">
                  <p className="project-sub">{project.subtitle}</p>
                  <h3>{project.title}</h3>
                  <p className="project-desc">{project.description}</p>
                  <ul>
                    {project.features.map((f) => (
                      <li key={f}>{f}</li>
                    ))}
                  </ul>
                  <div className="project-tech">
                    {project.tech.map((t) => (
                      <span key={t}>{t}</span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Projects

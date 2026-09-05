import { useRef } from 'react'
import { gsap, useGSAP } from '../lib/gsap'
import { projects } from '../data'
import './Projects.css'

const Projects = () => {
  const sectionRef = useRef(null)

  useGSAP(
    () => {
      const cards = gsap.utils.toArray('.project-card')

      cards.forEach((card, i) => {
        const img = card.querySelector('.project-shot img')
        if (img) {
          gsap.from(img, {
            scale: 1.12,
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: { trigger: card, start: 'top 80%' },
          })
        }

        if (i < cards.length - 1) {
          gsap.to(card, {
            scale: 0.94,
            autoAlpha: 0.45,
            ease: 'none',
            scrollTrigger: {
              trigger: cards[i + 1],
              start: 'top 85%',
              end: 'top 35%',
              scrub: true,
            },
          })
        }
      })
    },
    { scope: sectionRef }
  )

  return (
    <section id="projects" ref={sectionRef} className="section projects">
      <div className="container">
        <div className="section-head">
          <div>
            <p className="section-index">04 — Projects</p>
            <h2 className="section-title">Selected work.</h2>
          </div>
          <p className="section-kicker">Live products, ERP systems, and an open-source sync engine.</p>
        </div>

        <div className="projects-stack">
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
    </section>
  )
}

export default Projects

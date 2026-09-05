import { useRef } from 'react'
import { gsap, ScrollTrigger, SplitText, useGSAP } from '../lib/gsap'
import { revealHead } from '../lib/reveal'
import { projects } from '../data'
import './Projects.css'

const Projects = () => {
  const sectionRef = useRef(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      const cases = gsap.utils.toArray('.project-case')

      mm.add('(prefers-reduced-motion: reduce)', () => {
        gsap.set('.project-eyebrow, .project-title, .project-frame, .project-detail > *', {
          autoAlpha: 1,
          y: 0,
          yPercent: 0,
          clearProps: 'clipPath',
        })
      })

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const splits = []
        let headCleanup

        const build = () => {
          headCleanup = revealHead(sectionRef.current)

          cases.forEach((card) => {
            const eyebrow = card.querySelector('.project-eyebrow')
            const title = card.querySelector('.project-title')
            const frame = card.querySelector('.project-frame')
            const drift = card.querySelector('.project-frame:not(.is-logo) .project-frame-inner')
            const details = card.querySelectorAll('.project-detail > *')

            const split = SplitText.create(title, { type: 'chars', aria: 'auto', charsClass: 'p-char' })
            splits.push(split)

            // Replays on the way down and rewinds on the way back up.
            const tl = gsap.timeline({
              defaults: { ease: 'power3.out' },
              scrollTrigger: {
                trigger: card,
                start: 'top 80%',
                toggleActions: 'play none none reverse',
              },
            })

            tl.fromTo(eyebrow, { y: 18, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.55 })
              .fromTo(
                split.chars,
                { yPercent: 118, rotate: 4 },
                { yPercent: 0, rotate: 0, duration: 0.9, stagger: 0.022, ease: 'power4.out' },
                '-=0.3'
              )
              .fromTo(
                frame,
                { clipPath: 'inset(0 0 100% 0)' },
                { clipPath: 'inset(0 0 0% 0)', duration: 1.1, ease: 'power4.inOut' },
                '-=0.65'
              )
              .fromTo(
                details,
                { y: 22, autoAlpha: 0 },
                { y: 0, autoAlpha: 1, duration: 0.6, stagger: 0.08 },
                '-=0.7'
              )

            // Scroll-linked motion: runs continuously in both directions.
            if (drift) {
              gsap.fromTo(
                drift,
                { yPercent: -6 },
                {
                  yPercent: 6,
                  ease: 'none',
                  scrollTrigger: { trigger: frame, start: 'top bottom', end: 'bottom top', scrub: 0.9 },
                }
              )
            }

            gsap.fromTo(
              frame,
              { scale: 0.95 },
              {
                scale: 1,
                ease: 'none',
                scrollTrigger: { trigger: card, start: 'top 92%', end: 'top 45%', scrub: 1 },
              }
            )

            gsap.to(card.querySelector('.project-detail'), {
              y: -34,
              ease: 'none',
              scrollTrigger: { trigger: card, start: 'top 75%', end: 'bottom top', scrub: 1.2 },
            })
          })

          ScrollTrigger.refresh()
        }

        if (document.fonts?.status === 'loaded') build()
        else if (document.fonts?.ready) document.fonts.ready.then(build)
        else build()

        return () => {
          headCleanup?.()
          splits.forEach((s) => s.revert())
        }
      })

      return () => mm.revert()
    },
    { scope: sectionRef }
  )

  return (
    <section id="projects" ref={sectionRef} className="projects">
      <div className="container">
        <div className="section-head">
          <div>
            <p className="section-index">04 — Projects</p>
            <h2 className="section-title">Selected work.</h2>
          </div>
          <p className="section-kicker">Live products, ERP systems, and an open-source sync engine.</p>
        </div>
      </div>

      <div className="container">
        <div className="projects-stream">
          {projects.map((project, i) => (
            <article key={project.title} className="project-case" style={{ '--accent': project.color }}>
              <header className="project-head">
                <div className="project-eyebrow">
                  <span className="project-num">{String(i + 1).padStart(2, '0')}</span>
                  <span className="project-sub">{project.subtitle}</span>
                  {project.live || project.github ? (
                    <span className="project-links">
                      {project.live ? (
                        <a href={project.live} target="_blank" rel="noreferrer" data-cursor="Live">
                          Live
                        </a>
                      ) : null}
                      {project.github ? (
                        <a href={project.github} target="_blank" rel="noreferrer" data-cursor="Code">
                          Code
                        </a>
                      ) : null}
                    </span>
                  ) : null}
                </div>

                <div className="project-title-mask">
                  <h3 className="project-title">{project.title}</h3>
                </div>
              </header>

              <div className="project-grid">
                <div
                  className={`project-frame${project.imageFit === 'contain' ? ' is-logo' : ''}`}
                  style={project.imageBg ? { background: project.imageBg } : undefined}
                >
                  <div className="project-frame-inner">
                    {project.wordmark ? (
                      <div className="project-wordmark">
                        <strong>{project.wordmark}</strong>
                        <span>India</span>
                      </div>
                    ) : (
                      <img src={project.image} alt={project.title} />
                    )}
                  </div>
                </div>

                <div className="project-detail">
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
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Projects

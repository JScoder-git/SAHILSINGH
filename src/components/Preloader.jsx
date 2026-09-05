import { useRef, useState } from 'react'
import { gsap, useGSAP } from '../lib/gsap'
import './Preloader.css'

const Preloader = ({ onComplete }) => {
  const rootRef = useRef(null)
  const [count, setCount] = useState(0)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      mm.add('(prefers-reduced-motion: reduce)', () => {
        onComplete?.()
        gsap.set(rootRef.current, { display: 'none' })
      })

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const counter = { value: 0 }
        const tl = gsap.timeline({
          defaults: { ease: 'power3.inOut' },
          onComplete: () => {
            onComplete?.()
            gsap.set(rootRef.current, { display: 'none' })
          },
        })

        tl.to(counter, {
          value: 100,
          duration: 1.8,
          ease: 'power2.inOut',
          onUpdate: () => setCount(Math.round(counter.value)),
        })
          .to('.loader-count', { yPercent: -40, autoAlpha: 0, duration: 0.45 }, '+=0.08')
          .to('.loader-name span', { yPercent: 0, duration: 0.7, stagger: 0.08, ease: 'power4.out' }, '-=0.25')
          .to('.loader-panel', { yPercent: -100, duration: 0.95, stagger: 0.12, ease: 'expo.inOut' }, '+=0.28')
          .to(rootRef.current, { autoAlpha: 0, duration: 0.2 }, '-=0.2')
      })

      return () => mm.revert()
    },
    { scope: rootRef }
  )

  return (
    <div ref={rootRef} className="preloader" aria-hidden="true">
      <div className="loader-panel loader-panel-a" />
      <div className="loader-panel loader-panel-b" />
      <div className="loader-inner">
        <div className="loader-count">{String(count).padStart(3, '0')}</div>
        <div className="loader-name">
          <span>SAHIL</span>
          <span>SINGH</span>
        </div>
      </div>
    </div>
  )
}

export default Preloader

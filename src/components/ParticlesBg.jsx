import { useRef } from 'react'
import { gsap, useGSAP } from '../lib/gsap'
import './ParticlesBg.css'

const ParticlesBg = () => {
  const rootRef = useRef(null)

  useGSAP(
    () => {
      const x1 = gsap.quickTo('.orb-a', 'x', { duration: 1.6, ease: 'power2' })
      const y1 = gsap.quickTo('.orb-a', 'y', { duration: 1.6, ease: 'power2' })
      const x2 = gsap.quickTo('.orb-b', 'x', { duration: 2.1, ease: 'power2' })
      const y2 = gsap.quickTo('.orb-b', 'y', { duration: 2.1, ease: 'power2' })

      const onMove = (e) => {
        const nx = (e.clientX / window.innerWidth - 0.5) * 60
        const ny = (e.clientY / window.innerHeight - 0.5) * 60
        x1(nx)
        y1(ny)
        x2(-nx * 0.6)
        y2(-ny * 0.6)
      }

      window.addEventListener('mousemove', onMove)
      return () => window.removeEventListener('mousemove', onMove)
    },
    { scope: rootRef }
  )

  return (
    <div ref={rootRef} className="bg-field" aria-hidden="true">
      <div className="orb orb-a" />
      <div className="orb orb-b" />
    </div>
  )
}

export default ParticlesBg

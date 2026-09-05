import { useRef } from 'react'
import { gsap, useGSAP } from '../lib/gsap'
import './CustomCursor.css'

const CustomCursor = () => {
  const rootRef = useRef(null)
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const labelRef = useRef(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      mm.add('(hover: hover) and (pointer: fine)', () => {
        const xDot = gsap.quickTo(dotRef.current, 'x', { duration: 0.16, ease: 'power3' })
        const yDot = gsap.quickTo(dotRef.current, 'y', { duration: 0.16, ease: 'power3' })
        const xRing = gsap.quickTo(ringRef.current, 'x', { duration: 0.42, ease: 'power3' })
        const yRing = gsap.quickTo(ringRef.current, 'y', { duration: 0.42, ease: 'power3' })

        const onMove = (e) => {
          xDot(e.clientX)
          yDot(e.clientY)
          xRing(e.clientX)
          yRing(e.clientY)
        }

        const onOver = (e) => {
          const hot = e.target.closest('[data-cursor], a, button, .btn, input, textarea')
          if (hot) {
            const text = hot.getAttribute('data-cursor') || ''
            labelRef.current.textContent = text
            gsap.to(ringRef.current, {
              scale: text ? 2.4 : 1.8,
              backgroundColor: text ? 'rgba(212,255,90,0.16)' : 'transparent',
              duration: 0.35,
            })
            gsap.to(dotRef.current, { scale: 0.35, duration: 0.3 })
            gsap.to(labelRef.current, { autoAlpha: text ? 1 : 0, duration: 0.25 })
          } else {
            gsap.to(ringRef.current, { scale: 1, backgroundColor: 'transparent', duration: 0.35 })
            gsap.to(dotRef.current, { scale: 1, duration: 0.3 })
            gsap.to(labelRef.current, { autoAlpha: 0, duration: 0.2 })
          }
        }

        window.addEventListener('mousemove', onMove)
        window.addEventListener('mouseover', onOver)
        return () => {
          window.removeEventListener('mousemove', onMove)
          window.removeEventListener('mouseover', onOver)
        }
      })

      return () => mm.revert()
    },
    { scope: rootRef }
  )

  return (
    <div ref={rootRef} className="cursor-root" aria-hidden="true">
      <div className="cursor-dot" ref={dotRef} />
      <div className="cursor-ring" ref={ringRef}>
        <span className="cursor-label" ref={labelRef} />
      </div>
    </div>
  )
}

export default CustomCursor

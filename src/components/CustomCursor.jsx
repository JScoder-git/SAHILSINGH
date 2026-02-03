import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import './CustomCursor.css'

const CustomCursor = () => {
    const cursorDotRef = useRef(null)
    const cursorOutlineRef = useRef(null)

    useEffect(() => {
        const cursorDot = cursorDotRef.current
        const cursorOutline = cursorOutlineRef.current

        const moveCursor = (e) => {
            const posX = e.clientX
            const posY = e.clientY

            // Dot moves instantly
            gsap.to(cursorDot, {
                x: posX,
                y: posY,
                duration: 0.1,
                ease: "power2.out"
            })

            // Outline trails slightly
            gsap.to(cursorOutline, {
                x: posX,
                y: posY,
                duration: 0.5,
                ease: "power3.out"
            })
        }

        const handleHover = (e) => {
            const target = e.target
            const isClickable = target.closest('a, button, .btn, .tag, .expertise-tag, .project-card')

            if (isClickable) {
                gsap.to(cursorOutline, {
                    scale: 2.5,
                    backgroundColor: 'rgba(0, 255, 136, 0.1)',
                    borderColor: 'var(--primary)',
                    duration: 0.3
                })
                gsap.to(cursorDot, {
                    scale: 0.5,
                    opacity: 0.5,
                    duration: 0.3
                })
            } else {
                gsap.to(cursorOutline, {
                    scale: 1,
                    backgroundColor: 'transparent',
                    borderColor: 'rgba(255, 255, 255, 0.5)',
                    duration: 0.3
                })
                gsap.to(cursorDot, {
                    scale: 1,
                    opacity: 1,
                    duration: 0.3
                })
            }
        }

        window.addEventListener('mousemove', moveCursor)
        window.addEventListener('mouseover', handleHover)

        return () => {
            window.removeEventListener('mousemove', moveCursor)
            window.removeEventListener('mouseover', handleHover)
        }
    }, [])

    return (
        <>
            <div className="cursor-dot" ref={cursorDotRef}></div>
            <div className="cursor-outline" ref={cursorOutlineRef}></div>
        </>
    )
}

export default CustomCursor

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './Hero.css'

gsap.registerPlugin(ScrollTrigger)

const Hero = () => {
    const heroRef = useRef(null)
    const titleRef = useRef(null)
    const subtitleRef = useRef(null)
    const ctaRef = useRef(null)
    const floatingRef = useRef(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Create smooth reveal timeline
            const tl = gsap.timeline({ defaults: { ease: 'power4.out' } })

            tl.from('.hero-greeting', {
                opacity: 0,
                y: 30,
                duration: 1,
                delay: 0.2,
            })
                .from('.hero-name', {
                    opacity: 0,
                    y: 60,
                    duration: 1.5,
                }, '-=0.7')
                .from('.hero-title', {
                    opacity: 0,
                    y: 30,
                    duration: 1,
                }, '-=1')
                .from('.hero-description', {
                    opacity: 0,
                    y: 20,
                    duration: 1,
                }, '-=0.8')
                .from('.hero-cta', {
                    opacity: 0,
                    y: 20,
                    duration: 1,
                }, '-=0.8')
                .from('.hero-stats', {
                    opacity: 0,
                    y: 20,
                    duration: 1,
                }, '-=0.8')
                .from('.code-window', {
                    opacity: 0,
                    scale: 0.9,
                    x: 80,
                    rotateY: -20,
                    duration: 1.5,
                }, '-=1.5')

            // Floating elements
            gsap.to('.floating-code', {
                y: -15,
                x: 10,
                duration: 3,
                repeat: -1,
                yoyo: true,
                ease: 'sine.inOut',
                stagger: {
                    amount: 1,
                    from: "random"
                }
            })

            // Mouse movement parallax for orbs
            window.addEventListener('mousemove', (e) => {
                const { clientX, clientY } = e
                const xPos = (clientX / window.innerWidth - 0.5) * 40
                const yPos = (clientY / window.innerHeight - 0.5) * 40

                gsap.to('.glow-orb', {
                    x: xPos,
                    y: yPos,
                    duration: 1.5,
                    ease: "power2.out",
                    stagger: 0.1
                })
            })

            // Parallax effect on scroll
            gsap.to('.hero-content', {
                scrollTrigger: {
                    trigger: heroRef.current,
                    start: 'top top',
                    end: 'bottom top',
                    scrub: 1.5,
                },
                y: 150,
                opacity: 0,
                ease: 'none',
            })
        }, heroRef)

        return () => ctx.revert()
    }, [])

    return (
        <section id="hero" ref={heroRef} className="hero">
            <div className="hero-bg">
                <div className="glow-orb orb-1"></div>
                <div className="glow-orb orb-2"></div>
                <div className="grid-lines"></div>
            </div>

            <div className="floating-elements" ref={floatingRef}>
                <div className="floating-code code-1">{'<Developer />'}</div>
                <div className="floating-code code-2">{'{ React }'}</div>
                <div className="floating-code code-3">{'Electron.js'}</div>
                <div className="floating-code code-4">{'MongoDB'}</div>
                <div className="floating-code code-5">{'async/await'}</div>
            </div>

            <div className="container hero-container">
                <div className="hero-content" ref={titleRef}>
                    <p className="hero-greeting">
                        <span className="wave">👋</span> Hello, I'm
                    </p>

                    <h1 className="hero-name">
                        Sahil Singh<span className="dot">.</span>
                    </h1>

                    <h2 className="hero-title" ref={subtitleRef}>
                        <span className="title-line">Software Developer</span>
                        <span className="title-separator">—</span>
                        <span className="title-highlight">Offline-First Systems Expert</span>
                    </h2>

                    <p className="hero-description">
                        Building enterprise-grade, offline-first desktop and web applications
                        with <span className="highlight">React</span>, <span className="highlight">Electron.js</span>,
                        and <span className="highlight">PouchDB</span>. Specialized in real-time
                        data synchronization and secure IPC communication.
                    </p>

                    <div className="hero-cta" ref={ctaRef}>
                        <a href="#projects" className="btn btn-primary">
                            <span>View My Work</span>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M7 17L17 7M17 7H7M17 7V17" />
                            </svg>
                        </a>
                        <a href="#contact" className="btn btn-secondary">
                            <span>Let's Talk</span>
                        </a>
                    </div>

                    <div className="hero-stats">
                        <div className="stat">
                            <span className="stat-number">1.5+</span>
                            <span className="stat-label">Years Experience</span>
                        </div>
                        <div className="stat-divider"></div>
                        <div className="stat">
                            <span className="stat-number">5+</span>
                            <span className="stat-label">Major Projects</span>
                        </div>
                        <div className="stat-divider"></div>
                        <div className="stat">
                            <span className="stat-number">3</span>
                            <span className="stat-label">Companies</span>
                        </div>
                    </div>
                </div>

                <div className="hero-visual">
                    <div className="code-window">
                        <div className="window-header">
                            <div className="window-dots">
                                <span></span><span></span><span></span>
                            </div>
                            <span className="window-title">sahil.js</span>
                        </div>
                        <div className="window-content">
                            <pre><code>{`const developer = {
  name: "Sahil Singh",
  role: "Software Developer",
  location: "Chandigarh, India",
  skills: [
    "React.js", "Node.js",
    "Electron.js", "PouchDB"
  ],
  passion: "Building offline-first apps",
  available: true
};

export default developer;`}</code></pre>
                        </div>
                    </div>
                </div>
            </div>

            <div className="scroll-indicator">
                <span>Scroll to explore</span>
                <div className="scroll-line"></div>
            </div>
        </section>
    )
}

export default Hero

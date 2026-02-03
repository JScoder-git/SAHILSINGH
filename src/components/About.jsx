import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ProfilePicture from '../assets/Profile Picture.png'
import './About.css'

gsap.registerPlugin(ScrollTrigger)

const About = () => {
    const sectionRef = useRef(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from('.about-image-wrapper', {
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 80%',
                    toggleActions: 'play none none reverse',
                },
                x: -120,
                opacity: 0,
                duration: 1.2,
                ease: 'expo.out',
            })

            gsap.from('.about-content', {
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 80%',
                    toggleActions: 'play none none reverse',
                },
                x: 120,
                opacity: 0,
                duration: 1.2,
                ease: 'expo.out',
            })

            gsap.from('.expertise-tag', {
                scrollTrigger: {
                    trigger: '.expertise-tags',
                    start: 'top 85%',
                    toggleActions: 'play none none reverse',
                },
                y: 30,
                opacity: 0,
                duration: 0.6,
                stagger: 0.08,
                ease: 'power3.out',
            })

            // Parallax effect on image - smoother
            gsap.to('.about-image-wrapper', {
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: 2,
                },
                y: -80,
                ease: 'none',
            })
        }, sectionRef)

        return () => ctx.revert()
    }, [])

    const expertiseItems = [
        { icon: '🚀', label: 'Enterprise Apps' },
        { icon: '📡', label: 'Offline-First' },
        { icon: '⚡', label: 'Real-time' },
        { icon: '🔒', label: 'Secure IPC' },
        { icon: '🔄', label: 'Data Sync' },
        { icon: '💻', label: 'Desktop Apps' },
    ]

    return (
        <section id="about" ref={sectionRef} className="about">
            <div className="container">
                <div className="section-title">
                    <h2>About Me</h2>
                    <p>Passionate developer crafting offline-first solutions</p>
                </div>

                <div className="about-grid">
                    <div className="about-image-wrapper">
                        <div className="about-image">
                            <img src={ProfilePicture} alt="Sahil Singh" className="profile-img" />
                            <div className="image-border"></div>
                            <div className="image-glow"></div>
                        </div>
                        <div className="floating-badge">
                            <span className="badge-icon">💼</span>
                            <span className="badge-text">Open to Work</span>
                        </div>

                        <div className="about-cta">
                            <a href="mailto:sahilserrka058@gmail.com" className="btn btn-primary">
                                Get In Touch
                            </a>
                            <a href="https://www.linkedin.com/in/sahilserrka/" target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
                                LinkedIn Profile
                            </a>
                        </div>
                    </div>

                    <div className="about-content">
                        <h3>
                            Software Developer based in
                            <span className="text-gradient"> Chandigarh, India</span>
                        </h3>

                        <p>
                            I'm a passionate <strong>Software Developer</strong> with <strong>1.5+ years</strong> of
                            hands-on experience building enterprise-grade applications. I specialize in creating
                            <strong> offline-first desktop and web applications</strong> using React, Electron.js,
                            and PouchDB.
                        </p>

                        <p>
                            My journey spans from social media platforms to healthcare systems, always focusing on
                            <strong> scalable architecture</strong>, <strong>real-time synchronization</strong>, and
                            <strong> seamless user experiences</strong>. I love solving complex problems and turning
                            ideas into robust, production-ready solutions.
                        </p>

                        <div className="expertise-tags">
                            {expertiseItems.map((item, index) => (
                                <span key={index} className="expertise-tag">
                                    {item.icon} {item.label}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default About

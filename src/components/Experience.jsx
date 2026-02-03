import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './Experience.css'

gsap.registerPlugin(ScrollTrigger)

const Experience = () => {
    const sectionRef = useRef(null)

    const experiences = [
        {
            role: 'Software Developer (SDE-1)',
            company: 'PSquare Company',
            location: 'Mohali, India',
            period: 'Oct 2025 - Present',
            type: 'Full-time',
            description: [
                'Enhancing and maintaining a production ERP-based Electron desktop application',
                'Architected and optimized local database logic using PouchDB for high-volume data synchronization',
                'Implemented secure IPC communication between Electron main and renderer processes',
                'Designed and developed project monitoring and material tracking modules',
                'Improved performance and reliability for large-scale offline operations',
                'Ensured seamless online ↔ offline transitions for enterprise users',
                'Collaborated with cross-functional teams to deliver scalable and maintainable architecture',
            ],
            tech: ['Electron.js', 'React.js', 'Redux Toolkit', 'Node.js', 'PouchDB', 'Axios'],
        },
        {
            role: 'MERN Stack Developer (Intern → Full-Time)',
            company: 'PSquare Company',
            location: 'Mohali, India',
            period: 'May 2025 - Oct 2025',
            type: 'Intern to Full-Time',
            description: [
                'Contributed to the initial development of an offline-first ERP desktop system',
                'Assisted in building core PouchDB architecture for local data storage',
                'Helped set up Electron IPC channels for secure data exchange',
                'Integrated foundational task management and materials tracking modules',
                'Worked closely with senior developers following MERN best practices',
            ],
            tech: ['Electron.js', 'React.js', 'PouchDB', 'Node.js'],
        },
        {
            role: 'Full-Stack Developer Intern',
            company: 'Navodita Infotech',
            location: 'Pune, India',
            period: 'Dec 2023 - Feb 2024',
            type: 'Internship',
            description: [
                'Developed a full-scale social media application (JS:MEDIA) using MERN stack, increasing user engagement by 34%',
                'Implemented real-time chat and messaging using Socket.io for instant communication',
                'Built comprehensive social features including likes, comments, and friend request workflows',
                'Designed user profile management with profile picture uploads and authentication systems',
                'Optimized website performance using advanced caching strategies, reducing loading time by 40%',
            ],
            tech: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Socket.io', 'JWT'],
        },
        {
            role: 'Full-Stack Developer Intern',
            company: 'TripIt India',
            location: 'Delhi, India',
            period: 'Jun 2023 - Aug 2023',
            type: 'Internship',
            description: [
                'Spearheaded development of a feature-rich travel booking web application using MERN stack',
                'Implemented flight, hotel, transport, and tour booking modules with comprehensive search and filtering',
                'Integrated real-time pricing and availability APIs, increasing user satisfaction by 30%',
                'Developed secure authentication and authorization using JWT for protected user sessions',
                'Integrated payment gateway for secure transaction processing',
                'Enhanced mobile user engagement by 25% through responsive design implementation',
            ],
            tech: ['React.js', 'Redux', 'Node.js', 'MongoDB Atlas', 'JWT', 'Docker'],
        },
    ]

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Set initial visibility
            gsap.set('.experience-card', { opacity: 1, x: 0 })
            gsap.set('.timeline-dot', { scale: 1 })

            // Ultra-slowed timeline line fill
            gsap.from('.timeline-line-fill', {
                scrollTrigger: {
                    trigger: '.experience-timeline',
                    start: 'top 50%',
                    end: 'bottom 20%', // Ends much later for a slower effect
                    scrub: 2, // Even higher scrub for a very smooth/delayed feel
                },
                scaleY: 0,
                transformOrigin: 'top',
            })

            // Animate experience cards entrance
            gsap.from('.experience-card', {
                scrollTrigger: {
                    trigger: '.experience-timeline',
                    start: 'top 80%',
                    once: true,
                },
                x: (i) => (i % 2 === 0 ? -80 : 80),
                opacity: 0,
                duration: 0.8,
                stagger: 0.2,
                ease: 'power3.out',
            })

            // Dynamic glow for dots as the line passes them
            const cards = document.querySelectorAll('.experience-card')
            cards.forEach((card) => {
                const dot = card.querySelector('.timeline-dot')

                ScrollTrigger.create({
                    trigger: card,
                    start: 'top 55%', // Trigger when the top of the card passes 55% of the viewport (matches line tip)
                    onEnter: () => dot.classList.add('active'),
                    onLeaveBack: () => dot.classList.remove('active'),
                })
            })
        }, sectionRef)

        return () => ctx.revert()
    }, [])

    return (
        <section id="experience" ref={sectionRef} className="experience">
            <div className="container">
                <div className="section-title">
                    <h2>Work Experience</h2>
                    <p>My professional journey in software development</p>
                </div>

                <div className="experience-timeline">
                    <div className="timeline-line">
                        <div className="timeline-line-fill"></div>
                    </div>

                    {experiences.map((exp, index) => (
                        <div
                            key={index}
                            className={`experience-card glass-card ${index % 2 === 0 ? 'left' : 'right'}`}
                        >
                            <div className="timeline-dot">
                                <span className="dot-inner"></span>
                            </div>

                            <div className="card-header">
                                <span className="exp-type">{exp.type}</span>
                                <span className="exp-period">{exp.period}</span>
                            </div>

                            <h3 className="exp-role">{exp.role}</h3>
                            <p className="exp-company">
                                {exp.company} <span className="separator">•</span> {exp.location}
                            </p>

                            <ul className="exp-description">
                                {exp.description.map((item, i) => (
                                    <li key={i}>{item}</li>
                                ))}
                            </ul>

                            <div className="exp-tech">
                                {exp.tech.map((tech, i) => (
                                    <span key={i} className="tech-pill">{tech}</span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Experience

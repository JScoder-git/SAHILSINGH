import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './Projects.css'

// Import project images - High quality mockups
import erpImage from '../assets/erp_mockup.png'
import gexusImage from '../assets/gexus_mockup.png'
import rescueImage from '../assets/rescue_mockup.png'
import codeJettImage from '../assets/codejett_mockup.png'
import inventoryImage from '../assets/inventory_mockup.png'

gsap.registerPlugin(ScrollTrigger)

const Projects = () => {
    const sectionRef = useRef(null)

    const projects = [
        {
            title: 'Enterprise Construction ERP',
            subtitle: 'Electron + MERN Stack',
            description: 'Offline-first desktop application for enterprise-scale construction project management with real-time collaboration.',
            features: [
                'PouchDB Offline-first sync',
                'Secure IPC role access control',
                'Socket.io Real-time updates',
                'Inventory management workflows',
            ],
            tech: ['Electron.js', 'React.js', 'PouchDB', 'Socket.io', 'Node.js'],
            image: erpImage,
            color: '#00ff88',
        },
        {
            title: 'Gexus Gaming Marketplace',
            subtitle: 'September 2024 – November 2024',
            description: 'Comprehensive gaming marketplace platform enabling users to buy, sell, rent, and trade gaming accounts.',
            features: [
                'Robust verification systems',
                'Instant messaging via Socket.io',
                'GSAP responsive animations',
                'RESTful API architecture',
            ],
            tech: ['React.js', 'Node.js', 'MongoDB', 'Socket.io', 'GSAP'],
            image: gexusImage,
            color: '#6366f1',
        },
        {
            title: 'Rescue Point Healthcare',
            subtitle: 'September 2023 – November 2023',
            description: 'Healthcare platform connecting hospitals to share critical resources like organs, medicines, and machinery.',
            features: [
                'Increased transplants by 15%',
                '21% reduced medicine wait times',
                'Connected 23+ hospitals',
                'Secure medical data protocols',
            ],
            tech: ['React.js', 'Node.js', 'MongoDB', 'Express.js'],
            image: rescueImage,
            color: '#f472b6',
            github: 'https://github.com/JScoder-git/BFCT-Hackathon',
        },
        {
            title: 'Code Jett Platform',
            subtitle: 'March 2024 – Present',
            description: 'Revolutionary platform transforming real-time code collaboration with WebSocket synchronization.',
            features: [
                'WebSocket code sync',
                '19% productivity boost',
                'Multi-language execution',
                '66% enhanced collaboration',
            ],
            tech: ['React.js', 'WebSocket', 'Node.js', 'Monaco Editor'],
            image: codeJettImage,
            color: '#00d4ff',
            github: 'https://github.com/JScoder-git/Hackistica-24-',
        },
        {
            title: 'Inventory & Reporting',
            subtitle: 'React + jsPDF',
            description: 'Comprehensive inventory workflows with real-time data updates and automated analytical reporting.',
            features: [
                'Real-time data updates',
                'jsPDF Automated reporting',
                'Multi-user inventory tracking',
                'Inventory analytics & auditing',
            ],
            tech: ['React.js', 'jsPDF', 'Node.js', 'MongoDB'],
            image: inventoryImage,
            color: '#ffa500',
        },
    ]

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Set initial visibility
            gsap.set('.project-card', { opacity: 1 })

            // Ultra-smooth 3D hover effect on cards
            const cards = document.querySelectorAll('.project-card')
            cards.forEach(card => {
                card.addEventListener('mousemove', (e) => {
                    const rect = card.getBoundingClientRect()
                    const x = e.clientX - rect.left
                    const y = e.clientY - rect.top
                    const centerX = rect.width / 2
                    const centerY = rect.height / 2
                    const rotateX = (y - centerY) / 50 // Reduced sensitivity
                    const rotateY = (centerX - x) / 50

                    gsap.to(card, {
                        rotateX: rotateX,
                        rotateY: rotateY,
                        transformPerspective: 1200,
                        duration: 0.5,
                        ease: 'power2.out',
                    })
                })

                card.addEventListener('mouseleave', () => {
                    gsap.to(card, {
                        rotateX: 0,
                        rotateY: 0,
                        duration: 0.8,
                        ease: 'expo.out',
                    })
                })
            })
        }, sectionRef)

        return () => ctx.revert()
    }, [])

    return (
        <section id="projects" ref={sectionRef} className="projects">
            <div className="container">
                <div className="section-title">
                    <h2>Featured Projects</h2>
                    <p>Some of my notable works and contributions</p>
                </div>

                <div className="projects-grid">
                    {projects.map((project, index) => (
                        <div key={index} className="project-card-wrapper">
                            <div
                                className="project-card"
                                style={{ '--accent-color': project.color }}
                            >
                                <div className="project-image">
                                    <div className="project-image-bg"></div>
                                    <img src={project.image} alt={project.title} className="project-screenshot" />
                                    <div className="project-overlay"></div>
                                </div>

                                <div className="project-content">
                                    <div className="project-header">
                                        <span className="project-subtitle">{project.subtitle}</span>
                                        <h3 className="project-title">{project.title}</h3>
                                    </div>

                                    <p className="project-description">{project.description}</p>

                                    <ul className="project-features">
                                        {project.features.map((feature, i) => (
                                            <li key={i}>{feature}</li>
                                        ))}
                                    </ul>

                                    <div className="project-tech">
                                        {project.tech.map((tech, i) => (
                                            <span key={i} className="tech-tag">{tech}</span>
                                        ))}
                                    </div>

                                    {project.github && (
                                        <div className="project-links">
                                            <a href={project.github} target="_blank" rel="noopener noreferrer" className="project-link primary">
                                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                                                </svg>
                                                View Source
                                            </a>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Projects

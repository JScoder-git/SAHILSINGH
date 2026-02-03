import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
    SiJavascript, SiTypescript, SiReact, SiNodedotjs, SiExpress,
    SiMongodb, SiRedux, SiElectron, SiSocketdotio, SiGit,
    SiDocker, SiPython, SiHtml5, SiCss3, SiFigma, SiGithub,
    SiCplusplus, SiPostman, SiJsonwebtokens, SiRabbitmq, SiFlutter
} from 'react-icons/si'
import { FaJava } from 'react-icons/fa'
import { BiChart } from 'react-icons/bi'
import './Skills.css'

gsap.registerPlugin(ScrollTrigger)

const Skills = () => {
    const sectionRef = useRef(null)

    const skills = [
        // Languages
        { name: 'JavaScript', icon: SiJavascript, color: '#F7DF1E', size: 85, radius: 160, speed: 20 },
        { name: 'TypeScript', icon: SiTypescript, color: '#3178C6', size: 75, radius: 175, speed: 22 },
        { name: 'C++', icon: SiCplusplus, color: '#00599C', size: 70, radius: 365, speed: 60 },
        { name: 'Java', icon: FaJava, color: '#007396', size: 72, radius: 340, speed: 52 },
        { name: 'Python', icon: SiPython, color: '#3776AB', size: 74, radius: 230, speed: 27 },
        // Frontend
        { name: 'React', icon: SiReact, color: '#61DAFB', size: 90, radius: 200, speed: 25 },
        { name: 'Redux', icon: SiRedux, color: '#764ABC', size: 70, radius: 185, speed: 24 },
        { name: 'HTML5', icon: SiHtml5, color: '#E34F26', size: 66, radius: 335, speed: 50 },
        { name: 'CSS3', icon: SiCss3, color: '#1572B6', size: 66, radius: 310, speed: 42 },
        { name: 'Chart.js', icon: BiChart, color: '#FF6384', size: 58, radius: 290, speed: 46 },
        // Backend
        { name: 'Node.js', icon: SiNodedotjs, color: '#339933', size: 80, radius: 240, speed: 30 },
        { name: 'Express', icon: SiExpress, color: '#ffffff', size: 68, radius: 255, speed: 32 },
        // Desktop
        { name: 'Electron', icon: SiElectron, color: '#47848F', size: 82, radius: 215, speed: 28 },
        // Databases
        { name: 'MongoDB', icon: SiMongodb, color: '#47A248', size: 78, radius: 270, speed: 35 },
        // Real-time
        { name: 'Socket.io', icon: SiSocketdotio, color: '#ffffff', size: 64, radius: 280, speed: 38 },
        { name: 'RabbitMQ', icon: SiRabbitmq, color: '#FF6600', size: 62, radius: 300, speed: 44 },
        // Tools
        { name: 'Git', icon: SiGit, color: '#F05032', size: 72, radius: 295, speed: 40 },
        { name: 'GitHub', icon: SiGithub, color: '#ffffff', size: 70, radius: 250, speed: 33 },
        { name: 'Docker', icon: SiDocker, color: '#2496ED', size: 76, radius: 320, speed: 45 },
        { name: 'Postman', icon: SiPostman, color: '#FF6C37', size: 60, radius: 330, speed: 48 },
        { name: 'Figma', icon: SiFigma, color: '#F24E1E', size: 62, radius: 350, speed: 55 },
        { name: 'Flutter', icon: SiFlutter, color: '#02569B', size: 65, radius: 360, speed: 58 },
        { name: 'JWT', icon: SiJsonwebtokens, color: '#ffffff', size: 58, radius: 265, speed: 36 },
    ]

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Entrance animation
            gsap.from('.skill-planet', {
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 80%',
                    once: true,
                },
                scale: 0,
                opacity: 0,
                duration: 0.6,
                stagger: {
                    each: 0.04,
                    from: 'random',
                },
                ease: 'back.out(2)',
            })

            // Orbital animation using CSS custom property
            document.querySelectorAll('.orbit-wrapper').forEach((wrapper, i) => {
                const skill = skills[i]
                gsap.to(wrapper, {
                    rotation: 360,
                    duration: skill.speed,
                    repeat: -1,
                    ease: 'none',
                })
            })

            // Counter-rotate the icon to keep it upright
            document.querySelectorAll('.skill-planet').forEach((planet, i) => {
                const skill = skills[i]
                gsap.to(planet, {
                    rotation: -360,
                    duration: skill.speed,
                    repeat: -1,
                    ease: 'none',
                })
            })
        }, sectionRef)

        return () => ctx.revert()
    }, [])

    return (
        <section id="skills" ref={sectionRef} className="skills">
            <div className="container">
                <div className="section-title">
                    <h2>Skills & Expertise</h2>
                    <p>Technologies I work with to bring ideas to life</p>
                </div>

                <div className="skills-orbit-container">
                    {/* Center */}
                    <div className="orbit-center">
                        <span>SS</span>
                    </div>

                    {/* Skill Planets with orbit wrappers */}
                    {skills.map((skill, index) => {
                        const Icon = skill.icon
                        const startAngle = (index / skills.length) * 360

                        return (
                            <div
                                key={index}
                                className="orbit-wrapper"
                                style={{
                                    transform: `rotate(${startAngle}deg)`,
                                }}
                            >
                                <div
                                    className="skill-planet"
                                    style={{
                                        width: skill.size,
                                        height: skill.size,
                                        transform: `translateX(${skill.radius}px) rotate(-${startAngle}deg)`,
                                    }}
                                    title={skill.name}
                                >
                                    <Icon size={skill.size * 0.5} color={skill.color} />
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}

export default Skills

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './Contact.css'
import { FaLinkedin, FaGithub, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa'

gsap.registerPlugin(ScrollTrigger)

const Contact = () => {
    const sectionRef = useRef(null)
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    })
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [status, setStatus] = useState({ type: '', message: '' })

    const contactInfo = [
        {
            icon: <FaEnvelope />,
            label: 'Email',
            value: 'sahilserrka058@gmail.com',
            link: 'mailto:sahilserrka058@gmail.com',
        },
        {
            icon: <FaMapMarkerAlt />,
            label: 'Location',
            value: 'Chandigarh, India',
            link: null,
        },
    ]

    const socialLinks = [
        {
            name: 'LinkedIn',
            url: 'https://www.linkedin.com/in/sahilserrka/',
            icon: <FaLinkedin />,
        },
        {
            name: 'GitHub',
            url: 'https://github.com/JScoder-git',
            icon: <FaGithub />,
        },
    ]

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from('.contact-info-card', {
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 70%',
                    toggleActions: 'play none none reverse',
                },
                x: -80,
                opacity: 0,
                duration: 0.8,
                ease: 'power3.out',
            })

            gsap.from('.contact-form-wrapper', {
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 70%',
                    toggleActions: 'play none none reverse',
                },
                x: 80,
                opacity: 0,
                duration: 0.8,
                ease: 'power3.out',
            })

            gsap.from('.contact-info-item', {
                scrollTrigger: {
                    trigger: '.contact-info-card',
                    start: 'top 80%',
                    toggleActions: 'play none none reverse',
                },
                y: 30,
                opacity: 0,
                duration: 0.5,
                stagger: 0.15,
                ease: 'power3.out',
            })
        }, sectionRef)

        return () => ctx.revert()
    }, [])

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsSubmitting(true)
        setStatus({ type: '', message: '' })

        try {
            // Using FormSubmit.co - FREE, no registration needed
            // Emails will be sent directly to sahilserrka058@gmail.com
            const response = await fetch('https://formsubmit.co/ajax/sahilserrka058@gmail.com', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    subject: formData.subject,
                    message: formData.message,
                    _subject: `Portfolio Contact: ${formData.subject}`,
                })
            })

            if (response.ok) {
                setStatus({ type: 'success', message: 'Message sent successfully! I\'ll get back to you soon.' })
                setFormData({ name: '', email: '', subject: '', message: '' })
            } else {
                throw new Error('Failed to send')
            }
        } catch (error) {
            console.error('Form Error:', error)
            setStatus({ type: 'error', message: 'Failed to send. Please email me directly at sahilserrka058@gmail.com' })
        } finally {
            setIsSubmitting(false)
        }
    }

    // Auto dismiss toast after 5 seconds
    useEffect(() => {
        if (status.message) {
            const timer = setTimeout(() => {
                setStatus({ type: '', message: '' })
            }, 5000)
            return () => clearTimeout(timer)
        }
    }, [status])

    return (
        <section id="contact" ref={sectionRef} className="contact">
            {/* Custom Toast Notification */}
            {status.message && (
                <div className={`toast-notification ${status.type}`}>
                    <div className="toast-icon">
                        {status.type === 'success' ? '✅' : '❌'}
                    </div>
                    <div className="toast-content">
                        <span className="toast-title">
                            {status.type === 'success' ? 'Success!' : 'Oops!'}
                        </span>
                        <span className="toast-message">{status.message}</span>
                    </div>
                    <button
                        className="toast-close"
                        onClick={() => setStatus({ type: '', message: '' })}
                    >
                        ✕
                    </button>
                </div>
            )}

            <div className="container">
                <div className="section-title">
                    <h2>Get In Touch</h2>
                    <p>Have a project in mind? Let's build something amazing together</p>
                </div>

                <div className="contact-grid">
                    <div className="contact-info-card glass-card">
                        <h3>Let's Connect</h3>
                        <p>
                            I'm currently open to new opportunities and collaborations.
                            Whether you have a project idea or just want to say hi,
                            feel free to reach out!
                        </p>

                        <div className="contact-info-list">
                            {contactInfo.map((info, index) => (
                                <div key={index} className="contact-info-item">
                                    <span className="info-icon">{info.icon}</span>
                                    <div className="info-content">
                                        <span className="info-label">{info.label}</span>
                                        {info.link ? (
                                            <a href={info.link} className="info-value">{info.value}</a>
                                        ) : (
                                            <span className="info-value">{info.value}</span>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="social-links">
                            <span className="social-label">Find me on</span>
                            <div className="social-icons">
                                {socialLinks.map((social, index) => (
                                    <a
                                        key={index}
                                        href={social.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="social-link"
                                        aria-label={social.name}
                                    >
                                        {social.icon}
                                    </a>
                                ))}
                            </div>
                        </div>

                        <div className="availability-badge">
                            <span className="status-dot"></span>
                            Available for freelance & full-time roles
                        </div>
                    </div>

                    <div className="contact-form-wrapper">
                        <form onSubmit={handleSubmit} className="contact-form glass-card">
                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="name">Your Name</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="John Doe"
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email">Your Email</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="john@example.com"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="subject">Subject</label>
                                <input
                                    type="text"
                                    id="subject"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    placeholder="Project Inquiry"
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="message">Message</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    placeholder="Tell me about your project..."
                                    rows="5"
                                    required
                                ></textarea>
                            </div>

                            <button type="submit" className="btn btn-primary submit-btn" disabled={isSubmitting}>
                                {isSubmitting ? (
                                    <>
                                        <span className="spinner"></span>
                                        Sending...
                                    </>
                                ) : (
                                    <>
                                        Send Message
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <line x1="22" y1="2" x2="11" y2="13"></line>
                                            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                                        </svg>
                                    </>
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Contact

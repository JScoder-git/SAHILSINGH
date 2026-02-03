import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import './Navbar.css'

const Navbar = () => {
    const navRef = useRef(null)
    const [isScrolled, setIsScrolled] = useState(false)
    const [menuOpen, setMenuOpen] = useState(false)

    const navLinks = [
        { name: 'Home', href: '#hero' },
        { name: 'About', href: '#about' },
        { name: 'Skills', href: '#skills' },
        { name: 'Experience', href: '#experience' },
        { name: 'Projects', href: '#projects' },
        { name: 'Contact', href: '#contact' },
    ]

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50)
        }
        window.addEventListener('scroll', handleScroll)

        // Animate navbar on load
        gsap.from(navRef.current, {
            y: -100,
            opacity: 0,
            duration: 1,
            ease: 'power3.out',
            delay: 0.5,
        })

        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const handleNavClick = (e, href) => {
        e.preventDefault()
        setMenuOpen(false)
        const element = document.querySelector(href)
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' })
        }
    }

    return (
        <nav ref={navRef} className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
            <div className="nav-container">
                <a href="#hero" className="nav-logo" onClick={(e) => handleNavClick(e, '#hero')}>
                    <span className="logo-text">SS</span>
                    <span className="logo-dot"></span>
                </a>

                <div className={`nav-menu ${menuOpen ? 'active' : ''}`}>
                    {navLinks.map((link, index) => (
                        <a
                            key={link.name}
                            href={link.href}
                            className="nav-link"
                            onClick={(e) => handleNavClick(e, link.href)}
                            style={{ animationDelay: `${index * 0.1}s` }}
                        >
                            <span className="link-number">0{index + 1}.</span>
                            {link.name}
                        </a>
                    ))}
                    <a href="/resume.pdf" className="btn btn-primary nav-cta" target="_blank">
                        Resume
                    </a>
                </div>

                <button
                    className={`nav-toggle ${menuOpen ? 'active' : ''}`}
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label="Toggle menu"
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
            </div>
        </nav>
    )
}

export default Navbar

import './Footer.css'

const Footer = () => {
    const currentYear = new Date().getFullYear()

    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-content">
                    <div className="footer-brand">
                        <a href="#hero" className="footer-logo">
                            <span className="logo-text">SS</span>
                            <span className="logo-dot"></span>
                        </a>
                        <p>Building offline-first solutions for the modern web.</p>
                    </div>

                    <div className="footer-links">
                        <div className="link-column">
                            <h4>Navigation</h4>
                            <a href="#about">About</a>
                            <a href="#skills">Skills</a>
                            <a href="#experience">Experience</a>
                            <a href="#projects">Projects</a>
                        </div>
                        <div className="link-column">
                            <h4>Connect</h4>
                            <a href="mailto:sahilserrka058@gmail.com">Email</a>
                            <a href="https://www.linkedin.com/in/sahilserrka/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                            <a href="https://github.com/JScoder-git" target="_blank" rel="noopener noreferrer">GitHub</a>
                        </div>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p>
                        © {currentYear} Sahil Singh. All rights reserved.
                    </p>
                    <p className="footer-tagline">
                        Designed & Built with <span className="heart">❤</span> using React + GSAP
                    </p>
                </div>
            </div>
        </footer>
    )
}

export default Footer

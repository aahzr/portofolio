import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import './Navbar.css'

export default function Navbar() {
  const navRef = useRef(null)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const nav = navRef.current
    gsap.fromTo(nav,
      { y: -30, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, delay: 0.2, ease: 'power3.out' }
    )

    const handleScroll = () => {
      if (window.scrollY > 50) {
        nav.classList.add('scrolled')
      } else {
        nav.classList.remove('scrolled')
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <>
      <nav className="navbar" ref={navRef}>
        <div className="navbar-inner container">
          <a href="#" className="navbar-logo">ELITECH.</a>
          <div className="navbar-right">
            <div className="navbar-links">
              <a href="#" className="navbar-link">Home</a>
              <span className="navbar-separator"></span>
              <a href="#team" className="navbar-link">Team</a>
              <span className="navbar-separator"></span>
              <a href="#services" className="navbar-link">Services</a>
              <span className="navbar-separator"></span>
              <a href="#works" className="navbar-link">Works</a>
              <span className="navbar-separator"></span>
              <a href="#contact" className="navbar-link">Contact</a>
            </div>
            <button className="navbar-menu" aria-label="Open menu" onClick={toggleMobileMenu}>
              <span className={`navbar-menu-icon ${isMobileMenuOpen ? 'open' : ''}`}>
                <span></span>
                <span></span>
              </span>
              <span className="navbar-menu-text">{isMobileMenuOpen ? 'CLOSE' : 'MENU'}</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`mobile-menu-overlay ${isMobileMenuOpen ? 'open' : ''}`}>
        <div className="mobile-menu-links">
          <a href="#" className="mobile-menu-link" onClick={toggleMobileMenu}>Home</a>
          <a href="#team" className="mobile-menu-link" onClick={toggleMobileMenu}>Team</a>
          <a href="#services" className="mobile-menu-link" onClick={toggleMobileMenu}>Services</a>
          <a href="#works" className="mobile-menu-link" onClick={toggleMobileMenu}>Works</a>
          <a href="#contact" className="mobile-menu-link" onClick={toggleMobileMenu}>Contact</a>
        </div>
      </div>
    </>
  )
}

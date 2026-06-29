import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import ChromaticWave from './ChromaticWave'
import './Hero.css'

export default function Hero() {
  const heroRef = useRef(null)
  const titleRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.5 })

      tl.fromTo('.hero-side-left',
        { x: -60, opacity: 0 },
        { x: 0, opacity: 1, duration: 1, ease: 'power3.out' }
      )
      .fromTo('.hero-title-line',
        { y: 80, opacity: 0, skewY: 5 },
        { y: 0, opacity: 1, skewY: 0, duration: 0.9, stagger: 0.15, ease: 'power3.out' },
        '-=0.6'
      )
      .fromTo('.hero-side-right',
        { x: 60, opacity: 0 },
        { x: 0, opacity: 1, duration: 1, ease: 'power3.out' },
        '-=0.6'
      )
      .fromTo('.hero-wave-wrapper',
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.2, ease: 'power3.out' },
        '-=0.8'
      )
    }, heroRef)

    return () => ctx.revert()
  }, [])

  const handleMouseMove = (e) => {
    if (!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Absolute position for the background grid mask
    heroRef.current.style.setProperty('--mouse-x', `${x}px`);
    heroRef.current.style.setProperty('--mouse-y', `${y}px`);
    
    // Normalized position (-1 to 1) for the 3D wave parallax
    const normalizedX = (x / rect.width) * 2 - 1;
    const normalizedY = (y / rect.height) * 2 - 1;
    heroRef.current.style.setProperty('--parallax-x', normalizedX);
    heroRef.current.style.setProperty('--parallax-y', normalizedY);
  };

  return (
    <section className="hero section" ref={heroRef} onMouseMove={handleMouseMove}>
      <div className="hero-content container">
        {/* Left Side Text */}
        <div className="hero-side-left">
          <span className="asterisks">✱ ✱ ✱</span>
          <p className="hero-side-text">
            We specialize in
            <br />transforming ideas
            <br />with a full suite of services.
          </p>
        </div>

        {/* Center Title */}
        <div className="hero-center" ref={titleRef}>
          <div className="hero-title">
            <div className="hero-title-line" style={{ zIndex: 1 }}>
              <span className="heading-display hero-title-we">WE'RE</span>
            </div>
            <div className="hero-title-line" style={{ zIndex: 2 }}>
              <span className="heading-display-italic text-3d-gold hero-title-name">ELITECH</span>
            </div>
            <div className="hero-title-line" style={{ zIndex: 0 }}>
              <span className="heading-display hero-title-role">TEAM</span>
            </div>
          </div>

          {/* Chromatic Wave */}
          <div className="hero-wave-wrapper">
            <ChromaticWave />
          </div>
        </div>

        {/* Right Side Text */}
        <div className="hero-side-right">
          <span className="asterisks">✱ ✱ ✱</span>
          <p className="hero-side-text">
            From boosting online presence
            <br />to crafting memorable user
            <br />experiences.
          </p>
        </div>
      </div>
    </section>
  )
}

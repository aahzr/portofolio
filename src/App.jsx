import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Team from './components/Team'
import Statement from './components/Statement'
import Services from './components/Services'
import Showcase from './components/Showcase'
import Footer from './components/Footer'

gsap.registerPlugin(ScrollTrigger)

function App() {
  useEffect(() => {
    // Mouse tracking for grid overlay cursor effect
    const root = document.documentElement
    const handleMouseMove = (e) => {
      root.style.setProperty('--mouse-x', e.clientX + 'px')
      root.style.setProperty('--mouse-y', e.clientY + 'px')
    }
    window.addEventListener('mousemove', handleMouseMove)

    // Global GSAP scroll animations
    const revealElements = document.querySelectorAll('.reveal')
    revealElements.forEach((el) => {
      gsap.fromTo(el,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none none',
          }
        }
      )
    })

    // Staggered reveals for groups
    const staggerGroups = document.querySelectorAll('.reveal-stagger')
    staggerGroups.forEach((group) => {
      const children = group.children
      gsap.fromTo(children,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: group,
            start: 'top 85%',
            toggleActions: 'play none none none',
          }
        }
      )
    })

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      ScrollTrigger.getAll().forEach(t => t.kill())
    }
  }, [])

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Team />
        <Statement />
        <Services />
        <Showcase />
      </main>
      <Footer />
    </>
  )
}

export default App

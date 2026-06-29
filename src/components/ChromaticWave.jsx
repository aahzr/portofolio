import { useEffect, useRef } from 'react'
import './ChromaticWave.css'

export default function ChromaticWave() {
  const svgRef = useRef(null)
  
  // Track mouse in SVG coordinate space
  const mouse = useRef({ x: -1000, y: -1000, radius: 450 }) // Expanded radius for a broader, softer interaction

  // Base coordinates of the wave path (10 control/anchor points)
  const basePoints = [
    { x: 0, y: 200 },
    { x: 180, y: 80 },
    { x: 360, y: 288 },
    { x: 540, y: 160 },
    { x: 720, y: 32 },
    { x: 900, y: 320 },
    { x: 1080, y: 192 },
    { x: 1260, y: 64 },
    { x: 1350, y: 256 },
    { x: 1440, y: 200 },
  ]

  // Current physical points mutated by physics loop
  const currentPoints = useRef(basePoints.map(p => ({ ...p })))
  
  // The specific Y-offset for each of the 8 layers
  const layerOffsets = [0, -20, 20, 0, -10, 0, -5, 0]

  useEffect(() => {
    let animationFrameId

    const handleMouseMove = (e) => {
      if (!svgRef.current) return
      const svg = svgRef.current
      const pt = svg.createSVGPoint()
      pt.x = e.clientX
      pt.y = e.clientY
      
      // Convert screen pixels to exact SVG viewBox coordinates
      const svgP = pt.matrixTransform(svg.getScreenCTM().inverse())
      mouse.current.x = svgP.x
      mouse.current.y = svgP.y
    }

    const handleMouseLeave = () => {
      // Snap back when mouse leaves window
      mouse.current.x = -1000
      mouse.current.y = -1000
    }

    window.addEventListener('mousemove', handleMouseMove)
    document.body.addEventListener('mouseleave', handleMouseLeave)

    const animate = () => {
      let needsUpdate = false
      const p = currentPoints.current

      // Apply physics to the Y-coordinate of ALL 10 points independently!
      // By locking the X-coordinates, we guarantee the curve never forms cusps or loops,
      // because the points are strictly monotonically increasing on the X-axis.
      // By letting all points move independently on the Y-axis, we allow the Bezier slopes
      // to flex and bend organically, completely removing the "stiffness".
      for (let i = 0; i < p.length; i++) {
        const base = basePoints[i]
        let targetY = base.y

        // Calculate smooth repulsion distance
        const dx = base.x - mouse.current.x
        const dy = base.y - mouse.current.y
        const dist = Math.sqrt(dx * dx + dy * dy)

        // Large 450px radius for a massive, soft interaction area
        if (dist < 450) {
          // Extremely soft Gaussian falloff
          const force = Math.max(0, 1 - (dist / 450))
          const pushForce = force * force * 350 // Fluid displacement

          // Push target vertically ONLY! Never touch X.
          targetY += (dy / dist) * pushForce
        }

        // Initialize vertical velocity
        if (p[i].vy === undefined) p[i].vy = 0

        // True Spring Physics Model
        const tension = 0.012  // Loose, but with enough tension to snap back smoothly
        const friction = 0.92  // High friction to allow long, fluid wobbles

        // Apply Hooke's law (spring force) on Y axis
        p[i].vy += (targetY - p[i].y) * tension
        p[i].vy *= friction
        p[i].y += p[i].vy

        if (Math.abs(p[i].vy) > 0.01 || dist < 450) {
          needsUpdate = true
        }
      }

      // Directly update DOM SVG paths for 60fps performance without React re-renders
      if (needsUpdate && svgRef.current) {
        const paths = svgRef.current.querySelectorAll('.wave-path')
        paths.forEach((path, idx) => {
           const offsetY = layerOffsets[idx]
           const d = `M${p[0].x},${p[0].y + offsetY} C${p[1].x},${p[1].y + offsetY} ${p[2].x},${p[2].y + offsetY} ${p[3].x},${p[3].y + offsetY} C${p[4].x},${p[4].y + offsetY} ${p[5].x},${p[5].y + offsetY} ${p[6].x},${p[6].y + offsetY} C${p[7].x},${p[7].y + offsetY} ${p[8].x},${p[8].y + offsetY} ${p[9].x},${p[9].y + offsetY}`
           path.setAttribute('d', d)
        })
      }

      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      document.body.removeEventListener('mouseleave', handleMouseLeave)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <div className="chromatic-wave">
      <svg
        ref={svgRef}
        viewBox="-150 -150 1740 700"
        xmlns="http://www.w3.org/2000/svg"
        className="wave-svg"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <linearGradient id="waveGrad1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FF6B35" />
            <stop offset="20%" stopColor="#FF4D6A" />
            <stop offset="40%" stopColor="#E84393" />
            <stop offset="55%" stopColor="#C44DFF" />
            <stop offset="70%" stopColor="#6C5CE7" />
            <stop offset="85%" stopColor="#4D94FF" />
            <stop offset="100%" stopColor="#00D2FF" />
          </linearGradient>

          <linearGradient id="waveGrad2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FF8C42" />
            <stop offset="25%" stopColor="#FF6B9D" />
            <stop offset="50%" stopColor="#D63384" />
            <stop offset="75%" stopColor="#845EC2" />
            <stop offset="100%" stopColor="#4B7BE5" />
          </linearGradient>

          <linearGradient id="waveGrad3" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FFA07A" />
            <stop offset="30%" stopColor="#E8739E" />
            <stop offset="60%" stopColor="#AB69D6" />
            <stop offset="100%" stopColor="#5B8DEF" />
          </linearGradient>

          <filter id="waveGlow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>

          <filter id="waveSoftGlow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="20" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>

          <filter id="waveHeavyGlow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="40" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Layer 1 - Massive background glow/spread */}
        <g style={{ transform: 'translate(calc(var(--parallax-x, 0) * 20px), calc(var(--parallax-y, 0) * 20px))', transition: 'transform 0.2s ease-out' }}>
          <path
            className="wave-path"
            d="M0,200 C180,80 360,288 540,160 C720,32 900,320 1080,192 C1260,64 1350,256 1440,200"
            fill="none"
            stroke="url(#waveGrad1)"
            strokeWidth="180"
            strokeLinecap="round"
            opacity="0.1"
            filter="url(#waveHeavyGlow)"
            style={{ animationDelay: '0s' }}
          />
        </g>

        {/* Layer 2 - Very thick, shifted slightly up */}
        <g style={{ transform: 'translate(calc(var(--parallax-x, 0) * 15px), calc(var(--parallax-y, 0) * 15px))', transition: 'transform 0.2s ease-out' }}>
          <path
            className="wave-path"
            d="M0,180 C180,60 360,268 540,140 C720,12 900,300 1080,172 C1260,44 1350,236 1440,180"
            fill="none"
            stroke="url(#waveGrad3)"
            strokeWidth="120"
            strokeLinecap="round"
            opacity="0.25"
            filter="url(#waveSoftGlow)"
            style={{ animationDelay: '0.8s' }}
          />
        </g>

        {/* Layer 3 - Very thick, shifted slightly down */}
        <g style={{ transform: 'translate(calc(var(--parallax-x, 0) * 15px), calc(var(--parallax-y, 0) * 15px))', transition: 'transform 0.2s ease-out' }}>
          <path
            className="wave-path"
            d="M0,220 C180,100 360,308 540,180 C720,52 900,340 1080,212 C1260,84 1350,276 1440,220"
            fill="none"
            stroke="url(#waveGrad2)"
            strokeWidth="120"
            strokeLinecap="round"
            opacity="0.25"
            filter="url(#waveSoftGlow)"
            style={{ animationDelay: '1.6s' }}
          />
        </g>

        {/* Layer 4 - Core thick bundle */}
        <g style={{ transform: 'translate(calc(var(--parallax-x, 0) * 5px), calc(var(--parallax-y, 0) * 5px))', transition: 'transform 0.2s ease-out' }}>
          <path
            className="wave-path"
            d="M0,200 C180,80 360,288 540,160 C720,32 900,320 1080,192 C1260,64 1350,256 1440,200"
            fill="none"
            stroke="url(#waveGrad1)"
            strokeWidth="80"
            strokeLinecap="round"
            opacity="0.45"
            filter="url(#waveGlow)"
            style={{ animationDelay: '2.4s' }}
          />
        </g>

        {/* Layer 5 - Sharper inner strand */}
        <g style={{ transform: 'translate(calc(var(--parallax-x, 0) * -5px), calc(var(--parallax-y, 0) * -5px))', transition: 'transform 0.2s ease-out' }}>
          <path
            className="wave-path"
            d="M0,190 C180,70 360,278 540,150 C720,22 900,310 1080,182 C1260,54 1350,246 1440,190"
            fill="none"
            stroke="url(#waveGrad3)"
            strokeWidth="45"
            strokeLinecap="round"
            opacity="0.7"
            filter="url(#waveGlow)"
            style={{ animationDelay: '3.2s' }}
          />
        </g>

        {/* Layer 6 - Sharpest solid core */}
        <g style={{ transform: 'translate(calc(var(--parallax-x, 0) * -15px), calc(var(--parallax-y, 0) * -15px))', transition: 'transform 0.2s ease-out' }}>
          <path
            className="wave-path"
            d="M0,200 C180,80 360,288 540,160 C720,32 900,320 1080,192 C1260,64 1350,256 1440,200"
            fill="none"
            stroke="url(#waveGrad2)"
            strokeWidth="20"
            strokeLinecap="round"
            opacity="0.9"
            style={{ animationDelay: '4.0s' }}
          />
        </g>

        {/* Layer 7 - Core bright reflection */}
        <g style={{ transform: 'translate(calc(var(--parallax-x, 0) * -20px), calc(var(--parallax-y, 0) * -20px))', transition: 'transform 0.2s ease-out' }}>
          <path
            className="wave-path"
            d="M0,195 C180,75 360,283 540,155 C720,27 900,315 1080,187 C1260,59 1350,251 1440,195"
            fill="none"
            stroke="white"
            strokeWidth="6"
            strokeLinecap="round"
            opacity="0.5"
            filter="url(#waveGlow)"
            style={{ animationDelay: '4.8s' }}
          />
        </g>

        {/* Layer 8 - Ultra thin specular highlight */}
        <g style={{ transform: 'translate(calc(var(--parallax-x, 0) * -25px), calc(var(--parallax-y, 0) * -25px))', transition: 'transform 0.2s ease-out' }}>
          <path
            className="wave-path"
            d="M0,200 C180,80 360,288 540,160 C720,32 900,320 1080,192 C1260,64 1350,256 1440,200"
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            opacity="0.8"
            style={{ animationDelay: '5.6s' }}
          />
        </g>
      </svg>
    </div>
  )
}

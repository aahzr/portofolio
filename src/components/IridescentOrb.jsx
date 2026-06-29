import './IridescentOrb.css'

export default function IridescentOrb() {
  return (
    <div className="orb-container">
      <div className="orb">
        <div className="orb-inner"></div>
        <div className="orb-highlight"></div>
        <div className="orb-reflection"></div>
      </div>
      <div className="orb-glow"></div>
    </div>
  )
}

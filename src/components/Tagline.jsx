import './Tagline.css'

export default function Tagline() {
  return (
    <section className="tagline section">
      <div className="tagline-content container">
        {/* Left side info */}
        <div className="tagline-left reveal">
          <span className="asterisks">✱ ✱ ✱</span>
          <p className="tagline-desc">
            Our team combines innovation with
            <br />creativity to develop strategies that
            <br />elevate your brand to new heights.
          </p>
        </div>

        {/* Right side large text */}
        <div className="tagline-right">
          <h2 className="tagline-title">
            <span className="tagline-line reveal">
              <span className="heading-display-italic">INNOVATE</span>
            </span>
            <span className="tagline-line reveal">
              <span className="heading-display-italic text-gold">CREATE</span>
            </span>
            <span className="tagline-line reveal">
              <span className="heading-display-italic text-dim">ELEVATE</span>
            </span>
          </h2>
        </div>
      </div>
    </section>
  )
}

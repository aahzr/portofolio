import './Statement.css'

export default function Statement() {
  return (
    <section className="statement section" id="services">
      <div className="statement-content container">
        {/* Large title */}
        <div className="statement-title-wrapper reveal">
          <h2 className="statement-title">
            <span className="statement-line">
              <span className="heading-display-italic">DIGITAL</span>
            </span>
            <span className="statement-line">
              <span className="heading-display-italic text-gold">SERVICES</span>
            </span>
            <span className="statement-line">
              <span className="heading-display-italic">SOLUTIONS</span>
            </span>
          </h2>
        </div>

        {/* Right info grid */}
        <div className="statement-info">
          <div className="statement-info-top reveal">
            <span className="asterisks">✱ ✱ ✱</span>
          </div>
          <div className="statement-info-bottom reveal">
            <p className="statement-desc">
              Focus on seamless integration and user-centered design, we bring your brand to the forefront of digital innovation.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

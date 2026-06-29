import './Stats.css'
import IridescentOrb from './IridescentOrb'

export default function Stats() {
  return (
    <section className="stats section">
      <div className="stats-grid container">
        {/* Row 1 */}
        <div className="stats-cell stats-orb-cell reveal">
          <IridescentOrb />
        </div>

        <div className="stats-cell stats-number-cell reveal">
          <span className="stats-big-number">400+</span>
        </div>

        <div className="stats-cell stats-investment-cell reveal">
          <h4 className="stats-label">Investment</h4>
          <p className="stats-text">
            More than <strong>$100M+</strong> total investment that our clients have successfully achieved after working with <strong>ELITECH</strong>
          </p>
        </div>

        {/* Row 2 */}
        <div className="stats-cell stats-tag-cell reveal">
          <span className="tag">Best Solution for Build Your Solution</span>
        </div>

        <div className="stats-cell stats-tag-cell-2 reveal">
          <span className="tag">Best Solution for Build Your Solution</span>
        </div>

        <div className="stats-cell stats-big-number-cell reveal">
          <span className="stats-big-number stats-big-number-right">100M+</span>
        </div>

        {/* Row 3 */}
        <div className="stats-cell stats-project-cell reveal">
          <h4 className="stats-project-title">Total Project</h4>
          <p className="stats-project-desc">
            As your <strong className="text-gold">trusted partner</strong> in all things digital, we're committed to guiding you through every step of your <strong className="text-gold"><em>online journey</em></strong>.
          </p>
        </div>
      </div>
    </section>
  )
}

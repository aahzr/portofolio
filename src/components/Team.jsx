import './Team.css'
import team1 from '../assets/team1.jpg'
import team2 from '../assets/team2.jpeg'

export default function Team() {
  return (
    <section className="team section" id="team">
      <div className="container team-header reveal">
        <h2 className="heading-display team-title">
          OUR <span className="heading-display-italic text-gold">TEAM</span>
        </h2>
      </div>
      <div className="team-grid container">
        {/* Member 1 Photo */}
        <div className="team-cell team-photo-cell reveal">
          <img src={team1} alt="Team Member 1" className="team-photo" />
        </div>

        {/* Member 2 Photo */}
        <div className="team-cell team-photo-cell reveal">
          <img src={team2} alt="Team Member 2" className="team-photo" />
        </div>

        {/* Member 1 Info */}
        <div className="team-cell team-info-cell reveal">
          <h3 className="team-name">Andi Ahsan Ashuri</h3>
          <span className="team-role">Co-Founder & Tech Lead</span>
          <p className="team-desc">
            Visionary engineer with a passion for building scalable, high-performance digital ecosystems. Specializes in turning complex problems into elegant, minimalist technical solutions.
          </p>
        </div>

        {/* Member 2 Info */}
        <div className="team-cell team-info-cell reveal">
          <h3 className="team-name">Andi Ikhlas Mallomo</h3>
          <span className="team-role">Co-Founder & Design Director</span>
          <p className="team-desc">
            Award-winning creative director blending aesthetic perfection with functional user experiences. Obsessed with micro-interactions, fluid typography, and the future of spatial web design.
          </p>
        </div>
      </div>
    </section>
  )
}

import './Showcase.css'

// Contoh cara mengimpor gambar dari folder assets:
import project1Img from '../assets/1.png'
import project2Img from '../assets/2.png'
import project3Img from '../assets/3.png'
import project4Img from '../assets/4.png'
import project5Img from '../assets/5.png'

const projects = [
  {
    id: 1,
    category: 'Mobile Application',
    title: 'Inventaris Laboratorium',
    span: 'wide', // wide or normal
    image: project1Img, // Buka komen ini jika gambar sudah diimpor
  },
  {
    id: 2,
    category: 'Web Application',
    title: 'LDK Monev',
    span: 'normal',
    image: project4Img,
  },
  {
    id: 3,
    category: 'Web and Mobile Application',
    title: 'CalorieMate',
    span: 'normal',
    image: project3Img,
  },
  {
    id: 4,
    category: 'Web and Mobile Application',
    title: 'Finance App with AI',
    span: 'wide',
    image: project5Img,
  },
  {
    id: 5,
    category: 'Web Application',
    title: 'Profil Rumah Makan',
    span: 'normal',
    image: project2Img,
  },
]

export default function Showcase() {
  return (
    <section className="showcase section" id="works">
      {/* Section heading */}
      <div className="showcase-header container">
        <div className="showcase-header-left reveal">
          <span className="asterisks">✱ ✱ ✱</span>
          <p className="showcase-desc">
            This collection reflects our commitment to delivering exceptional design and impactful solutions that resonate.
          </p>
        </div>

        <div className="showcase-title-wrapper reveal">
          <h2 className="showcase-title">
            <span className="heading-display-italic showcase-line">OUR</span>
            <span className="heading-display-italic text-gold showcase-line">CREATIVE</span>
            <span className="heading-display-italic showcase-line">SHOWCASE</span>
          </h2>
        </div>

        <div className="showcase-header-right reveal">
          <span className="asterisks">✱ ✱ ✱</span>
        </div>
      </div>

      {/* Project Grid */}
      <div className="showcase-grid container reveal-stagger">
        {projects.map((project) => (
          <div
            className={`showcase-card ${project.span === 'wide' ? 'showcase-card-wide' : ''}`}
            key={project.id}
          >
            <div className="showcase-card-image">
              {project.image ? (
                <img src={project.image} alt={project.title} className="showcase-card-img" />
              ) : (
                <div className="showcase-card-placeholder">
                  <span className="showcase-card-placeholder-text">
                    {project.title.split('—')[0].trim()}
                  </span>
                </div>
              )}
              <div className="showcase-card-overlay"></div>
            </div>
            <div className="showcase-card-info">
              <span className="showcase-card-category">{project.category}</span>
              <h3 className="showcase-card-title">{project.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

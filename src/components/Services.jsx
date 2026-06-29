import './Services.css'

const services = [
  {
    id: 'web-application',
    title: 'WEB APPLICATION',
    description: 'We build high-performance, scalable web applications with modern technologies that deliver exceptional user experiences.',
  },
  {
    id: 'mobile-app',
    title: 'MOBILE APPLICATION',
    description: 'We engineer robust, native and cross-platform mobile applications that provide seamless experiences on any device.',
  },
  {
    id: 'ui-ux-design',
    title: 'UI/UX DESIGN',
    description: 'Our design process revolves around creating intuitive, visually stunning interfaces that engage and delight users.',
  },
]

const stackIcons = [
  { id: 'react', url: 'https://react.dev' },
  { id: 'nodedotjs', url: 'https://nodejs.org' },
  { id: 'nextdotjs', url: 'https://nextjs.org' },
  { id: 'typescript', url: 'https://www.typescriptlang.org' },
  { id: 'javascript', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript' },
  { id: 'figma', url: 'https://www.figma.com' },
  { id: 'framer', url: 'https://www.framer.com' },
  { id: 'tailwindcss', url: 'https://tailwindcss.com' },
  { id: 'python', url: 'https://www.python.org' },
  { id: 'swift', url: 'https://developer.apple.com/swift/' },
  { id: 'kotlin', url: 'https://kotlinlang.org' },
  { id: 'docker', url: 'https://www.docker.com' },
  { id: 'postgresql', url: 'https://www.postgresql.org' },
  { id: 'mongodb', url: 'https://www.mongodb.com' },
  { id: 'vuedotjs', url: 'https://vuejs.org' },
  { id: 'graphql', url: 'https://graphql.org' },
  { id: 'firebase', url: 'https://firebase.google.com' },
  { id: 'vercel', url: 'https://vercel.com' }
]

export default function Services() {
  return (
    <section className="services section">
      <div className="services-content container">
        {services.map((service) => (
          <div className="service-row reveal" key={service.id}>
            <h3 className="service-title heading-display">{service.title}</h3>
            <p className="service-desc">{service.description}</p>
            <a href="#works" className="btn-outline" style={{ textDecoration: 'none' }}>
              <span>SEE MORE</span>
              <span className="arrow">→</span>
            </a>
          </div>
        ))}
      </div>

      {/* Tech Stack Marquee */}
      <div className="stack-marquee-container container reveal">
        <div className="stack-marquee">
          {[...stackIcons, ...stackIcons].map((stack, idx) => (
            <a href={stack.url} target="_blank" rel="noopener noreferrer" className="stack-icon-wrapper" key={idx}>
              <img src={`https://cdn.simpleicons.org/${stack.id}/white`} alt={stack.id} className="stack-icon" />
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

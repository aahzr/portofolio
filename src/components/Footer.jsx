import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer" id="contact">
      {/* Footer info row */}
      <div className="footer-info container reveal">
        <div className="footer-info-col">
          <p className="footer-info-text">
            Explore how we've transformed ideas into reality, pushing boundaries and setting new standards in the digital landscape. Join us in celebrating creativity.
          </p>
        </div>

        <div className="footer-info-col">
          <a href="mailto:andiahsanashuri@gmail.com" className="footer-link">andiahsanashuri@gmail.com</a>
          <a href="tel:+6285657376669" className="footer-link">+62 856-5737-6669</a>
          {/* <a href="#" className="footer-link">@elitech_dev</a> */}
        </div>

        <div className="footer-info-col">
          <h5 className="footer-col-title">STUDIO</h5>
          <p className="footer-info-text">
            Makassar
            <br />Kota Makassar
            <br />Sulawesi Selatan, 90231
          </p>
        </div>

        <div className="footer-info-col footer-info-col-right">
          <a href="#" className="footer-link">Cookie Policy</a>
          <a href="#" className="footer-link">Privacy Policy</a>
        </div>
      </div>

      {/* Large stacked name */}
      <div className="footer-brand">
        <div className="footer-brand-stack">
          <span className="footer-brand-text footer-brand-1">ELITECH.</span>
          <span className="footer-brand-text footer-brand-2">ELITECH.</span>
          <span className="footer-brand-text footer-brand-3">ELITECH.</span>
        </div>
      </div>
    </footer>
  )
}

import './About.css'

function About() {
  return (
    <section className="about content-section">
      <div className="about__photo" aria-hidden="true">
        AJ
      </div>
      <div className="about__content">
        <h2 className="about__title">About the author</h2>
        <p className="about__text">
          Frontend developer focused on building clean, accessible products that
          turn complex content into clear interfaces.
        </p>
      </div>
    </section>
  )
}

export default About

import './Hero.css'

function Hero() {
  return (
    <section className="hero-content" aria-labelledby="hero-title">
      <h1 className="hero-title" id="hero-title">
        <span className="title-mask"><span className="title-line title-line-one">Champions</span></span>
        <span className="title-mask"><span className="title-line title-line-two">League</span></span>
        <span className="title-mask"><span className="title-line title-line-three">2026/27</span></span>
      </h1>
    </section>
  )
}

export default Hero

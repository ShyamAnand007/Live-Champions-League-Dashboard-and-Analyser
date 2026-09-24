import Navbar from './Navbar.jsx'
import Hero from './Hero.jsx'
import BackgroundEffects from './BackgroundEffects.jsx'
import './LandingPage.css'

function LandingPage() {
  return (
    <main className="landing-page">
      <BackgroundEffects />
      <div className="corner-brackets" aria-hidden="true" />
      <Navbar />
      <Hero />
    </main>
  )
}

export default LandingPage

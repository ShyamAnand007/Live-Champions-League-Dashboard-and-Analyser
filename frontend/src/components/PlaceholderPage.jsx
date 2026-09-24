import { Link } from 'react-router-dom'
import './PlaceholderPage.css'

function PlaceholderPage({ title }) {
  return (
    <main className="placeholder-page">
      <Link className="placeholder-wordmark" to="/">✦ UCL 26/27</Link>
      <h1>{title}</h1>
    </main>
  )
}

export default PlaceholderPage

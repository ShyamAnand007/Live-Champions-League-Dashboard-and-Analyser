import { Link, NavLink } from 'react-router-dom'
import './DashboardNavbar.css'

const navigation = [
  { label: 'Matches', path: '/matches' },
  { label: 'Standings', path: '/standings' },
  { label: 'Teams', path: '/teams' },
]

function DashboardNavbar() {
  return (
    <header className="dashboard-nav">
      <div className="dashboard-nav-inner">
        <Link className="dashboard-wordmark" to="/" aria-label="Champions League 2026/27 home">
          <span className="dashboard-star" aria-hidden="true">✦</span>
          <span className="dashboard-wordmark-main">CHAMPIONS LEAGUE</span>
          <span className="dashboard-wordmark-season">26/27</span>
        </Link>
        <nav className="dashboard-nav-links" aria-label="Primary navigation">
          {navigation.map(({ label, path }) => (
            <NavLink
              className={({ isActive }) => `dashboard-nav-link${isActive ? ' is-active' : ''}`}
              key={path}
              to={path}
            >
              {label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  )
}

export default DashboardNavbar

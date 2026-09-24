import { Link, NavLink } from 'react-router-dom'
import './Navbar.css'

const navigation = [
  { index: '01', label: 'Matches', path: '/matches' },
  { index: '02', label: 'Standings', path: '/standings' },
  { index: '03', label: 'Teams', path: '/teams' },
]

function StarMark() {
  return <span className="star-mark" aria-hidden="true">✦</span>
}

function Navbar() {
  return (
    <header className="site-header">
      <Link className="wordmark" to="/" aria-label="UCL 26/27 home">
        <StarMark />
        <span>UCL</span>
        <span>26/27</span>
      </Link>
      <nav className="primary-nav" aria-label="Primary navigation">
        {navigation.map(({ index, label, path }) => (
          <NavLink
            className={({ isActive }) => `nav-link${isActive ? ' is-active' : ''}`}
            key={path}
            to={path}
          >
            <span className="nav-index">{index}</span>
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>
    </header>
  )
}

export default Navbar

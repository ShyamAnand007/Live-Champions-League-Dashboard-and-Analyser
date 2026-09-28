import './TeamLogo.css'

function TeamLogo({ name, logo }) {
  return (
    <div className="team-logo">
      {logo ? (
        <img src={logo} alt={name} />
      ) : (
        <span className="team-logo-fallback">{name.slice(0, 3).toUpperCase()}</span>
      )}
    </div>
  )
}

export default TeamLogo

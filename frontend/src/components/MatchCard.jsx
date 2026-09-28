import TeamLogo from './TeamLogo.jsx'
import './MatchCard.css'

function MatchCard({ match }) {
  const { matchday, status, date, time, minute, homeTeam, awayTeam, homeScore, awayScore, venue, homeLogo, awayLogo } = match
  const isLive = status === 'live'
  const isCompleted = status === 'completed'
  const isUpcoming = status === 'upcoming'

  return (
    <article className="match-card" data-status={status}>
      <div className="match-card-top">
        <span className="match-day-label">MATCHDAY {matchday}</span>
        <span className={`match-status match-status-${status}`}>
          {isLive && <span className="live-dot" aria-hidden="true" />}
          {status.toUpperCase()}
        </span>
      </div>

      <div className="match-teams">
        <div className="match-team match-team-home">
          <TeamLogo name={homeTeam} logo={homeLogo} />
          <span className="match-team-name">{homeTeam}</span>
        </div>

        <div className="match-score">
          {isCompleted && <span className="score-value">{homeScore} — {awayScore}</span>}
          {isLive && (
            <>
              <span className="score-value score-value-live">{homeScore} — {awayScore}</span>
              <span className="match-minute">{minute}'</span>
            </>
          )}
          {isUpcoming && <span className="match-time">{time}</span>}
        </div>

        <div className="match-team match-team-away">
          <TeamLogo name={awayTeam} logo={awayLogo} />
          <span className="match-team-name">{awayTeam}</span>
        </div>
      </div>

      <div className="match-card-bottom">
        <span className="match-venue">{venue}</span>
        <span className="match-date">{date}</span>
      </div>
    </article>
  )
}

export default MatchCard

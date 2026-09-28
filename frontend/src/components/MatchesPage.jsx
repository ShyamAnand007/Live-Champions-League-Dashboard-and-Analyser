import { useEffect, useMemo, useState } from 'react'
import DashboardNavbar from './DashboardNavbar.jsx'
import MatchCard from './MatchCard.jsx'
import './MatchesPage.css'
console.log("MATCHES PAGE LOADED")
const FILTERS = ['all', 'upcoming', 'live', 'completed']
const MATCHDAYS = [1, 2, 3, 4, 5, 6, 7, 8]

const MONTH_NAMES = [
  'JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE',
  'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER',
]

function formatDateLabel(dateStr) {
  const d = new Date(dateStr)
  return `${MONTH_NAMES[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`
}

function convertStatus(status) {
  if (status === 'FINISHED') {
    return 'completed'
  }

  if (status === 'TIMED') {
    return 'upcoming'
  }

  if (
    status === 'IN_PLAY' ||
    status === 'LIVE' ||
    status === 'PAUSED'
  ) {
    return 'live'
  }

  return 'upcoming'
}

function getMatchday(dateString) {
  const date = new Date(dateString)

  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  // Matchday 1: September 8–10, 2026
  if (year === 2026 && month === 9 && day >= 8 && day <= 10) {
    return 1
  }

  // Matchday 2: October 13–14, 2026
  if (year === 2026 && month === 10 && day >= 13 && day <= 14) {
    return 2
  }

  // Matchday 3: October 20–21, 2026
  if (year === 2026 && month === 10 && day >= 20 && day <= 21) {
    return 3
  }

  // Matchday 4: November 3–4, 2026
  if (year === 2026 && month === 11 && day >= 3 && day <= 4) {
    return 4
  }

  // Matchday 5: November 24–25, 2026
  if (year === 2026 && month === 11 && day >= 24 && day <= 25) {
    return 5
  }

  // Matchday 6: December 8–9, 2026
  if (year === 2026 && month === 12 && day >= 8 && day <= 9) {
    return 6
  }

  // Matchday 7: January 19–20, 2027
  if (year === 2027 && month === 1 && day >= 19 && day <= 20) {
    return 7
  }

  // Matchday 8: January 27, 2027
  if (year === 2027 && month === 1 && day === 27) {
    return 8
  }

  return null
}

function MatchesPage() {
  const [matchesData, setMatchesData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const [activeFilter, setActiveFilter] = useState('all')
  const [matchday, setMatchday] = useState('all')
    useEffect(() => {
    fetch('http://localhost:8000/matches')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch matches')
        }

        return response.json()
      })
      .then((data) => {
        console.log("API MATCHES:", data)
        setMatchesData(data)
        setLoading(false)
        })
      .catch((error) => {
        setError(error.message)
        setLoading(false)
      })
  }, [])
    const formattedMatches = useMemo(() => {
    return matchesData.map((match) => ({
      id: match.match_id,

      matchday: getMatchday(match.date),

      status: convertStatus(match.status),

      date: match.date,

      time: 'TBD',

      minute: null,

      homeTeam: match.home_team,
      awayTeam: match.away_team,

      homeScore: match.home_score,
      awayScore: match.away_score,

      venue: match.venue || 'Venue TBD',

      homeLogo: match.home_logo,
      awayLogo: match.away_logo,

      groupDate: match.date,
    }))
  }, [matchesData])

  const filteredMatches = useMemo(() => {
  return formattedMatches.filter((m) => {
    const statusOk =
      activeFilter === 'all' || m.status === activeFilter

    const matchdayOk =
      matchday === 'all' || m.matchday === Number(matchday)

    return statusOk && matchdayOk
  })
}, [formattedMatches, activeFilter, matchday])

  const groupedMatches = useMemo(() => {
    const groups = {}
    filteredMatches.forEach((m) => {
      const key = m.groupDate
      if (!groups[key]) groups[key] = []
      groups[key].push(m)
    })
    return Object.entries(groups).sort(([a], [b]) => a.localeCompare(b))
  }, [filteredMatches])

  return (
    <div className="matches-page">
      <DashboardNavbar />
      <div className="matches-page-bg" aria-hidden="true" />

      <div className="matches-page-content">
        <header className="matches-header">
          <h1 className="matches-heading">MATCH CENTER</h1>
          <p className="matches-subtitle">UEFA Champions League 2026/27 — Fixtures &amp; Results</p>
        </header>

        <div className="matches-filters">
          <div className="filter-tabs" role="tablist">
            {FILTERS.map((f) => (
              <button
                className={`filter-tab${activeFilter === f ? ' is-active' : ''}`}
                key={f}
                onClick={() => setActiveFilter(f)}
                role="tab"
                aria-selected={activeFilter === f}
                type="button"
              >
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>

          <div className="matchday-select">
            <label htmlFor="matchday-dropdown" className="matchday-label">MATCHDAY</label>
            <div className="matchday-dropdown-wrap">
              <select
                className="matchday-dropdown"
                id="matchday-dropdown"
                value={matchday}
                onChange={(e) => setMatchday(e.target.value)}
              >
                <option value="all">All Matchdays</option>
                {MATCHDAYS.map((md) => (
                  <option key={md} value={md}>Matchday {md}</option>
                ))}
              </select>
              <span className="matchday-arrow" aria-hidden="true">▼</span>
            </div>
          </div>
        </div>

        {groupedMatches.length === 0 ? (
          <div className="matches-empty">
            <p>No matches found for the selected filters.</p>
          </div>
        ) : (
          <div className="matches-list">
            {groupedMatches.map(([dateStr, dayMatches]) => (
              <section className="match-date-group" key={dateStr}>
                <div className="match-date-header">
                  <h2 className="match-date-label">{formatDateLabel(dateStr)}</h2>
                  <span className="match-date-matchday">MATCHDAY {dayMatches[0].matchday}</span>
                </div>
                <div className="match-cards-grid">
                  {dayMatches.map((match) => (
                    <MatchCard key={match.id} match={match} />
                  ))}
                </div>
              </section>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default MatchesPage

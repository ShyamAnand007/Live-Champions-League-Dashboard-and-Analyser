import { useEffect, useState } from 'react'

function Matches() {
  const [matches, setMatches] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch('http://localhost:8000/matches')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch matches')
        }
        return response.json()
      })
      .then((data) => {
        setMatches(data)
        setLoading(false)
      })
      .catch((error) => {
        setError(error.message)
        setLoading(false)
      })
  }, [])

  if (loading) {
    return <div>Loading matches...</div>
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  return (
    <main>
      <h1>Matches</h1>

      {matches.map((match) => (
        <div key={match.match_id}>
          <p>
            {match.home_team} {match.home_score} - {match.away_score}{' '}
            {match.away_team}
          </p>
        </div>
      ))}
    </main>
  )
}

export default Matches
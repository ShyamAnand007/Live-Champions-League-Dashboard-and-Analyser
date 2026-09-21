from fastapi import FastAPI
from backend.database import connection
app=FastAPI()
@app.get("/")
def home():
    return {"message":"Champions League Dashboard API"}
@app.get("/teams")
def get_teams():
    cursor=connection.cursor()
    cursor.execute("""
        SELECT team_id,team_name,country,team_logo,stadium
        FROM team
    """  )

    rows=cursor.fetchall()
    cursor.close()
    teams=[]
    for row in rows:    
        teams.append({
            "team_id":row[0],
            "team_name":row[1],
            "country":row[2],
            "team_logo":row[3],
            "stadium":row[4]
        })
    return teams

@app.get("/teams/{team_id}")
def get_team(team_id: int):
    cursor=connection.cursor()
    cursor.execute("""
        SELECT team_id,team_name,country,team_logo,stadium
        FROM team
        WHERE team_id=%s
    """,(team_id,))
    row=cursor.fetchone()
    if row is None:
            return {"error":"NO MATHCING ID FOUND"}
    return{
        "team_id":row[0],
        "team_name":row[1],
        "country":row[2],
        "team_logo":row[3],
        "stadium":row[4]
    }
@app.get("/matches")
def get_matches():
    cursor = connection.cursor()

    cursor.execute("""
        SELECT
            m.match_id,
            home.team_name AS home_team,
            away.team_name AS away_team,
            m.home_score,
            m.away_score,
            m.venue,
            m.date,
            m.stage,
            m.status
        FROM match m
        JOIN team home
            ON m.home_team_id = home.team_id
        JOIN team away
            ON m.away_team_id = away.team_id
    """)

    rows = cursor.fetchall()

    cursor.close()

    matches = []

    for row in rows:
        matches.append({
            "match_id": row[0],
            "home_team": row[1],
            "away_team": row[2],
            "home_score": row[3],
            "away_score": row[4],
            "venue": row[5],
            "date": row[6],
            "stage": row[7],
            "status": row[8]
        })

    return matches

@app.get("/matches/{match_id}")
def get_matches(match_id:int):
    cursor = connection.cursor()

    cursor.execute("""
        SELECT
            m.match_id,
            home.team_name AS home_team,
            away.team_name AS away_team,
            m.home_score,
            m.away_score,
            m.venue,
            m.date,
            m.stage,
            m.status
        FROM match m
        JOIN team home
            ON m.home_team_id = home.team_id
        JOIN team away
            ON m.away_team_id = away.team_id
        WHERE m.match_id=%s
    """,(match_id,))

    row = cursor.fetchone()

    cursor.close()

    if row is None:
            return {"Error":"Not found"}
    return{      
            "match_id": row[0],
            "home_team": row[1],
            "away_team": row[2],
            "home_score": row[3],
            "away_score": row[4],
            "venue": row[5],
            "date": row[6],
            "stage": row[7],
            "status": row[8]
        }

@app.get("/standings")
def get_standings():
    cursor=connection.cursor()
    cursor.execute("""
        SELECT  
            s.position,
            t.team_name,
            s.played,
            s.wins,
            s.draws,
            s.losses,
            s.goals_for,
            s.goals_against,
            s.goal_d,
            s.points
        FROM standing s
        JOIN team t
            ON s.team_id=t.team_id
        ORDER BY s.position
    """)
    rows=cursor.fetchall()
    cursor.close()
    standing=[]
    for row in rows:
        standing.append({
              "position":row[0],
              "team_name":row[1],
              "played":row[2],
              "wins":row[3],
              "draws":row[4],
              "losses":row[5],
              "goals_for":row[6],
              "goals_against":row[7],
              "goals_difference":row[8],
              "points":row[9]
        })
    return standing
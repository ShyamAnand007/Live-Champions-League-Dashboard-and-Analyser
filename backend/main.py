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
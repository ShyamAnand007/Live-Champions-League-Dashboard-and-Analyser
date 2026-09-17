from fastapi import FastAPI
from backend.database import connection
app=FastAPI()
@app.get("/")
def home():
    return {"message":"Champions League Dashboard API"}
@app.get("/teams")
def get_teams():
    cursor=connection.cursor()
    cursor.execute("SELECT * FROM team")
    teams=cursor.fetchall()
    cursor.close()
    return teams

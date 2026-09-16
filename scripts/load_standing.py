import os 
import requests
from dotenv import load_dotenv
import json
import psycopg2 

load_dotenv()

apik=os.getenv("API_KEY")
url="https://api.football-data.org/v4/competitions/CL/standings"
headers={
    "x-Auth-Token":apik
}


response=requests.get(url,headers=headers)

print(response.status_code)
data=response.json()

connection=psycopg2.connect(
    host="localhost",
    database="cl",
    user="postgres",
    password="aids29",
    port="5432"
)

connection.set_client_encoding("UTF8")
cursor=connection.cursor()

for standing in data["standings"]:
    for team in standing["table"]:
        cursor.execute(
            """
            INSERT INTO standing(team_id,position,played,wins,draws,losses,goals_for,goals_against,goal_d,points)
            VALUES(%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)
            """,
            (
                team["team"]["id"],
                team["position"],
                team["playedGames"],
                team["won"],
                team["draw"],        
                team["lost"],
                team["goalsFor"],
                team["goalsAgainst"],
                team["goalDifference"],
                team["points"]
            )
        )

connection.commit()
print("success")





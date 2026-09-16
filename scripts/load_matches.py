import os 
import requests
from dotenv import load_dotenv
import json
import psycopg2 

load_dotenv()

apik=os.getenv("API_KEY")
url="https://api.football-data.org/v4/competitions/CL/matches"
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

for match in data["matches"]:
    cursor.execute(
        """
        INSERT INTO match(match_id,away_team_id,home_team_id,home_score,away_score,venue,date,stage,status)
        VALUES(%s,%s,%s,%s,%s,%s,%s,%s,%s)
        """,
        (
            match["id"],
            match["awayTeam"]["id"],
            match["homeTeam"]["id"],
            match["score"]["fullTime"]["home"],
            match["score"]["fullTime"]["away"],
            None,
            match["utcDate"],
            match["stage"],
            match["status"]
        )
    )

connection.commit()
print("success")





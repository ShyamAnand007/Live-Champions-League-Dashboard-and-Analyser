import os 
import requests
from dotenv import load_dotenv
import json
import psycopg2 


load_dotenv()

apik=os.getenv("API_KEY")
url="https://api.football-data.org/v4/competitions/CL/teams"
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

for team in data["teams"]:
    cursor.execute(
        """
        INSERT INTO team(team_id,team_name,team_logo,country,stadium)
        VALUES(%s,%s,%s,%s,%s)
        """,
        (
            team["id"],
            team["name"],
            team["crest"],
            team["area"]["name"],
            team["venue"],
        )
    )

connection.commit()





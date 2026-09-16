import os 
import requests
from dotenv import load_dotenv
import json

load_dotenv()

apik=os.getenv("API_KEY")
url="https://api.football-data.org/v4/competitions/CL/standings"
headers={
    "x-Auth-Token":apik
}


response=requests.get(url,headers=headers)

print(response.status_code)
data=response.json()

standing=data["standings"][0]["table"][0]
print("Team ID:", standing["team"]["id"])
print("Team:", standing["team"]["name"])
print("Position:", standing["position"])
print("Played:", standing["playedGames"])
print("Wins:", standing["won"])
print("Draws:", standing["draw"])
print("Losses:", standing["lost"])
print("Goals For:", standing["goalsFor"])
print("Goals Against:", standing["goalsAgainst"])
print("Goal Difference:", standing["goalDifference"])
print("Points:", standing["points"])





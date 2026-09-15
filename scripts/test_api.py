import os 
import requests
from dotenv import load_dotenv
import json

load_dotenv()

apik=os.getenv("API_KEY")
url="https://api.football-data.org/v4/competitions/CL/teams"
headers={
    "x-Auth-Token":apik
}


response=requests.get(url,headers=headers)

print(response.status_code)
data=response.json()

print(data["count"])

for team in data["teams"]:
    print(
        team["id"],
        team["name"],
        team["crest"],
        team["area"]["name"],
        team["venue"],
    )







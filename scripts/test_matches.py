import os 
import requests
from dotenv import load_dotenv
import json

load_dotenv()

apik=os.getenv("API_KEY")
url="https://api.football-data.org/v4/competitions/CL/matches"
headers={
    "x-Auth-Token":apik
}


response=requests.get(url,headers=headers)

print(response.status_code)
data=response.json()

match = data["matches"][0]

print("Match ID:", match["id"])
print("Home team ID:", match["homeTeam"]["id"])
print("Away team ID:", match["awayTeam"]["id"])
print("Home score:", match["score"]["fullTime"]["home"])
print("Away score:", match["score"]["fullTime"]["away"])
print("Date:", match["utcDate"][:10])
print("Stage:", match["stage"])
print("Status:", match["status"])






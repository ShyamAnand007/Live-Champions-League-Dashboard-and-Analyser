import os 
import requests
from dotenv import load_dotenv

load_dotenv()

apik=os.getenv("API_KEY")
url="https://v3.football.api-sports.io/leagues"
headers={
    "x-apisports-key":apik
}

response=requests.get(url,headers=headers)

print(response.status_code)
data=response.json()

for league in data["response"]:
    if "Champions League" in league["league"]["name"]:
        print(league["league"])
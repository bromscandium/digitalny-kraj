from fastapi.templating import Jinja2Templates
from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import google.generativeai as genai
import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

templates = Jinja2Templates(directory="../../../frontend")
@app.get("/")
async def read_root(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})

zilina_knowledge = {
    "obce": {
        "Čierne": {
            "popis": "Obec na trojmedzí SK-PL-CZ, nadmorská výška 454m, rieka Čierňanka",
            "zaujímavosti": [
                "Trojmedzie - stret hraníc 3 štátov",
                "Kostol Jána Pavla II.",
                "Prameň Zimná voda"
            ]
        },
        "Skalité": {
            "popis": "Najsevernejšia pohraničná obec, nadmorská výška 526m",
            "zaujímavosti": [
                "Kostol sv. Jána Krstiteľa",
                "Lavička zaľúbených",
                "Skalitské kríže"
            ]
        },
        "Svrčinovec": {
            "popis": "Obec pri českých hraniciach, 5 osád, nadmorská výška 430m",
            "zaujímavosti": [
                "Kaplnka Sedembolestnej Panny Márie",
                "Vojenské bunkre Tobruk",
                "Krížová cesta na Závršie"
            ]
        }
    },
    "turistika": {
        "trasy": [
            "Cyklotrasa Trojmedzie (Čierne-Skalité-Svrčinovec)",
            "Pešia trasa na vrch Trojak (847m)",
            "Cesta k prameňu Zimná voda"
        ],
        "atrakcie": [
            "Šance - historické opevnenie",
            "Múzeum Kysuckej dediny",
            "Lyžiarske stredisko Skalité"
        ]
    },
    "doprava": {
        "autobusy": "Spojenie s Čadcou každých 30 minút",
        "vlaky": "Železničná trať Žilina-Čadca-Skalité-Zwardoň (PL)"
    },
    "školstvo": {
        "Čierne": ["ZŠ Čierne", "MŠ Čierne"],
        "Skalité": ["ZŠ Skalité", "Základná umelecká škola"],
        "Svrčinovec": ["ZŠ Svrčinovec"]
    }
}


try:
    genai.configure(api_key=os.getenv("GEMINI_API_KEY"))
except Exception as e:
    print(f"Chyba inicializácie Gemini: {str(e)}")

class Message(BaseModel):
    message: str


system_prompt = """
    Si asistent pre mikroregión Kysucký triangel (obce Čierne, Skalité, Svrčinovec).
    Pravidlá:
    1. Odpovedaj výhradne po slovensky
    2. Tematické obmedzenie: iba územie mikroregiónu
    3. Presné údaje: vždy uvádzaj konkrétne mená a miesta


    Dôležité informácie:
    - Poloha: okres Čadca, pri hraniciach s ČR a Poľskom
    - Unikát: Trojmedzie v Čiernom
    - Doprava: železnica do Poľska, autobusy do Čadce
"""



def search_knowledge(query: str) -> str:
    """Wait"""
    query = query.lower()
    response_parts = []
    

    for category, data in zilina_knowledge.items():
        if category in query:
            response_parts.append(f"**{category.capitalize()}**:")
            
            if isinstance(data, dict):
                for subcategory, items in data.items():
                    if subcategory in query:
                        response_parts.append(f"- {subcategory}:")
                        if isinstance(items, list):
                            response_parts.extend([f"  - {item}" for item in items])
                        elif isinstance(items, dict):
                            for key, value in items.items():
                                response_parts.append(f"  - {key}: {value}")
                        else:
                            response_parts.append(f"  - {items}")
            elif isinstance(data, list):
                response_parts.extend([f"- {item}" for item in data])
            else:
                response_parts.append(f"- {data}")
    
    return "\n".join(response_parts) if response_parts else None

@app.post("/chat")
async def chat(message: Message):
    try:
      
        knowledge_response = search_knowledge(message.message)
        if knowledge_response:
            return {"response": knowledge_response}
        

        model = genai.GenerativeModel('gemini-1.5-flash-latest')
        
        full_prompt = f"{system_prompt}\nPoužívateľ: {message.message}"
        
        response = model.generate_content(
            full_prompt,
            generation_config={
                "max_output_tokens": 1000,
                "temperature": 0.4,
                "top_p": 0.9
            },
            safety_settings={
                "HARASSMENT": "BLOCK_NONE",
                "HATE": "BLOCK_NONE",
                "SEXUAL": "BLOCK_NONE",
                "DANGEROUS": "BLOCK_NONE"
            }
        )
        
        return {"response": response.text}
    
    except Exception as e:
        return {"response": f"Prepáčte, došlo k chybe. Skúste neskôr. ({str(e)})"}
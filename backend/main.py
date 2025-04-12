from fastapi import FastAPI, Request
from fastapi.templating import Jinja2Templates
import os
import uvicorn
from app.ai.ai import app as ai_app

app = FastAPI()

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
FRONTEND_DIR = os.path.abspath(os.path.join(BASE_DIR, "../frontend"))

templates = Jinja2Templates(directory=FRONTEND_DIR)

app.mount("/ai", ai_app)

@app.get("/")
async def read_root(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})
@app.get("/oregione")
async def oregione(request: Request):
    return templates.TemplateResponse("oregeone.html", {"request": request})

@app.get("/mapa")
async def read_root(request: Request):
    return templates.TemplateResponse("map.html", {"request": request})

if __name__ == "__main__":
    print(" main.py, FastAPI  ai.py")
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
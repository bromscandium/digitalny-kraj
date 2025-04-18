# map.py

from fastapi import FastAPI, Request
from fastapi.templating import Jinja2Templates

app = FastAPI()
templates = Jinja2Templates(directory="../../../frontend")

@app.get("/")
async def read_root(request: Request):
    return templates.TemplateResponse("map.html", {"request": request})

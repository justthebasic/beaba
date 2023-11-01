from src.apis import apis
from src.prisma import prisma
from fastapi.middleware.gzip import GZipMiddleware
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware  


app = FastAPI()
app.add_middleware(GZipMiddleware, minimum_size=1000)
app.include_router(apis, prefix="/apis")

# Configuração do CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Configure isso para permitir apenas origens específicas
    allow_methods=["http://localhost:5173"],
    allow_headers=["*"],
)


@app.on_event("startup")
async def startup():
    await prisma.connect()


@app.on_event("shutdown")
async def shutdown():
    await prisma.disconnect()


@app.get("/")
def read_root():
    return {"version": "1.0.0"}
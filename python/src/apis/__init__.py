from fastapi import APIRouter

from src.apis.auth import router as authRouter
from src.apis.createTemplateFile import router as templatesRouter
# from src.apis.users import router as usersRouter

apis = APIRouter()
apis.include_router(authRouter)
apis.include_router(templatesRouter)
# apis.include_router(usersRouter)

__all__ = ["apis"]
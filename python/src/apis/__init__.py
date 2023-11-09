from fastapi import APIRouter

from src.apis.users import router as usersRouter
from src.apis.createTemplateFile import router as templatesRouter
from src.apis.verifyTypes import router as verifyRouter
from src.apis.dashboard import router as dashboardRouter
# from src.apis.users import router as usersRouter

apis = APIRouter()
apis.include_router(usersRouter)
apis.include_router(templatesRouter)
apis.include_router(verifyRouter)
apis.include_router(dashboardRouter)
# apis.include_router(usersRouter)

__all__ = ["apis"]
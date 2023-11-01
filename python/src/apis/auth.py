import datetime
from typing import List, Optional
from fastapi import APIRouter

from pydantic import BaseModel
from src.prisma import prisma

router = APIRouter()



@router.get("/users/", tags=["users"])
async def read_users():
    users = await prisma.usuario.find_many()
    print("users", users)

    for user in users:
        del user.senha

    return users


from fastapi import APIRouter, File, Form, HTTPException, Response, UploadFile
from fastapi.responses import FileResponse, StreamingResponse
import pandas as pd
from src.prisma import prisma



router = APIRouter()



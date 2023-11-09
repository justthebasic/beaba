import io
from fastapi import APIRouter, HTTPException, Response
from fastapi.responses import FileResponse, StreamingResponse
import pandas as pd
from io import BytesIO
from openpyxl import Workbook
from fastapi import Depends
from pydantic import BaseModel
from src.prisma import prisma
import xlwt

router = APIRouter()

# Modelo Pydantic para entrada de dados (opcional)
class Template(BaseModel):
    id: int
    name: str
    formato: str

# Rota para obter todos os templates
@router.get("/templates/", tags=["templates"])
async def get_templates():
    templates = await prisma.template.find_many()
    return templates

# Rota para obter um template por ID
@router.get("/templates/{template_id}", tags=["templates"])
async def get_template(template_id: int):
    template = await prisma.template.find_unique(where={"id": template_id}, include={"campos": True})
    return template

# Função para buscar dados do banco 
async def get_data_from_db(template_id: int):
    template = await prisma.template.find_unique(where={"id": template_id}, include={"campos": True})

    # Extraia os nomes dos campos e tipos
    campos = template.campos
    campo_names = [campo.nome_campo for campo in campos]
    # campo_tipos = [campo.tipo for campo in campos]

    # Crie um DataFrame com base nos campos e tipos
    data = {
        'Campos': campo_names,
        # 'Tipos': campo_tipos,
    }
    df = pd.DataFrame(data)

    # Transponha o DataFrame para inverter as colunas e as linhas
    df = df.T
    return df

# Rota para baixar dados em formato Excel
@router.get("/download-xlsx/{id}/{name}/{formato}", response_class=FileResponse)
async def download_excel(id: int, name: str, formato: str):
    # Substitua a chamada à função get_data_from_db pela lógica que você precisa
    df = await get_data_from_db(id)

    # Crie um arquivo Excel com os dados
    output = BytesIO()
    with pd.ExcelWriter(output, engine='openpyxl') as writer:
        df.to_excel(writer, index=False, sheet_name="Data")

    output.seek(0)

    return StreamingResponse(content=output, media_type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", headers={"Content-Disposition": f"attachment; filename={name}.xlsx"})



# Rota para baixar dados em formato CSV
@router.get("/download-csv/{id}/{name}/{formato}", response_class=FileResponse)
async def download_csv(id: int, name: str, formato: str):
    # Substitua a chamada à função get_data_from_db pela lógica que você precisa
    df = await get_data_from_db(id)

    # Crie um arquivo CSV
    output = BytesIO()
    df.to_csv(output, index=False, encoding='utf-8', sep=';')

    output.seek(0)

    return StreamingResponse(content=output, media_type="text/csv", headers={"Content-Disposition": f"attachment; filename={name}.csv"})



@router.get("/download-xls/{id}/{name}/{formato}", response_class=FileResponse)
async def download_xls(id: int, name: str, formato: str):
    # Substitua a chamada à função get_data_from_db pela lógica que você precisa
    df = await get_data_from_db(id)

    output = BytesIO()
    wb = xlwt.Workbook(encoding='utf-8')
    ws = wb.add_sheet('Data')

    # Escreva os dados do DataFrame no arquivo XLS
    for row_num, row_data in enumerate(df.values):
        for col_num, value in enumerate(row_data):
            ws.write(row_num, col_num, str(value))

    wb.save(output)
    output.seek(0)

    return StreamingResponse(content=output, media_type="application/vnd.ms-excel", headers={"Content-Disposition": f'attachment; filename="{name}.xls"'},
    )



import os
from fastapi import APIRouter, File, Form, HTTPException, UploadFile, logger
from fastapi.responses import FileResponse, StreamingResponse
import pandas as pd
from pydantic import BaseModel
from src.prisma import prisma
from typing import List

import logging


router = APIRouter()

# Caminho para a pasta de uploads
UPLOADS_DIR = "uploads"  # Certifique-se de criar essa pasta no diretório raiz do projeto

# @router.get("/arquivos/", tags=["arquivos"])
# async def get_arquivos():
#     arquivos = await prisma.arquivo.find_many()
#     return arquivos

class Usuario(BaseModel):
    nome_usuario: str

class Template(BaseModel):
    nome_template: str

class ArquivoResponse(BaseModel):
    id: int
    nome_arquivo: str
    caminho_arquivo: str
    estado: bool
    template_id: int
    usuario_id: int
    usuario: Usuario
    template: Template

    
   

@router.get("/arquivos", tags=["arquivo"])
async def list_arquivos():
    arquivos = await prisma.arquivo.find_many()
    
    return arquivos

# @router.get("/templatecampo/{template_id}", tags=['templates'])
# async def get_template_data(template_id: int):
#     template = await prisma.template.find_unique(
#         where={'id': template_id}, 
#         include={'campos': True})

#     campo_names = [campo.nome_campo for campo in template.campos]
#     campo_tipos = [campo.tipo for campo in template.campos]

#     return {
#         "nome_campo": campo_names,
#         "tipo_campo": campo_tipos
#     }



def read_uploaded_file(file_path):
    if file_path.endswith('.csv'):
        df = pd.read_csv(file_path, sep=',', header=1)
    elif file_path.endswith(('.xls', '.xlsx')):
        df = pd.read_excel(file_path, header=0,skiprows=1)
    else:
        raise Exception("Tipo de arquivo não suportado")
    return df

type_mapping = {
    "str": "object",
    "int64": "int64",
    "float": "float64",
    "datetime": "datetime64",
    "boolean": "bool",
    # Add more mappings as needed
}

# Função para validar o arquivo em relação ao template
async def validar_arquivo(file_path, template_id):
    try:
        df = read_uploaded_file(file_path)
    except Exception as e:
        os.remove(file_path)  # Remova o arquivo em caso de erro
        raise HTTPException(status_code=400, detail="Erro ao ler o arquivo. Verifique o formato.")

    template = await prisma.template.find_unique(
        where={'id': template_id}, 
        include={'campos': True})

    campo_names = [campo.nome_campo for campo in template.campos]
    campo_tipos = [campo.tipo for campo in template.campos]

    
    for col in df.columns:
        col_name = col
        col_dtype = df[col_name].dtype
        expected_dtype = type_mapping[campo_tipos[campo_names.index(col_name)]]
        if col_dtype != expected_dtype:
            raise ValueError(f"O tipo de dados da coluna '{col_name}' não corresponde ao tipo esperado.")
            

    return df





# Rota para criar um arquivo
async def create_arquivo( nome_arquivo: str, file_path: str, estado: bool, template_id: int, usuario_id: int):
    try:
        
        
        # Crie o arquivo no banco de dados usando o modelo Prisma
        new_arquivo = await prisma.arquivo.create({
            "nome_arquivo":nome_arquivo,
            "caminho_arquivo":file_path,
            "estado":estado,
            "template_id":template_id,
            "usuario_id": usuario_id
        }
        )

        return new_arquivo # Ou retorne a resposta adequada
    except Exception as error:
        logger.error(f"Error creating arquivo: {error}")

        raise HTTPException(status_code=400, detail="Erro ao criar um arquivo: " + str(error))


@router.post("/uploadfile/")
async def upload_file(file: UploadFile, nome_arquivo: str = Form(...), estado: bool = Form(default=False), template_id: int = Form(...), usuario_id: int = Form(...)):
    file_path = os.path.join(UPLOADS_DIR, file.filename)
    
    with open(file_path, "wb") as f:
        f.write(file.file.read())

    try:

        arquivo_df = await validar_arquivo(file_path, template_id)
        arquivo = await create_arquivo(nome_arquivo, file_path, True, template_id, usuario_id)

        return {"filename": file.filename, "arquivo_id": arquivo.id}
    except HTTPException as e:
        # Trate os erros de validação e retorne uma resposta de erro adequada
        os.remove(file_path)  # Remova o arquivo em caso de erro
        return e


@router.get("/downloadfile/{filename:path}")
async def download_file(filename: str):
    file_path = os.path.join(UPLOADS_DIR, filename)
    
    if not os.path.exists(file_path):
        raise HTTPException(status_code=404, detail="Arquivo não encontrado")

    return FileResponse(file_path, filename=filename)

# @router.get("/downloadfile/{filename}")
# async def download_file(filename: str):
#     try:
#         # Recupere o caminho do arquivo do banco de dados
#         arquivo = await prisma.arquivo.find_unique(where={"nome_caminho": filename})
#         if arquivo is None:
#             raise HTTPException(status_code=404, detail="Arquivo não encontrado")

#         file_path = arquivo.caminho_arquivo

#         return FileResponse(file_path, filename=filename)
#     except Exception as e:
#         print(f"Erro ao obter informações do arquivo: {e}")
#         raise HTTPException(status_code=500, detail="Erro interno do servidor")





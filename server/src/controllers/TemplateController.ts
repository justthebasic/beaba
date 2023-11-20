import { Request, Response, request } from "express";
import { prisma } from "../database";
import path from "path";
import fs from 'fs';
import axios from "axios";





export default class TemplateController {

    static async listTemplate(req: Request, res: Response) {
        try {
            const templates = await prisma.template.findMany({
                include: {
                    campos: {
                        select: {
                            nome_campo: true,
                            tipo: true,
                        },
                    },
                    usuario:{
                        select:{
                            id:true
                        }
                    }
                }
            });

            templates.forEach((template) => {
                const nomeDoTemplate = template.nome_template;
                const campos = template.campos; // Array de objetos
                const numeroDeCampos = campos.length; // Conta o número de campos

                console.log(`Nome do template: ${nomeDoTemplate}`);
                console.log(`Nome do campos: ${campos}`);
                console.log(`Número de campos: ${numeroDeCampos}`);
            });

            res.json(templates);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Erro ao listar templates' });
        }
    }
    static async findTempalte(req:Request, res: Response){
        const {templateId} = req.params

        try{
            const templates = await prisma.template.findUnique({
                where: { id: parseInt(templateId) },
                include: { campos: true }, // Inclua campos e arquivos relacionados ao template
            });


            res.json(templates);

        }catch(error){
            console.error(error);
        }
    }
    

    static async createTemplate(req: Request, res: Response) {
        const { nome_template, formato, campos, id } = req.body;

        const userId = id


        if (!nome_template || !formato || !campos || campos.length === 0) {
            return res.status(400).json({ error: "Nome do template, formato e pelo menos um campo são obrigatórios" });
        }

        try {
            // Obter a data e hora atual
            const data_criacao = new Date();
            // Iniciar uma transação
            await prisma.$transaction(async (prisma) => {
                // Criar o template com a data de criação definida
                const newTemplate = await prisma.template.create({
                    data: {
                        nome_template,
                        formato,
                        data_criacao,
                        usuario: { connect: { id: userId } }, // Substitua com o ID do usuário associado
                        campos: {
                            create: campos.map((campoData) => ({
                                nome_campo: campoData.nome_campo,
                                tipo: campoData.tipo,
                            })),
                        },
                    },
                });

                // Retornar o template criado
                res.json(newTemplate);
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Erro ao criar o template e campos associados' });
        }
    }


    static async deleteTemplate(req: Request, res: Response){
        const {templateId} = req.params;
        try{
        // Verificar se o template existe antes de tentar excluí-lo
        const existingTemplate = await prisma.template.findUnique({
            where: { id: parseInt(templateId) },
            include: { campos: true, arquivo: true }, // Inclua campos e arquivos relacionados ao template
        });

        if (!existingTemplate) {
            return res.status(404).json({ error: 'Template não encontrado' });
        }

        // Verificar se o template está vinculado a algum arquivo
        if (existingTemplate.arquivo.length > 0) {
            return res.status(400).json({ error: 'Não é possível excluir o template vinculado a arquivos' });
        }

        
        
        // Iniciar uma transação para garantir operações atômicas
        await prisma.$transaction(async (prisma) => {
            // Excluir os campos relacionados ao template
            await prisma.campo.deleteMany({
                where: { template_id: existingTemplate.id },
            });

            // Excluir o template
            const deletedTemplate = await prisma.template.delete({
                where: { id: parseInt(templateId) },
            });

            res.json(deletedTemplate);
        });
        }catch (error) {
            console.error(error)
            res.status(500).json({ error: 'Erro ao deletar o template' });
        }
    }



    static async acceptTemplate(req: Request, res: Response) {
        const { templateId } = req.params;

        try {
            const updatedTemplate = await prisma.template.update({
                where: { id: parseInt(templateId) },
                data: { estado: 'ativo' }
            })

            res.json(updatedTemplate)
        } catch (error) {
            console.error(error)
            res.status(500).json({ error: 'Erro ao aceitar o template' });
        }
    }

    static async ativarTemplate(req: Request, res: Response) {
        const { templateId } = req.params;

        try {
            // Atualize o estado do template para 'ativo'
            const updatedTemplate = await prisma.template.update({
                where: { id: parseInt(templateId) },
                data: { estado: 'ativo' },
            });

            res.json(updatedTemplate);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Erro ao ativar o template' });
        }
    }

    static async desativarTemplate(req: Request, res: Response) {
        const { templateId } = req.params;

        try {
            // Atualize o estado do template para 'inativo'
            const updatedTemplate = await prisma.template.update({
                where: { id: parseInt(templateId) },
                data: { estado: 'inativo' },
            });

            res.json(updatedTemplate);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Erro ao desativar o template' });
        }
    }


}

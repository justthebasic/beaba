import { Request, Response, request } from "express";
import { prisma } from "../database";
import path from "path";
import fs from 'fs';
import axios from "axios";





export default class TemplateController {
    static async listTemplate(req: Request, res: Response) {
        try {
            const templates = await prisma.template.findMany();
            res.json(templates);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Erro ao listar templates' });
        }
    }

    // static async connecFlask(req: Request, res: Response) {
    //     try {
    //         const response = await axios.get('http://127.0.0.1:5000/flask');

    //         res.json(response.data);
    //     } catch (error) {
    //         console.error(error)
    //         res.status(500).send('Erro ao chamar o servidor Flask.')
    //     }
    // }

    static async downloadTemplate(req: Request, res: Response) {
        
        try {
            const { templateId, formato } = req.params;
            const response = await axios.get(`http://127.0.0.1:5000/api/templates/${templateId}/download/${formato}`);

            res.json(response.data);
            // Verifique se o formato solicitado é válido (pode adicionar mais validações)
            const validFormats = ['csv', 'xls', 'xlsx'];
            if (!validFormats.includes(formato)) {
                return res.status(400).json({ error: 'Formato inválido' });
            }

            const template = await prisma.template.findUnique({
                where: { id: parseInt(templateId) },
            });

            if (!template) {
                return res.status(404).json({ error: 'Template não encontrado' });
            }
            const template_data = {
                id: template.id,
                // name: template.nome_template,
                formato: template.formato
                
                // Adicione outras propriedades do template aqui
            };


            // Construa o caminho do arquivo com base no templateId e formato
            const templateFilePath = path.join(__dirname, `./uploads/${templateId}.${formato}`);

            // Verifique se o arquivo existe
            if (!fs.existsSync(templateFilePath)) {
                return res.status(404).json({ error: 'Arquivo não encontrado' });
            }

            // Envie o arquivo como resposta para download
            res.setHeader('Content-Type', `application/${formato}`, );
            res.setHeader('Content-Disposition', `attachment; filename=template.${formato}`);
            res.sendFile(templateFilePath);
            // return res.json(template_data);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Erro ao baixar o template' });
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

    static async activateTemplate(req: Request, res: Response) {
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

    static async deactivateTemplate(req: Request, res: Response) {
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

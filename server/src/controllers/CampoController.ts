import { Request, Response } from "express";
import { prisma } from "../database";

export default class CampoController {
    static async listCampo(req: Request, res: Response) {
        try {
            const campos = await prisma.campo.findMany();
            res.json(campos);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Erro ao listar campos' });
        }
    }

    static async createCampo(req: Request, res: Response) {
        try {
            const { nome_campo, tipo, template_id  } = req.body;

            if (!nome_campo || !tipo ) {
                return res.status(400).json({ error: "Todos os campos são obrigatórios" });
            }

            const newCampo = await prisma.campo.create({
                data: {
                    nome_campo,
                    tipo,
                    template_id
                    // Defina outras propriedades do modelo conforme necessário
                },
            });

            res.json(newCampo);
        } catch (error) {
            console.error(error);
            res.status(400).json({ error: 'Erro ao criar o campo' });
        }
    }
}

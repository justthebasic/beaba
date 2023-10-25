import { Request, Response } from "express";
import { prisma } from "../database";

export default class TemplateController {
    static async listArquivo(req: Request, res: Response) {
        try {
            // const arquivos = await prisma.arquivo.findMany();
            // res.json(arquivos);

            const arquivos = await prisma.arquivo.findMany({
                include: {
                  usuario: {
                    select: {
                      nome_usuario: true, // Seleciona o nome do usuário
                    },
                  },
                  template: {
                    select: {
                      nome_template: true, // Seleciona o nome do template
                    },
                  },
                },
              });
    
              arquivos.forEach((arquivo) => {
                const nomeUsuario = arquivo.usuario.nome_usuario;
                const nomeTemplate = arquivo.template.nome_template;
              
                console.log(`Nome do usuário: ${nomeUsuario}`);
                console.log(`Nome do template: ${nomeTemplate}`);
              });

              res.json(arquivos)
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Erro ao listar arquivos' });
        }

        
          
    }

    static async createArquivo(req: Request, res: Response) {
        try {
            const { nome_arquivo, caminho_arquivo, estado, usuario_id, template_id  } = req.body;

            if (!nome_arquivo || !caminho_arquivo  ) {
                return res.status(400).json({ error: "Todos os campos são obrigatórios" });
            }

            const newArquivo = await prisma.arquivo.create({
                data: {
                    nome_arquivo,
                    caminho_arquivo,
                    estado,
                    template_id,
                    usuario_id,
                    // Defina outras propriedades do modelo conforme necessário
                },
            });

            res.json(newArquivo);
        } catch (error) {
            console.error(error);
            res.status(400).json({ error: 'Erro ao criar um arquivo' });
        }
    }
}

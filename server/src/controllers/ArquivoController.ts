import { Request, Response } from "express";
import { prisma } from "../database";


export default class ArquivoController {
  static async listArquivo(req: Request, res: Response) {
    try {
      // Lógica para listar arquivos no seu banco de dados
      // ...

      const arquivos = await prisma.arquivo.findMany({
        include: {
          usuario: {
            select: {
              nome_usuario: true,
              id: true,
            },
          },
          template: {
            select: {
              nome_template: true,
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

      res.json(arquivos);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao listar arquivos' });
    }
  }

  static async createArquivo(req: Request, res: Response) {
    try {
      // Lógica para criar um arquivo no seu banco de dados
      // ...

      const { nome_arquivo,caminho_arquivo, estado, usuario_id, template_id } = req.body;
      // const caminho_arquivo = req.file.path; // Caminho do arquivo no servidor

      if (!nome_arquivo || !caminho_arquivo) {
        return res.status(400).json({ error: "Todos os campos são obrigatórios" });
      }

      const newArquivo = await prisma.arquivo.create({
        data: {
          nome_arquivo,
          caminho_arquivo,
          estado,
          template_id,
          usuario_id,
        },
      });

      res.json(newArquivo);
    } catch (error) {
      console.error(error);
      res.status(400).json({ error: 'Erro ao criar um arquivo' });
    }
  }
}
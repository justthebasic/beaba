import { Request, Response } from "express";
import { prisma } from "../database";
// import multer from "multer";
// import * as fs from 'fs';

// import { google, } from "googleapis";
// import path from "path";

// const apiKeys = require('./apiKey.json')
// // const apikeys = path.join(__dirname, 'apiKey.json');
// const scopes = ['https://www.googleapis.com/auth/drive'];

// async function authhorize() {
//   const jwtClient = new google.auth.JWT(
//     apiKeys.client_email,
//     null,
//     apiKeys.private_key,
//     scopes
//     )
//     await jwtClient.authorize()
//     return jwtClient
// }
// //   1iaFHMnnry2BNKhaVIn_zAzUTtvO9ysVa

// // Crie um OAuth2 client

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

  // static async authenticateGoogleDrive(req: Request, res: Response) {
  //   // Gere a URL de autenticação do Google Drive
  //   const authUrl = auth.generateAuthUrl({
  //     access_type: 'offline',
  //     scope: SCOPES,
  //     include_granted_scopes: true,
  //   });

  //   // Redirecione o usuário para a URL de autenticação
  //   res.redirect(authUrl);
  // }

  // static async handleGoogleDriveCallback(req: Request, res: Response) {
  //   const code = req.query.code as string;

  //   try {
  //     // Troque o código de autorização por tokens de acesso e atualização
  //     const { tokens } = await auth.getToken(code);
  //     const accessToken = tokens.access_token;
  //     const refreshToken = tokens.refresh_token;
  //     auth.setCredentials({ refresh_token: refreshToken, access_token: accessToken });

  //     // Salve os tokens em um banco de dados ou sessão para uso futuro

  //     // Redirecione o usuário para uma página de sucesso ou realize outras ações
  //     res.send('Autenticação bem-sucedida!');
  //   } catch (error) {
  //     console.error('Erro na autenticação:', error);
  //     res.status(500).send('Falha na autenticação.');
  //   }
  // }

  // static async listGoogleDriveFiles(req: Request, res: Response) {
  //   try {
  //     const drive = google.drive({
  //       version: "v3",
  //       auth: auth
  //     });

  //     const response = await drive.files.list({
  //       pageSize: 10,
  //       fields: 'files(name, id)',
  //     });

  //     const files = response.data.files;
  //     res.json(files);
  //   } catch (err) {
  //     console.error('Erro ao listar arquivos no Google Drive:', err);
  //     res.status(500).json({ error: 'Falha ao listar arquivos no Google Drive' });
  //   }
  // }

  // static async uploadToGoogleDrive(req: Request, res: Response, authClient) {
  //   try {
  //     const drive = google.drive({
  //       version: "v3",
  //       auth: authClient
  //     });

  //     let fileMetaData = {
  //       name: "",
  //       parents: ["1iaFHMnnry2BNKhaVIn_zAzUTtvO9ysVa"]
  //     }
  //     const response = await drive.files.create({
  //       resource: fileMetaData,
  //       media: {
  //         mimeType: req.file.mimetype,
  //         body: req.file.stream,
  //       },
  //     });

  //     res.json({ fileId: response.data.id });
  //   } catch (err) {
  //     console.error('Erro ao fazer upload de arquivo para o Google Drive:', err);
  //     res.status(500).json({ error: 'Falha ao fazer upload de arquivo para o Google Drive' });
  //   }
  // }
}

// async function uploadFile(authClient, file) {
//   const drive = google.drive({ version: 'v3', auth: authClient });

//   const metadata = {
//     name: file.name,
//     parents: ['1iaFHMnnry2BNKhaVIn_zAzUTtvO9ysVa'],
//   };

//   const media = {
//     body: fs.createReadStream(file.path),
//     mimeType: file.mimeType,
//   };

//   const response = drive.files.create({
//     metadata,
//     media,
//   });

//   return response.data;
// }

// authhorize().then(authClient => uploadFile(authClient, file)).catch();

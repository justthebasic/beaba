import { Request, Response } from "express";
import { prisma } from "../database";





export default class UserController {

    static async listUser(req: Request, res: Response) {
        try {
            const users = await prisma.usuario.findMany();
            res.json(users);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao listar usuários' });
        } finally {

        }
    }


    static async ativarUser(req: Request, res: Response) {

        const { userId } = req.params;


        try {
            const updateUser = await prisma.usuario.update({
                where: { id: parseInt(userId) },
                data:
                {
                    estado: 'ativo',

                }
            })
            if (updateUser.cargo !== 'adm') {
                return res.status(403).json({ message: 'Permission denied' });
            }

            if (updateUser.estado !== 'ativo' && updateUser.estado !== 'inativo') {
                return res.status(400).json({ message: 'Invalid status' });
            }

            res.json(updateUser)
        } catch (error) {
            console.error(error)
            res.status(400).json({ error: 'Erro ao ativar o usuario' });
        }
    }

    static async desativarUser(req: Request, res: Response) {

        const { userId } = req.params;


        try {
            const updateUser = await prisma.usuario.update({
                where: { id: parseInt(userId) },
                data: { estado: 'inativo' }
            })
            if (updateUser.cargo !== 'adm') {
                return res.status(403).json({ message: 'Permission denied' });
            }

            if (updateUser.estado !== 'ativo' && updateUser.estado !== 'inativo') {
                return res.status(400).json({ message: 'Invalid status' });
            }

            res.json(updateUser)
        } catch (error) {
            console.error(error)
            res.status(400).json({ error: 'Erro ao desativar o usuario' });
        }
    }

    static async cargoUser(req: Request, res: Response) {

        const { userId } = req.params;


        try {
            const updateUser = await prisma.usuario.update({
                where: { id: parseInt(userId) },
                data:
                {
                    cargo: 'user'
                }
            })
            if (updateUser.cargo !== 'adm') {
                return res.status(403).json({ message: 'Permission denied' });
            }

            if (updateUser.estado !== 'ativo' && updateUser.estado !== 'inativo') {
                return res.status(400).json({ message: 'Invalid status' });
            }

            res.json(updateUser)
        } catch (error) {
            console.error(error)
            res.status(400).json({ error: 'Erro ao ativar o usuario' });
        }
    }
    static async cargoAdm(req: Request, res: Response) {

        const { userId } = req.params;


        try {
            const updateUser = await prisma.usuario.update({
                where: { id: parseInt(userId) },
                data:
                {
                    cargo: 'adm'
                }
            })
            if (updateUser.cargo !== 'adm') {
                return res.status(403).json({ message: 'Permission denied' });
            }

            if (updateUser.estado !== 'ativo' && updateUser.estado !== 'inativo') {
                return res.status(400).json({ message: 'Invalid status' });
            }

            res.json(updateUser)
        } catch (error) {
            console.error(error)
            res.status(400).json({ error: 'Erro ao ativar o usuario' });
        }
    }

    static async deleteUser(req: Request, res: Response) {
        const { userId } = req.params;
        try {
            // Verificar se o template existe antes de tentar excluí-lo
            const existingUser = await prisma.usuario.findUnique({
                where: { id: parseInt(userId) },
                include: { template: true, arquivo: true }, // Inclua campos e arquivos relacionados ao template
            });

            if (!existingUser) {
                return res.status(404).json({ error: 'Template não encontrado' });
            }
            if (existingUser.arquivo.length > 0) {
                return res.status(400).json({ error: 'Não é possível excluir o template vinculado a arquivos' });
            }
            if (existingUser.template.length > 0) {
                return res.status(400).json({ error: 'Não é possível excluir o template vinculado a arquivos' });
            }
            if (existingUser.estado !== 'pendente') {
                return res.status(400).json({ error: 'Não é possível excluir o template com estado não pendente' });
            }

            
            const deletedTemplate = await prisma.usuario.delete({
                where: { id: parseInt(userId) },
            });

            res.json(deletedTemplate);

        } catch (error) {
            console.error(error)
            res.status(500).json({ error: 'Erro ao deletar o template' });
        }
    }


}










// export default class UserController {
//     static async listUser(req: Request, res: Response){
//         try{
//             const users =  Usuario.findMany();
//             res.json(users);
//         } catch (error){
//             res.status(500).json({error: 'Erro ao listar usuários'});
//         }
//     }

//     static async createUser(req:Request, res:Response){
//         try{
//             const newUser = await Usuario.create({data: req.body});
//             res.status(201).json(newUser);
//         } catch (error){
//             res.status(500).json({error: 'Erro ao criar usuário'});
//         }
//     }
// }













// export default {
//     async createUser(request: Request, response: Response){
//         try{
//             const {nome_usuario, email, senha} = request.body
//             const userExist = await prisma.usuario.findUnique({ where: {email}})

//             if(userExist){
//                 return response.json({
//                     error: true,
//                     message:'Erro: usuário já existe!'
//                 })
//             }

//             const user = await prisma.usuario.create({
//                 data: {
//                     nome_usuario,
//                     email,
//                     senha
//                 }
//             })

//             return response.json({
//                 error: false,
//                 message: 'Erro: usuário já existe'
//             })
//         } catch (error){
//             return response.json({message: error.message})
//         }
//     }
// }
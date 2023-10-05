import { Request, Response } from "express";
import { prisma } from "../database";





export default class UserController {
    static async listUser(req: Request, res: Response) {
        
        try {
            const users = prisma.usuario.findMany();
            res.json(users);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao listar usuários' });
        } finally{
            await prisma.$disconnect
        }
    }

    static async createUser(req: Request, res: Response){

        

        try{
            const newUser = prisma.usuario.create({data:{
                nome_usuario: 'joão',
                email: 'fsklahfsa@gmail.com',
                senha: 'fklash4',
            }});
            res.json(newUser)
        } catch (error){
            res.status(400).json({error: 'AAAAAAAAAAAAAAAAAAAAA'});
        } finally{
            
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
import bcrypt from "bcrypt";
import config from "config";
import { prisma } from "../database";



export interface UserInput {
    email: string;
    nome_usuario: string;
    senha: string;
}

export interface UserDocument {
    email: string;
    nome_usuario: string;
    senha: string;
}

export async function findUser(userInput: UserInput) {

    const user = await prisma.usuario.findUnique({
        where: { email: userInput.email },
    });

    return user;
}
export async function createUser(userInput: UserInput) {
    const saltWorkFactor = config.get<number>("saltWorkFactor");

    const hashedPassword = await bcrypt.hash(userInput.senha, saltWorkFactor);

    const user = await prisma.usuario.create({
        data: {
            email: userInput.email,
            nome_usuario: userInput.nome_usuario,
            senha: hashedPassword,
        },
    });

    return user;
}



export async function comparePassword(candidatePassword: string, hashedPassword: string) {
    return bcrypt.compare(candidatePassword, hashedPassword).catch((e) => false);
}

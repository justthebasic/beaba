import { PrismaClient, usuario } from "@prisma/client";
import bcrypt from "bcrypt";
import config from "config";
import { comparePassword } from "../models/user.model";

const prisma = new PrismaClient();

export interface UserInput {
    email: string;
    nome_usuario: string;
    senha: string;
}

export async function createUser(input: UserInput) {
    const saltWorkFactor = config.get<number>("saltWorkFactor");

    const hashedPassword = await bcrypt.hash(input.senha, saltWorkFactor);

    const user = await prisma.usuario.create({
        data: {
            email: input.email,
            nome_usuario: input.nome_usuario,
            senha: hashedPassword,
        },
    });

    return user;
}

export async function validatePassword({
    email,
    password,
}: {
    email: string;
    password: string;
}) {
    const user = await findUser({ where: { email } });

    if (!user) {
        return false;
    }

    const isValid = await comparePassword(password, user.senha);

    if (!isValid) return false;

    return omitSensitiveFields(user);
}

export async function findUser(query: { where: { email: string } }) {
    return prisma.usuario.findFirst(query);
}

function omitSensitiveFields(user: usuario) {
    const { senha, ...userWithoutPassword } = user;
    return userWithoutPassword;
}

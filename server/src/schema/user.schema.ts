import { object, string, z } from "zod"


export const createUserSchema = object({
    body: object({
        nome_usuario: string({
            required_error: "Nome é obrigatório",
        }),
        senha: string({
            required_error: "Senha é obrigatória",
        }).min(6, "Senha muito curta, 6 é o número minimo de caracteres"),
        email: string({
            required_error: "Email é obrigatório",
          }).email("Email inválido"),
    })
})



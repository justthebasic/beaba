import { object, string, z } from 'zod'

export const createSchemaCampo = object({
    nome_campo: string({
        required_error: "Nome do campo é obrigatório",
    }),
    tipo: string({
        required_error:"Tipo do campo é obrigatório",
    }),

})
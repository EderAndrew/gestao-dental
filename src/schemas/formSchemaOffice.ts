import { z } from "zod";

export const formSchemaOffice = z.object({
    cnpj: z.string().min(14, {message: "CNPJ deve ter no mínimo 14 digitos."}).trim(),
    corporate: z.string().min(2, {
        message: "Razão Social deve ter no mínimo 2 letras.",
    }).trim(),
    name: z.string().min(2, {
        message: "Nome Fantasia deve ter no mínimo 2 letras.",
    }).trim(),
    tel: z.string().min(10, {
        message: "Telefone deve ter no mínimo 10 digitos.",
    }).trim(),
    identity: z.string().trim(),
    cep: z.string().min(8, {
        message: "CEP deve ter no mínimo 8 digitos.",
    }).trim(),
    street: z.string().trim(),
    complement: z.string().trim(),
    number: z.string().trim(),
    neighborhood: z.string().trim(),
    city: z.string().trim(),
    state: z.string().trim(),

})

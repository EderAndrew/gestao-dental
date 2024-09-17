import { z } from "zod";

export const formSchemaLogin = z.object({
    email: z.string().email({message: "Email invalido"}).trim(),
    password: z.string().min(6, {message: "Senha deve ter no mínimo 6 digitos."})
})
import { z } from "zod";

export const formSchemaCreateAdmin = z.object({
    name: z.string().min(3, {message: "Nome deve ter no mínimo 3 letras."}),
    email: z.string().email({message: "Email invalido"}).trim(),
    password: z.string().min(6, {message: "Senha deve ter no mínimo 6 digitos."})
})
import { z } from "zod";

export const formSchemaLogin = z.object({
    email: z.string().email({message: "Email invalido"}).trim(),
    password: z.string()
        .min(8, {message: "Senha deve ter no mínimo 6 digitos."})
        .regex(/[a-zA-Z]/, { message: 'Senha deve conter pelo menos uma letra.' })
        .regex(/[0-9]/, { message: 'Senha deve conter pelo menos um número.' })
        .regex(/[^a-zA-Z0-9]/, {
        message: 'Senha deve conter pelo menos um caracter especial.',
        })
        .trim(),
})

export type FormState = | {
    errors?: {
        email?: string[]
        password?: string[]
    }
    message?: string
}
| undefined
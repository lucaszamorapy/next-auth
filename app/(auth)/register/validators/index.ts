import * as z from "zod"

export const registerSchema = z.object({
  name: z
    .string()
    .min(3, "Seu nome ter que ter no mínimo 3 caracteres."),
  email: z.email("Digite um e-mail válido."),
  password: z
    .string()
    .min(6, "Senha tem que ter no mínimo 6 caracteres.")
})

export type RegisterFormData = z.infer<typeof registerSchema>;
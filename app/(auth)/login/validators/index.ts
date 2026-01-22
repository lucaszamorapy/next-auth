import * as z from "zod"

export const formSchema = z.object({
  email: z.email("Digite um e-mail válido"),
  password: z
    .string()
    .min(6, "Senha tem que ter no mínimo 6 caracteres.")
})

export type AuthFormData = z.infer<typeof formSchema>;
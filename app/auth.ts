import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import GitHub from "next-auth/providers/github"
import Credentials from "next-auth/providers/credentials";
import { formSchema } from "./(auth)/login/validators";
import bcrypt from "bcrypt"
import { prisma } from "@/lib/prisma";

export const { handlers: { GET, POST }, auth, signIn, signOut } = NextAuth({
  session: {
    strategy: "jwt"
  },
  providers: [
    Google({
      //clientId: process.env.GOOGLE_CLIENT_ID,
      //clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        }
      }
    }),
    GitHub({
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        }
      }
    }),
    Credentials({
      authorize: async (credentials) => {
        const parsed = formSchema.safeParse(credentials);
        if (!parsed.success) return null;

        const { email, password } = parsed.data;
        const user = await prisma.users.findUnique({ where: { email } });

        if (!user) return null;
        const match = await bcrypt.compare(password, user.password);
        if (!match) return null;

        return {
          id: String(user.id),
          name: user.name,
          email: user.email,
        };
      },
    })
    //credentials espera uma funcao de login que literalmente apenas confere se o usuário
    //que voce quer logar existe e se a sua senha bate com a que está no banco
    //uma coisa legal é que o next auth gera o jwt automática e ainda armazena no cookie.
  ]
})
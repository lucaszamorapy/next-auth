import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import GitHub from "next-auth/providers/github"
import Credentials from "next-auth/providers/credentials";
import { formSchema } from "./(auth)/login/validators";
import { authConfig } from "./auth.config";
import { apiFetch } from "@/lib/api";
import { HttpErrorClient } from "./class/client/http-message";

export const { handlers: { GET, POST }, auth, signIn, signOut } = NextAuth({
  ...authConfig,
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
        try {
          const res = await apiFetch("login", true, "POST", { body: JSON.stringify(credentials) })
          const accessToken = res.data.accessToken;
          const refreshToken = res.data.refreshToken;
          const userInfo = res.data.userInfo;

          return {
            id: userInfo.id,
            name: userInfo.name,
            email: userInfo.email,
            accessToken: accessToken,
            refreshToken: refreshToken,
          }

        } catch (error) {
          if (error instanceof HttpErrorClient) {
            throw new HttpErrorClient(error.payload);
          }
          return null;
        }

      },
    })
    //credentials espera uma funcao de login que literalmente apenas confere se o usuário
    //que voce quer logar existe e se a sua senha bate com a que está no banco
    //uma coisa legal é que o next auth gera o jwt automática e ainda armazena no cookie.
  ],

})
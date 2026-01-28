import { NextAuthConfig } from "next-auth";
import { jwtDecode } from "jwt-decode"
import { IAccessTokenPayload, IApiReturn } from "./types";
import { JWT } from "@auth/core/jwt";
import { configuration } from "@/appsettings";
import { HttpErrorClient } from "./class/client/http-message";

const refreshToken = async (token: JWT) => {
  try {
    const res = await fetch(`${configuration.EXTERNAL_API_URL}/refresh`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token.refreshToken}`
      }
    })
    const newTokens: IApiReturn = await res.json();
    if (!res.ok) {
      throw new HttpErrorClient(newTokens)
    }
    return {
      ...token,
      accessToken: newTokens.data.accessToken,
      refreshToken: newTokens.data.refreshToken
    }
  } catch (error) {
    console.error(error)
    return token;
  }
}

export const authConfig: NextAuthConfig = {
  // -----------------------------
  // SESSION CONFIG
  // -----------------------------
  session: {
    // strategy: "jwt" significa:
    // - O NextAuth NÃO usa banco para sessão
    // - Toda a autenticação vive em um JWT
    // - Esse JWT fica armazenado em cookie (httpOnly)
    // - É a "fonte da verdade" da autenticação
    strategy: "jwt"
  },
  callbacks: {
    jwt: async ({ token, account, user }) => {
      // Esse callback roda:
      // - NO LOGIN (quando "user" existe)
      // - EM TODAS as requisições futuras (sem "user")

      // "token" = JWT interno do NextAuth (persistente)
      // "user" = só existe no momento do login (authorize / provider)

      if (user && account) {
        // sub (subject) é o padrão JWT para identificar o usuário
        token.sub = user.id;
        // Guardamos o accessToken no JWT
        // Ele será usado para chamadas à API protegida
        token.accessToken = user.accessToken;
        // Guardamos o refreshToken no JWT
        // Ele NÃO deve ir para o frontend
        token.refreshToken = user.refreshToken;
      }

      const decoded = jwtDecode<IAccessTokenPayload>(token.accessToken as string);
      //estou decodificando o accessToken recebido pelo login authorize
      token.accessTokenExpires = decoded.exp * 1000;
      //converte o tempo de expiração do JWT (segundos) para o formato que o JavaScript entende (milissegundos)
      const accessTokenExpires = token.accessTokenExpires as number | undefined;
      if (accessTokenExpires && Date.now() < accessTokenExpires) {
        //se o meu token ainda está valido então beleza, apenas retorno ele para o cookie
        return token;
      }
      //se não faço a função de refreshToken que vai me retornar novos tokens, assim o usuário não precisaria ficar voltando para a tela de
      //login toda hora que seu token expirar
      return refreshToken(token);
      // Sempre retornar o token
      // Esse token será salvo no cookie
    },
    session: async ({ session, token }) => {
      // Esse callback roda SEMPRE que o frontend chama:
      // - useSession()
      // - getServerSession()
      // - auth()
      // Aqui transformamos o JWT (token)
      // em um objeto "session" seguro para o frontend

      // Expondo o id do usuário no session.user
      // Expondo o accessToken para o frontend
      // (ok expor, pois ele expira rápido)
      session.user.id = token.sub as string;
      session.accessToken = token.accessToken as string;
      // NUNCA exponha o refreshToken aqui
      // Ele deve ficar somente no JWT (server-side)
      return session;
    }
  },
  // Providers de autenticação (Google, GitHub, Credentials, etc.)
  providers: []
};


//observações:  esse valor gigante no cookie é o JWT do NextAuth, mas não é um JWT “cru” — é um JWT criptografado (JWE),
//que no caso vai entrar tudo aquilo que eu setei no obj do token na função callback jwt()
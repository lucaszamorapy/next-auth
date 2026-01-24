import { NextRequest, NextResponse } from "next/server"
import { authConfig } from "./app/auth.config";
import NextAuth from "next-auth";
import { PUBLIC_ROUTES, LOGIN, ROOT, PROTECTED_SUB_ROUTES } from "./lib/routes";

const { auth } = NextAuth(authConfig)

export const proxy = async (request: NextRequest) => {
  const { nextUrl } = request;
  const session = await auth();
  const isAuthenticated = !!session?.user
  const isPublicRoute = (PUBLIC_ROUTES.some((p) => nextUrl.pathname.startsWith(p)) || nextUrl.pathname === ROOT) &&
    !PROTECTED_SUB_ROUTES.find((p) => nextUrl.pathname.includes(p))
  if (!isAuthenticated && !isPublicRoute) {
    return NextResponse.redirect(new URL(LOGIN, nextUrl))
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)',]
}

// 1 - authConfig serviu para ajudar a pegar o auth do NextAuth, além de dar uma
// padronização nas minhas funções do NextAuth, vale ressaltar que o auth ele apenas
// lê a sessão do usuário ao seja quem está logado, por isso não é preciso passar os
// providers do Google ou Github no authConfig.
// 2 - Recentemente o Next mudou o nome de middleware para proxy, ainda faz a mesma coisa
// porém os nomes são divergentes.
// 3 - O matcher nada mais é que forma de comparar as rotas, se colocarmos no matcher /products
// e a minha rota (nextUrl.pathname ou request.url) bater, ele vai ser redirecionado através do
// NextResponse.redirect(new URL(**rota que você quer**, **base da rota**)) pego a rota desejada
// e acoplo ela na base da rota atual, nisso o browser vai interromper o carregamento da rota que
// bateu com o matcher e vai redirecionar para a rota desejada no new URL.
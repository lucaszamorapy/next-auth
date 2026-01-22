"use server"
import { AuthError } from "next-auth";
import { signIn, signOut } from "../auth"
import { IUser } from "../data/user";

export const doSocialLogin = async (social: "github" | "google") => {
  await signIn(social, { redirectTo: "/" });
}

export const doLogout = async () => {
  await signOut({ redirectTo: "/login" })
}

export const doCredentialsLogin = async (data: IUser) => {
  try {
    await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });
    //é preciso passar os parametros no signIn, os credentials do authorize.
    return { code: 200, message: "Bem-vindo novamente!" };
  } catch (error) {
    if (error instanceof AuthError) {
      if (error.type === "CredentialsSignin") {
        return {
          code: 400,
          message: "Email ou senha inválidos.",
        };
      }
    }

    return {
      success: 500,
      message: "Erro interno ao realizar login",
    };
    //login-form.tsx:63 Only plain objects, and a few built-ins, can be passed to Client Components from Server Components. Classes or null prototypes are not supported. {}
  }
}
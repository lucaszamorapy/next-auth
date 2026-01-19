"use server"
import { signIn, signOut } from "../auth"
export const doSocialLogin = async (social: "github" | "google") => {
  await signIn(social, { redirectTo: "/home" });
}

export const doLogout = async () => {
  await signOut({ redirectTo: "/login" })
}
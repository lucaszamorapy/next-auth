import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import GitHub from "next-auth/providers/github"

export const { handlers: { GET, POST }, auth, signIn, signOut } = NextAuth({
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
    })
  ]
})
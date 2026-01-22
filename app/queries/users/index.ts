import { RegisterFormData } from "@/app/(auth)/register/validators";
import { HttpMessageReturn } from "@/app/class/http-message";
import { configuration } from "@/appsettings";
import { Users } from "@/generated/prisma/client";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt"

export const createUser = async (data: RegisterFormData) => {
  try {
    const emailExist = await prisma.users.findUnique({
      where: { email: data.email },
    });
    if (emailExist) {
      return new HttpMessageReturn("badRequest", "E-mail já cadastrado.")
    } else {
      const hashedPassword = await bcrypt.hash(
        data.password,
        configuration.SALT_ROUNDS
      );

      const user = await prisma.users.create({
        data: {
          name: data.name,
          email: data.email,
          password: hashedPassword,
        },
      });
      return new HttpMessageReturn<Users>("created", `Bem-vindo ${data.name}!`, user)
    }
  } catch (error) {
    console.error(error);
    throw new HttpMessageReturn("serverError", "", error)
  }
}
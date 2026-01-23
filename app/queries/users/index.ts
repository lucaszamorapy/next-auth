import { RegisterFormData } from "@/app/(auth)/register/validators";
import { HttpError, HttpMessageReturn } from "@/app/class/server/http-message";
import { configuration } from "@/appsettings";
import { Users } from "@/generated/prisma/client";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt"

export const createUser = async (
  data: RegisterFormData
): Promise<HttpMessageReturn<Users>> => {
  try {
    const emailExist = await prisma.users.findUnique({
      where: { email: data.email },
    });

    if (emailExist) {
      throw HttpError.badRequest("E-mail já cadastrado.");
    }

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

    return new HttpMessageReturn(
      "created",
      `Bem-vindo ${data.name}!`,
      user
    );
  } catch (error: unknown) {
    if (error instanceof HttpError) {
      throw error;
    }

    if (error instanceof Error) {
      throw HttpError.serverError(error.message);
    }

    throw HttpError.serverError();
  }
};

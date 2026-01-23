import { HttpError, HttpMessageReturn } from "@/app/class/server/http-message"
import { Product } from "@/generated/prisma/client";
import { prisma } from "@/lib/prisma"

export const getAllProducts = async (): Promise<HttpMessageReturn<Product[] | null>> => {
  try {
    const products = await prisma.product.findMany();
    return new HttpMessageReturn<Product[]>("success", `Foram encontrados um total de ${products.length} produto(s).`, products);
  } catch (error: unknown) {
    if (error instanceof HttpError) {
      throw error;
    }

    if (error instanceof Error) {
      throw HttpError.serverError(error.message);
    }

    throw HttpError.serverError();
  }
}

export const getProduct = async (id: string): Promise<HttpMessageReturn<Product | null>> => {
  try {
    const product = await prisma.product.findUnique({ where: { id } });
    if (!product) throw HttpError.notFound();
    return new HttpMessageReturn<Product>("success", "", product);
  } catch (error: unknown) {
    if (error instanceof HttpError) {
      throw error;
    }

    if (error instanceof Error) {
      throw HttpError.serverError(error.message);
    }

    throw HttpError.serverError();
  }
}
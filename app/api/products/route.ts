
import { HttpError, HttpMessageReturn } from "@/app/class/server/http-message";
import { getAllProducts } from "@/app/queries/products";
import { NextResponse } from "next/server";

export const GET = async (): Promise<NextResponse> => {
  try {
    const res = await getAllProducts()
    return NextResponse.json(res, { status: res.code })
  } catch (error) {
    if (error instanceof HttpError) {
      return NextResponse.json(
        error.payload,
        { status: error.payload.code }
      );
    }
    return NextResponse.json(
      new HttpMessageReturn("serverError", "", error),
      { status: 500 }
    );
  }
} 
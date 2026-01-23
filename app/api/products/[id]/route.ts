
import { HttpError, HttpMessageReturn } from "@/app/class/server/http-message";
import { getProduct } from "@/app/queries/products";
import { IRouteParams } from "@/app/types";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest, { params }: IRouteParams): Promise<NextResponse> => {
  try {
    const { id } = await params
    const res = await getProduct(id)
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
/* eslint-disable @typescript-eslint/no-explicit-any */
import { registerSchema } from "@/app/(auth)/register/validators";
import { createUser } from "@/app/queries/users";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest): Promise<NextResponse> => {
  try {
    const body = await request.json()
    const data = registerSchema.parse(body);
    const res = await createUser(data)
    return NextResponse.json(res, { status: res.code })
  } catch (error: any) {
    if (error?.code) {
      return NextResponse.json(error, { status: error.code })
    }
    console.error(error)
    return NextResponse.json(
      { message: "Erro interno do servidor" },
      { status: 500 }
    )
  }
}


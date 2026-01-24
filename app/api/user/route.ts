import { auth } from "@/app/auth";
import { HttpError, HttpMessageReturn } from "@/app/class/server/http-message";
import { getUserByEmail } from "@/app/queries/users";
import { NextResponse } from "next/server";

export const GET = async (): Promise<NextResponse> => {
  const session = await auth();
  if (!session?.user?.email) {
    return NextResponse.json(new HttpMessageReturn("unauthorized", "", null))
  }
  try {
    const res = await getUserByEmail(session?.user.email)
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
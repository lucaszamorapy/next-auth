/* eslint-disable @typescript-eslint/no-explicit-any */
import { auth } from "@/app/auth";
import { HttpErrorClient } from "@/app/class/client/http-message";
import { IApiReturn } from "@/app/types";
import { configuration } from "@/appsettings"

export const apiFetch = async (url: string, external: boolean = false, method: "GET" | "POST" | "PUT" | "DELETE", otherOptions?: any): Promise<IApiReturn> => {
  const session = await auth();
  const res = await fetch(`${!external ? configuration.API_URL : configuration.EXTERNAL_API_URL}/${url}`, {
    method: method,
    headers: {
      "content-type": "application/json",
      ...(session && { Authorization: `Bearer ${session.accessToken}` })
    },
    ...otherOptions,
  })
  const data: IApiReturn = await res.json();
  if (!res.ok) {
    throw new HttpErrorClient(data);
  }
  return data;
}
/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpErrorClient } from "@/app/class/client/http-message";
import { IApiReturn } from "@/app/types";
import { configuration } from "@/appsettings"

export const apiFetch = async (url: string, method: "GET" | "POST" | "PUT" | "DELETE", otherOptions?: any): Promise<IApiReturn> => {
  const res = await fetch(`${configuration.API_URL}/${url}`, {
    method: method,
    headers: {
      "content-type": "application/json",
    },
    ...otherOptions,
  })
  const data: IApiReturn = await res.json();
  if (!res.ok) {
    throw new HttpErrorClient(data);
  }
  return data;
}
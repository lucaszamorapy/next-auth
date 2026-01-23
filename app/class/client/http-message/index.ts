import { IApiReturn } from "@/app/types";

export class HttpErrorClient extends Error {
  payload: IApiReturn
  constructor(payload: IApiReturn) {
    super(payload.message);
    this.payload = payload
  }
}
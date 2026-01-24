/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IRouteParams {
  params: Promise<{ id: string }>
}

export interface IApiReturn {
  code: number;
  message: string;
  data?: any;
}

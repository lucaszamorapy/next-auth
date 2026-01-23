
export enum StatusType {
  success = 'success',
  noContent = 'noContent',
  created = 'created',
  badRequest = 'badRequest',
  unauthorized = 'unauthorized',
  forbidden = 'forbidden',
  notFound = 'notFound',
  serverError = 'serverError'
}


interface IReturnTypes {
  status: StatusType;
  message: string;
  code: number;
}

const returnType: IReturnTypes[] = [
  { status: StatusType.success, message: "Operação realizada com sucesso.", code: 200 },
  { status: StatusType.noContent, message: "Nenhum conteúdo disponível.", code: 204 },
  { status: StatusType.created, message: "Operação criada com sucesso.", code: 201 },
  { status: StatusType.badRequest, message: "Requisição inválida.", code: 400 },
  { status: StatusType.unauthorized, message: "Não autorizado.", code: 401 },
  { status: StatusType.forbidden, message: "Proibido.", code: 403 },
  { status: StatusType.notFound, message: "Recurso não encontrado.", code: 404 },
  { status: StatusType.serverError, message: "Erro interno do servidor.", code: 500 }
]



export class HttpError extends Error {
  payload: HttpMessageReturn;

  constructor(payload: HttpMessageReturn) {
    super(payload.message);
    this.payload = payload;
  }

  static badRequest(message?: string) {
    return new HttpError(
      new HttpMessageReturn("badRequest", message ?? "", null)
    );
  }

  static notFound(message?: string) {
    return new HttpError(
      new HttpMessageReturn("notFound", message ?? "", null)
    );
  }

  static serverError(message?: string) {
    return new HttpError(
      new HttpMessageReturn("serverError", message ?? "")
    );
  }

}

export class HttpMessageReturn<T = unknown> {
  code: number;
  message?: string;
  data?: T | null;
  constructor(status: string, message?: string, data?: T) {
    const type = returnType.find((r) => r.status === status);
    this.message = message !== "" ? message : type?.message;
    this.data = data || null;
    this.code = type ? type.code : 500;
  }
}

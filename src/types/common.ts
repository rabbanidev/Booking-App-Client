export interface IMeta {
  page: number;
  limit: number;
  total: number;
}

export interface IGenericResponse {
  data: any;
  meta?: IMeta;
}

interface IError {
  path: string | number;
  message: string;
}

export interface IGenericErrorResponse {
  statusCode: number;
  success: boolean;
  message: string;
  errorMessages: IError[];
}

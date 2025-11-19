export interface IJWTService {
  sign(payload: any): string;
  verify(token: string): any;
}
import jwt from "jsonwebtoken";
import { IJWTService } from "../../application/interfaces/IJWTService";

export class JWTService implements IJWTService {
  private secret: string;

  constructor(secret: string) {
    this.secret = secret;
  }

  sign(payload: any): string {
    return jwt.sign(payload, this.secret, { expiresIn: "1d" });
  }

  verify(token: string): any {
    return jwt.verify(token, this.secret);
  }
}
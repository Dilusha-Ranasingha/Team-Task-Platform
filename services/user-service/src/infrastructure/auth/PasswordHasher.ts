import bcrypt from "bcrypt";
import { IPasswordHasher } from "../../application/interfaces/IPasswordHasher";

export class PasswordHasher implements IPasswordHasher {
  async hash(password: string): Promise<string> {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
  }

  async compare(password: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(password, hash);
  }
}
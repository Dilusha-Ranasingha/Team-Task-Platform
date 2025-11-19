import { IUserRepository } from "../../domain/repositories/IUserRepository";
import { IPasswordHasher } from "../interfaces/IPasswordHasher";
import { User } from "../../domain/entities/User";

export class RegisterUserUseCase {
  constructor(
    private userRepo: IUserRepository,
    private passwordHasher: IPasswordHasher
  ) {}

  async execute(email: string, password: string) {
    const existingUser = await this.userRepo.findByEmail(email);
    if (existingUser) {
      throw new Error("Email already exists");
    }

    const passwordHash = await this.passwordHasher.hash(password);

    const user = new User(null, email, passwordHash);

    const savedUser = await this.userRepo.create(user);

    return {
      id: savedUser.id,
      email: savedUser.email,
    };
  }
}
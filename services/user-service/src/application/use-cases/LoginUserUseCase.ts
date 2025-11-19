import { IUserRepository } from "../../domain/repositories/IUserRepository";
import { IPasswordHasher } from "../interfaces/IPasswordHasher";
import { IJWTService } from "../interfaces/IJWTService";

export class LoginUserUseCase {
  constructor(
    private userRepo: IUserRepository,
    private passwordHasher: IPasswordHasher,
    private jwtService: IJWTService
  ) {}

  async execute(email: string, password: string) {
    const user = await this.userRepo.findByEmail(email);
    if (!user) {
      throw new Error("Invalid credentials");
    }

    const passwordValid = await this.passwordHasher.compare(
      password,
      user.passwordHash
    );

    if (!passwordValid) {
      throw new Error("Invalid credentials");
    }

    const token = this.jwtService.sign({ id: user.id });

    return { token };
  }
}
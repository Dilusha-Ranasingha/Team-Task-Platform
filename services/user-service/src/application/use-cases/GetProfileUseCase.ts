import { IUserRepository } from "../../domain/repositories/IUserRepository";

export class GetProfileUseCase {
  constructor(private userRepo: IUserRepository) {}

  async execute(userId: string) {
    const user = await this.userRepo.findById(userId);

    if (!user) {
      throw new Error("User not found");
    }

    return {
      id: user.id,
      email: user.email,
    };
  }
}
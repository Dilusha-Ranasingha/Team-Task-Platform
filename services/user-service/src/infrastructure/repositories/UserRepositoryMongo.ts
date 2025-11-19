import { IUserRepository } from "../../domain/repositories/IUserRepository";
import { User } from "../../domain/entities/User";
import { UserModel } from "../db/models/UserModel";

export class UserRepositoryMongo implements IUserRepository {
  async create(user: User): Promise<User> {
    const createdUser = await UserModel.create({
      email: user.email,
      passwordHash: user.passwordHash,
    });

    return new User(
      createdUser._id.toString(),
      createdUser.email,
      createdUser.passwordHash
    );
  }

  async findByEmail(email: string): Promise<User | null> {
    const found = await UserModel.findOne({ email });

    if (!found) return null;

    return new User(
      found._id.toString(),
      found.email,
      found.passwordHash
    );
  }

  async findById(id: string): Promise<User | null> {
    const found = await UserModel.findById(id);

    if (!found) return null;

    return new User(
      found._id.toString(),
      found.email,
      found.passwordHash
    );
  }
}
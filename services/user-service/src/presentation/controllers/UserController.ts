import { Request, Response } from "express";
import { RegisterUserUseCase } from "../../application/use-cases/RegisterUserUseCase";
import { LoginUserUseCase } from "../../application/use-cases/LoginUserUseCase";
import { GetProfileUseCase } from "../../application/use-cases/GetProfileUseCase";

export class UserController {
  constructor(
    private registerUser: RegisterUserUseCase,
    private loginUser: LoginUserUseCase,
    private getProfile: GetProfileUseCase
  ) {}

  register = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;

      const result = await this.registerUser.execute(email, password);

      res.status(201).json(result);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }; 

  login = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;

      const result = await this.loginUser.execute(email, password);

      res.json(result);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  };

  profile = async (req: Request, res: Response) => {
    try {
      const userId = (req as any).userId; // from auth middleware

      const result = await this.getProfile.execute(userId);

      res.json(result);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  };
}